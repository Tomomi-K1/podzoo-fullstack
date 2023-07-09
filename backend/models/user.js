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
class User {
  /** == authenticate user with username, password ==
  -Returns {username, password }
  -Throws UnauthorizedError if user not found or wrong password. 
  **/
  static async authenticate(username, password){
    // check if user exist
      const result = await db.query(
        `SELECT username, password, email
         FROM users
         WHERE username = $1`,
         [username]
      );
      const user = result.rows[0];
      if(user){
        const isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
          // delete password before returning user information for security
          delete user.password;
          console.log(`authenticate ${user.username}`);
          return user;
        }
      }
      throw new UnauthorizedError('Invalid username/password');
  }

  /** == Register user with data. ==
  - Returns { id, username, email }
  - Throws BadRequestError on duplicates
  - if adding db fails due to constraints throws BadRequest Error.
  **/
  static async register({username, password,  email}){
    const dupeCheck = await db.query(
       `SELECT username
        FROM users
        WHERE username = $1`, [username]
    );

    if(dupeCheck.rows[0]){
        throw new BadRequestError('Duplicate username ${username')
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    try{
      const result = await db.query(
          `INSERT INTO users 
                      (username, 
                      password,
                      email)
                  VALUES ($1, $2, $3)
                  RETURNING id, username, email`,
          [username, hashedPassword, email]);
      
      const user = result.rows[0];
      return user;
    } catch (err){
      throw new BadRequestError(err)
    }
  }

  /** ==get a user info ==
  - Given a username, return data about user.
  - Returns { id, username, email, fav : [feed_id, . . . . ] }
  - Throws NotFoundError if user not found.
  **/
  static async get(username){
      const userRes = await db.query(
        `SELECT id, username, email
         FROM users
         WHERE username = $1`,
         [username]
      );

      const user = userRes.rows[0];
      console.log(user)

      if(!user) throw new NotFoundError(`No User: ${username}`);

      const userFavPods = await db.query(
        `SELECT feed_id
         FROM fav_pods
         WHERE user_id = $1`,
         [user.id]
      )
      user.fav = userFavPods.rows.map(a => a.feed_id);
      console.log(user)
      return user;
  }
  
  /** == Update user data with `data` ==
   - Data can include: { email }
   - Returns { email }
   - Throws NotFoundError if not found.
   */
   static async update(username, data) {
    console.log(`User.update ran`)
    const result = await db.query(
        `UPDATE users 
         SET email=$1
         WHERE username = $2
         RETURNING username,
                   email`,
          [data.email, username]);
    const user = result.rows[0];
    console.log(username);

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }

  /** == Delete given user from database ==
   -return undefined  */
  static async delete(username) {
    let result = await db.query(
          `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

   /** == get user's favorites podcasts ==
   - username
   - returns array:[{id, userId, feedId, author, title, artworkUrl}, {...}]
   - throw NotFoundError
   **/  
  static async getAllFav(username){
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 

    const user = checkUser.rows[0];
    if(!user) throw new NotFoundError(`No username :${username}`)

    const result = await db.query(
      `SELECT id, user_id AS "userId", feed_id AS "feedId", author, title, artwork_url AS "artworkUrl"
       FROM fav_pods
       WHERE user_id = $1
       ORDER BY title`,
       [user.id]
    );
    return result.rows
   }

  /** == add favorites podcasts ==
   - username
   - podData: {feedId, author, title, artworkUrl} **/  
  static async addFav(username, podData){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw new NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
    const dupeCheckFav = await db.query(
      `SELECT feed_id
       FROM fav_pods
       WHERE feed_id =$1 AND user_id =$2`,
       [podData.feedId, user.id]
    )
    const dupe = dupeCheckFav.rows[0];
    if(dupe) throw new BadRequestError(`Already in Favorite. feedId : ${podData.feedId}`)
    
    try{
        await db.query(
          `INSERT INTO fav_pods (user_id, feed_id, author, title, artwork_url)
          VALUES ($1, $2, $3, $4, $5)`,
          [user.id, podData.feedId, podData.author, podData.title, podData.artworkUrl]
          //  double check how I construct podcast data when I send from frontend
        );
      } catch (err){
        // if db constraints throw an error we will catch here
        throw new BadRequestError('Failed to add to Favorite. DB error : ${err}')
      }
    
  }

  /** == delete favorites podcasts ==
   - username
   - feedId: feed_id in the fav_pods table
   - returning {feedId: Integer} 
   **/
  static async deleteFav(username, feedId){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    );
    const user = checkUser.rows[0];

    if(!user) throw new NotFoundError(`No username :${username}`)
    // find podcast in fav_pods table with feed_id && user.id
      let result = await db.query(
        `DELETE
         FROM fav_pods
         WHERE user_id = $1 AND feed_id =$2
         RETURNING feed_id AS "feedId"`,
        [user.id, feedId],
      );

      const deletedFeedId = result.rows[0];
      console.log(`deletedfeedid ${deletedFeedId}`);
      if (!deletedFeedId) throw new NotFoundError(`No podcast to delete: feedId${feedId}`);  
      return deletedFeedId;
    }

  /** == add podcasts reviews ==
   - username
   - data: {feed_id, comment, rating}
   - id: reviews table's id
   - returning : {id, userId, feedId, comment, rating}
   **/
   static async addReview(username, feedId, data){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw new NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
    const dupeCheckReview = await db.query(
      `SELECT feed_id
       FROM reviews
       WHERE feed_id =$1 AND user_id =$2`,
       [feedId, user.id]
    )
    const dupe = dupeCheckReview.rows[0];
    
    if(dupe) throw new BadRequestError('Only one review per podcast can be added')

    try{
        const result = await db.query(
          `INSERT INTO reviews (user_id, feed_id, comment, rating)
          VALUES ($1, $2, $3, $4)
          RETURNING id, user_id AS "userId", feed_id AS "feedId", comment, rating`,
          [user.id, feedId, data.comment, data.rating]
        )
        const newReview =result.rows[0];
        // use review id in the frontend of review container.
        return newReview; 
    } catch(err){
      throw new BadRequestError(`could not add to db. DB error: ${err}`)
    }
    
  }

/** == update podcasts reviews ==
   - username
   - reviewId: id on reviews table (this route should include reviewId in queryString)
   - data: {review, rating}
   - id: reviews table's id
   - returns :{id, userId, feedId, comment, rating}
   **/
   static async updateReview(username, reviewId, data){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw new NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
  
    const result = await db.query(
        `UPDATE reviews 
        SET comment=$1, rating=$2
        WHERE id =$3
        RETURNING id, user_id AS "userId", feed_id AS "feedId", comment, rating`,
        [data.comment, data.rating, reviewId]
      );
    const updatedReview = result.rows[0];
    
    if(!updatedReview) throw new NotFoundError(`No Review Found. ReviewId ${reviewId}`)
      
      return updatedReview; 
  }
    
  /** == delete podcasts reviews ==
   - username
   - reviewId : id on review table
   **/
  static async deleteReview(username, reviewId){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw new NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
    
    let result = await db.query(
      `DELETE
       FROM reviews
       WHERE id =$1 AND user_id =$2
       RETURNING id`,
      [reviewId, user.id],
    );

    const deletedReviewId = result.rows[0];
    if (!deletedReviewId) throw new NotFoundError(`no review to delete. reviewId ${reviewId}`); 
    return deletedReviewId;
  } 
}

module.exports = User;