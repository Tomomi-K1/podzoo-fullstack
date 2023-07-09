const express = require("express");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db');
const router = new express.Router();

/**== EXTERNAL API related == */
const { API_KEY, API_SECRET } = require('../secret')
const api = require('podcast-index-api')(API_KEY, API_SECRET) 

// models to communicate with DB
const User = require("../models/user");
// middleware
const { userOnly }= require('../middleware/auth') ;
// Errors
const { BadRequestError, } = require('../expressError');
// jsonschema
const jsonschema = require("jsonschema");

class Podcast{
    // get podcast ==> use for search
    // get podcast for certain category
    // get podcast reviews
}
module.exports = router;