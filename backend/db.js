"use strict";
/** Database setup for podsearch_db. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
        rejectUnauthorized: false
      }
  });
}

db.connect();

module.exports = db;