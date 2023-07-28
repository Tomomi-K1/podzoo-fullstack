"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");
// const {secretKey, ApiKey, ApiSecret} = require('./secret');
// const SECRET_KEY = process.env.SECRET_KEY || secretKey;
// const API_KEY = process.env.API_KEY || ApiKey;
// const API_SECRET = process.env.API_SECRET || ApiSecret;
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const PORT = 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///podsearch_db_test"
      : process.env.DATABASE_URL || "postgresql:///podsearch_db";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("---");
console.log("Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  SECRET_KEY,
  API_KEY,
  API_SECRET
};