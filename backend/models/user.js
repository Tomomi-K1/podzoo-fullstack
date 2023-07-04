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
        WHERE username = $1,`
        [username]
      );
      const user = result.rows[0];
      if(user){
        const isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
          // delete password before returning user information for security
          delete user.password;
          return user;
        }
      }
      throw new UnauthorizedError('Invalid username/password');
  }

  /** == Register user with data. ==
  - Returns { username, email }
  - Throws BadRequestError on duplicates.
  **/
  static async register({username, password,  email,image_url='../default.png'}){
    const dupeCheck = await db.query(
       `SELECT username
        FROM users
        WHERE username = $1`, [username]
    );

    if(dupeCheck.rows[0]){
        throw new BadRequestError('Duplicate username ${username')
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
        `INSERT INTO users 
                    (username, 
                     password,
                     email)
                VALUES ($1, $2, $3)
                RETURNING username, email`,
        [username, hashedPassword, email]);
    
    const user = result.rows[0];
    return user;
  }

  /** ==get a user info ==
  - Given a username, return data about user.
  - Returns { username, email, fav : [feed_id, . . . . ] }
  - Throws NotFoundError if user not found.
  **/
  static async get(username){
      const userRes = await db.query(
        `SELECT username, email
         FROM users
         WHERE username = $1`,
         [username]
      );

      const user = userRes.rows[0];

      if(!user) throw new NotFoundError(`No User: ${username}`);

      const userFavPods = await db.query(
        `SELECT feed_id
         FROM fav_pods
         WHERE user_id = $1`,
         [user.id]
      )
      user.fav = userFavPods.rows.map(a => a.feed_id);
      return user;
  }
  
  /** == Update user data with `data` ==
   - Data can include: { username, email }
   - Returns { username, email }
   - Throws NotFoundError if not found.
   */
   static async update(username, data) {
    const result = await db.query(
        `UPDATE users 
         SET username =$1, email=$2
         WHERE username = $3
         RETURNING username,
                   email`,
          [data.username, data.email, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
W
    return user;
  }

  /** == Delete given user from database ==
   -return undefined
  */

  static async remove(username) {
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

  /** == add favorites podcasts ==
   - username
   - podData: {feed_id, author, title, artwork_url}
   **/  
  static async addFav(username, podData){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
    const dupeCheckFav = await db.query(
      `SELECT feed_id
       FROM fav_pods
       WHERE feed_id =$1 AND username =$2`,
       [podData.feed_id, username]
    )
    const podcast = dupeCheckFav.rows[0];
    if(!podcast){
      await db.query(
        `INSERT INTO fav_pods (user_id, feed_id, author, title, artwork_url)
         VALUES ($1, $2, $3, $4, $5)`,
         [user.id, podData.feed_id, podData.author, podData.title, podData.artwork_url]
        //  double check how I construct podcast data when I send from frontend
      )
    }
  }

  /** == add podcasts reviews ==
   - username
   - data: {feed_id, review, rating}
   **/
   static async addReview(username, data){
    // check if user exists
    const checkUser = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`, [username]
    ) 
    const user = checkUser.rows[0];
    if(!user) throw NotFoundError(`No username :${username}`)
    // check if feedId already exists in fav_pods table
    const dupeCheckReview = await db.query(
      `SELECT feed_id
       FROM reviews
       WHERE feed_id =$1 AND username =$2`,
       [data.feed_id, username]
    )
    const podcast = dupeCheckFav.rows[0];
    if(!podcast){
      const review = await db.query(
        `INSERT INTO reviews (user_id, feed_id, comment, rating)
         VALUES ($1, $2, $3, $4)
         RETURNING id, user_id, feed_id, comment, rating`,
         [user.id, data.feed_id, data.comment, data.rating]
        //  double check how I construct podcast data when I send from frontend
      )
      return review;
    }
  } 

}

module.exports = User;