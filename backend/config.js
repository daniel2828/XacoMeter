const API_VERSION = "v1";
const IP_SERVER = "localhost";
const PORT_DB = 27017;
const { TwitterApi } = require("twitter-api-v2");
const TWITTER_KEY = process.env.TWITTER_KEY;
const appOnlyClient = new TwitterApi(
  TWITTER_KEY
);
module.exports = {
  API_VERSION,
  IP_SERVER,
  PORT_DB,
  appOnlyClient,
};
