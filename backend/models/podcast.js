"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
// const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require('../config');
/** == user db schema
  - username
  - password
  - email
  - signup date(automatically assigned)
*/
class Podcast {

   /** == get all reviews for a podcast ==
   - feedId
   - returns {id, userId, feedId, author, title, artworkUrl}
   **/  
  static async getReviews(feedId){
    // use join table so that I can get username double check hot it works.
    const reviews = await db.query(
      `SELECT r.id, r.user_id AS "userId", u.username, r.feed_id AS "feedId", r.comment, r.rating, r.created_at AS "createdAt"
       FROM reviews AS r
       JOIN users AS u ON r.user_id = u.id
       WHERE r.feed_id = $1
       ORDER BY r.created_at`,
       [feedId]       
    );
      //should I get an average rating here or at front end? 
     return reviews.rows
   }

  

}

module.exports = Podcast;