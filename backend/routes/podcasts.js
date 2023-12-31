const express = require("express");
const router = new express.Router();

/**== EXTERNAL API related == */
const { API_KEY, API_SECRET } = require('../config')
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
 */
router.get('/:feedid/episodes', async (req, res, next) => {
    try{
        const feedId = +req.params.feedid;
        const data ={};
        const {feed} = await api.podcastsByFeedId(feedId);
        const resp = await api.episodesByFeedId(feedId, null, 100);
        const episodes = resp.items;
        data.feed=feed;
        data.episodeData = {count: resp.count, episodes}
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

// == GET /podcasts/categories =''
// -search podcast by terms
router.get('/categories', async (req, res, next) => {
    try{
        const resp = await api.categoriesList();
        const categories = resp.feeds
        return res.json({categories});
    } catch(err){
        return next(err);
    }
})


function simplifyPod(array){
    return array.map(feed => {
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

module.exports = router;