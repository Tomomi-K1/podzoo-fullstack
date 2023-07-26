const express = require("express");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db');
const router = new express.Router();

/**== EXTERNAL API related == */
const { API_KEY, API_SECRET } = require('../secret')
const api = require('podcast-index-api')(API_KEY, API_SECRET) 

// models to communicate with DB
const User = require("../models/user");
// middleware
const { userOnly }= require('../middleware/auth') ;
// Errors
const { BadRequestError, } = require('../expressError');
// jsonschema
const jsonschema = require("jsonschema");
const Podcast = require("../models/podcast");


// == GET /podcasts/?term =''
// -search podcast by terms
router.get('/', async (req, res, next) => {
    let term = req.query.term; 
    const queryItems={ q:term, max: 60, fulltext: true, pretty:true}
    const searchPath ='search/byterm'
    try{
        const resp = await api.custom(path=searchPath, queries=queryItems);
        const data = simplifyPod(resp.feeds);
        return res.json({data, count:resp.count});
    } catch(err){
        return next(err);
    }
})

/** == GET podcasts/trending? cat='' & max=
 * cat : category
 * max: Number
  == do pagenation? 
        https://medium.com/learnfactory-nigeria/create-a-pagination-middleware-with-node-js-fe4ec5dca80f
    
 */
router.get('/trending', async (req, res, next) => {
     try{
        const category = req.query.cat;
        // if max is NOT given in query, returns 18 podcasts.
        const maxPod = req.query.max? req.query.max: 24;
        const resp= await api.podcastsTrending(max=maxPod, since=null, lang='en,en-us,en-gb,en-ca', cat = category);
        const data = simplifyPod(resp.feeds)
        return res.json(data)
     }catch(err){
        return next(err);
     }
})
/** ==GET podcasts/[feedid]/epidodes 
 * limit the number of podcasts to 100;
 * params: feedId
 * get all episodes -most recent to the oldest(default)
 * == do pagenation? or have other windows for showing more episodes?
        https://medium.com/learnfactory-nigeria/create-a-pagination-middleware-with-node-js-fe4ec5dca80f
 */
router.get('/:feedid/episodes', async (req, res, next) => {
    try{
        const feedId = +req.params.feedid;
        console.log(feedId)
        const data ={};
        const {feed} = await api.podcastsByFeedId(feedId);
        const resp = await api.episodesByFeedId(feedId, null, 100);
        const episodes = resp.items;
        data.feed=feed;
        data.episodeData = {count: resp.count, episodes}
   
        // make object with page number and total count? or should i return everything?
        return res.json(data)
    }catch(err){
        next(err);
    }
})

/** GET /podcasts/[feedid]/reviews
  -Returns { reviews: [{id, userId, username, feedId, comment, rating, createdAt}, {...},{}],
             avgRating: Number }
  -Authorization: None **/
router.get('/:feedid/reviews', async (req, res, next) => {
    try{
        const reviews = await Podcast.getReviews(req.params.feedid);
        const avgRating = Math.floor((reviews.reduce((sum, review) => sum+=review.rating, 0))/reviews.length)
        return res.json({reviews: reviews, avgRating: avgRating})
    } catch(err){
        return next(err);
    }
})

function simplifyPod(array){
    return array.map(feed => {
        // check if I need other return items, do I want to specify language?
        return {    
                feedId: feed.id, 
                title:feed.title, 
                url:feed.url, 
                link:feed.link, 
                description:feed.description, 
                author:feed.author, 
                artwork:feed.artwork, 
                language:feed.language,
                medium:feed.medium, 
                categories:feed.categories
        }
    })
}

// consider using this. 
// function simplifyEpisodes(array){
//     return array.map(episode => {
//         // check if I need other return items, do I want to specify language?
//         return {    
//                 episodeId: episode.id, 
//                 title:episode.title, 
//                 link:episode.link, 
//                 description:episode.description, 
//                 publishDate: episode.datePublishedPretty,
//                 audioFile: episode.enclosureUrl,
//                 author:episode.author, 
//                 artwork:episode.artwork, 
//                 language:episode.language,
//                 medium:episode.medium, 
//                 categories:episode.categories
//         }
//     })






module.exports = router;