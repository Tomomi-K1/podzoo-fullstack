const express = require('express');
const { get } = require('../app');
const app = require('../app');
const { BCRYPT_WORK_FACTOR } = require('../config');
const bcrypt = require("bcrypt");
const db = require('../db');
const router = new express.Router();

const User = require("../models/user");
const { ExpressError } = require('../expressError');


/**  == POST /users/register  ==
 - user must include { username, password, email }
 - { user } => { token }
 - Returns JWT token which can be used to authenticate further requests.
 */
router.post('/register', async (req, res, next) => {
    try {
        // write code to validate json data with jsonschema
       const user = await User.register(req.body)
    //    send token back here?
       return res.status(201).JSON(user)
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
        // write code to validate json data with jsonschema
        const {username, password} = req.body;
       
        const token = createToken(user);
        return res.json({token})
    } catch (err){
        return next(err);
    }

    return 
})


/** GET /[username] => { user }
  -Returns { username, email, podcasts, categories } *
  -Authorization required: same user-as-:username
 **/

module.exports = router;