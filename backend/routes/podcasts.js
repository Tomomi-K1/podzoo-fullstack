const express = require("express");

/**== EXTERNAL API related == */
const { API_KEY, API_SECRET } = require('./secret')
const api = require('podcast-index-api')(API_KEY, API_SECRET) 