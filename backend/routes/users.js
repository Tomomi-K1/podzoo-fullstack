const express = require('express');
const router = new express.Router();

// models to communicate with DB
const User = require("../models/user");
// middleware
const { userOnly }= require('../middleware/auth') ;
// helper
const { createToken } = require("../helper/tokens");
// Errors
const { ExpressError, BadRequestError, } = require('../expressError');
// jsonschema
const jsonschema = require("jsonschema");
const { validateSchema } =require('../helper/jsonsValidates');
const userRegistration = require('../jsonSchma/userRegistration.json')
const userLogin =require('../jsonSchma/userLogin.json')
const userUpdate =require('../jsonSchma/userUpdate.json')
const reviewSchema =require('../jsonSchma/review.json')


/**  == POST /users/register  ==
 - user must include { username, password, email }
 - { user } => { token }
 - Returns JWT token which can be used to authenticate further requests.
 */
router.post('/register', async (req, res, next) => {
    try {
        // validate received json data with jsonschema
        validateSchema(req.body, userRegistration);
      
        const user = await User.register(req.body)
        // createToken only takes user.username as payload
        const token = createToken(user)
        return res.status(201).json({token})
    } catch(err){
        return next(err)
    }
})

/** == POST /users/login ==  
 - { username, password } => { token }
 - Returns JWT token which can be used to authenticate further requests.
 */
router.post('/login', async (req, res, next) => {
    try{
        validateSchema(req.body, userLogin);   
        const {username, password} = req.body;
        const user = await User.authenticate(username, password);
       // createToken only takes user.username as payload
        const token = createToken(user);
        return res.json({token})
    } catch (err){
        return next(err);
    } 
})


/** GET users/[username] => { user }
  -Returns { user:{ username, email, fav:[feedId]}} *
  -Authorization required: same user-as-:username
 **/
router.get('/:username', userOnly, async (req, res, next) => {
    try{
        const user = await User.get(req.params.username);
        return res.json({user})
    } catch (err){
        return next(err);
    } 
})

/** PATCH users/[username] => { user }
  -Data that can be updated { email}
  -Returns { user:{username, email}}
  -Authorization required: same user-as-:username
 **/
router.patch('/:username', userOnly, async (req, res, next) => {
    try{
        validateSchema(req.body, userUpdate);
        const user = await User.update(req.params.username, req.body);
        return res.json({user})
    } catch (err){
        return next(err);
    } 
})

/** DELETE users/[username] => { deleted: username }
  -Authorization required: same user-as-:username
 **/
  router.delete('/:username', userOnly, async (req, res, next) => {
    try{
        await User.delete(req.params.username);
        return res.json({deleted:req.params.username })
    } catch (err){
        return next(err);
    } 
})

//================================================//
// ========== user's favorite pod route ==========//
//================================================//

/** == getting favorite podcast ==
 GET users/[username]/fav-podcast => [{podcast1}, {podcast2},...]*/
router.get('/:username/fav-podcast', userOnly, async (req, res, next) =>{
    try{
        const favPods =await User.getAllFav(req.params.username);
        return res.json({favPods})
    } catch(err){
        return next();
    }

});

/**== adding favorite podcast ==
 POST users/[username]/fav-podcast/[id] => { added: feedId }
  -id: podcast's feed id
  -receives podcastData(feedId, author, title, artwork)
  -Authorization required: same user-as-:username **/
router.post('/:username/fav-podcast/:feedid', userOnly, async (req, res, next) => {
    try{
        // should I verify data even though it's not entered by user?
        const feedIdParam = +req.params.feedid;
        // call podcast api to get necessary data to make podData? or get frontend data
        // current setup is to get necessary data from frontend
        if(feedIdParam !== req.body.feedId){
            throw new BadRequestError('podcast Id does not match with request body')
        } 
        await User.addFav(req.params.username, req.body);
        return res.status(201).json({ added: feedIdParam })
    } catch (err){
        return next(err);
    } 
})

// ======== delete from favorite podcast =============//
/** DELETE users/[username]/fav-podcast/[id] => { deleted: feedId }
  -id: podcast's feed id
  -Authorization required: same user-as-:username
 **/
router.delete('/:username/fav-podcast/:feedid', userOnly, async (req, res, next) => {
    try{
        const feedIdParam = +req.params.feedid;        
        const deletedFeeId = await User.deleteFav(req.params.username, feedIdParam);
        return res.json({ deleted: deletedFeeId.feedId })
    } catch (err){
        return next(err);
    } 
})

//================================================//
// ============ user's review route ==============//
//================================================//

/**== adding review comment and rating ==
POST users/[username]/reviews/[feedid] => { newReview:{ id, userId, feedId, comment, rating }}
  -id: review table's feed_id
  -Authorization required: same user-as-:username
 **/
router.post('/:username/reviews/:feedid', userOnly, async (req, res,next) => {
    try{
        const feedId = +req.params.feedid;
        validateSchema(req.body, reviewSchema);
        const newReview = await User.addReview(req.params.username, feedId, req.body)
        return res.status(201).json({newReview})
    } catch (err){
        return next(err)
    }
})

/**== update review comment and rating ==
PATCH users/[username]/reviews/[id]  => {review: { id, user_id, feed_id, comment, rating }}
  -id: reviews table's id
  -Authorization required: same user-as-:username
 **/
  router.patch('/:username/reviews/:id', userOnly, async (req, res,next) => {
    try{
        validateSchema(req.body, reviewSchema);
        const reviewId = +req.params.id;
        const username = req.params.username;
        const review = await User.updateReview(username, reviewId, req.body);
        review.username = username;
        return res.json({review})
    } catch (err){
        return next(err)
    }
})

/**== delete review comment and rating ==
DELETE users/[username]/reviews/[id] => { deleted: id }
  -id: reviews table's id
  -Authorization required: same user-as-:username
 **/
  router.delete('/:username/reviews/:id', userOnly, async (req, res,next) => {
    try{
        const reviewId  = +req.params.id;
        const deletedId = await User.deleteReview(req.params.username, reviewId);
        return res.json({deleted: deletedId.id})
    } catch (err){
        return next(err)
    }
})


module.exports = router;