"use strict";

/** middleware to handle common auth cases in routes. */
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/* == how should token be included == 
- token should be send in headers
- headers : {Authorization : bearer <token>}
*/

/* middleware to verify token if token was received */
function authenticateJWT(req, res, next){
    try{
        console.debug(`authenticateJWT ran`)
       
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader){
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user=jwt.verify(token, SECRET_KEY);         
        }
        return next();
    } catch(err){
        return next();
    }
}

/* middleware to limit access only to user */
function userOnly(req, res, next){
    try{
        const user = res.locals.user;
        if(!user || (user.username !== req.params.username)){
            throw new UnauthorizedError();
        } 
        return next();
    } catch (err){
        return next(err);
    }
}

module.exports ={
    authenticateJWT,
    userOnly
}
