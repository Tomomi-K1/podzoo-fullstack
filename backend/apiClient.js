const PodcastIndexClient = require("podcastdx-client");
const { API_KEY, API_SECRET } = require("./config");

const api = new PodcastIndexClient(API_KEY, API_SECRET);
module.exports = api;
