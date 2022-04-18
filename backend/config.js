const API_VERSION = "v1";
const IP_SERVER = "localhost";
const PORT_DB = 27017;
const { TwitterApi } = require("twitter-api-v2");
const appOnlyClient = new TwitterApi(
  "AAAAAAAAAAAAAAAAAAAAAIESZQEAAAAANGHuTJ5ZG84gPWO84VjUl4yZDM8%3D1AsFKH7DiC6CCyy1F2NHciEwzsETKNpT1aCTbVQDxM2sEbi2Ya"
);
module.exports = {
  API_VERSION,
  IP_SERVER,
  PORT_DB,
  appOnlyClient,
};
