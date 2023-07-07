const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeEach() {
  // before starting the test clear all tables
  await db.query("DELETE FROM reviews");
  await db.query("DELETE FROM fav_pods");
  await db.query("DELETE FROM users");

  await db.query(`
    INSERT INTO users(id, username, password, email)
    VALUES (1, 'user1', $1, 'user1@gmail.com'),
           (2, 'user2', $2, 'user2@gmail.com'),
           (3, 'user3', $3, 'user3@gmail.com'),
           (10, 'user10', $4, 'user10@gmail.com')`,
           [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password3", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password10", BCRYPT_WORK_FACTOR)
           ]);

  await db.query(`
    INSERT INTO fav_pods (id, user_id, feed_id, author, title, artwork_url)
    VALUES (1, 1, 100, 'author1', 'title1', 'artwork1.com'),
           (2, 2, 200, 'author2', 'title2', 'artwork2.com'),
           (3, 3, 300, 'author3', 'title3', 'artwork3.com')`
    );

  await db.query(`
        INSERT INTO reviews (id, user_id, feed_id, comment, rating)
        VALUES (1, 1, 100, 'comment1', 1),
               (2, 2, 200, 'comment2', 2),
               (3, 3, 300, 'comment3', 3),
               (4, 1, 200, 'comment1-2', 4)`,
        );
}

// async function commonBeforeEach() {
//   await db.query("BEGIN");
// }

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};