const express = require("express");

const TwitterController = require("../controllers/twitterApi");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/test", TwitterController.testAPI);
api.post("/searchByQuery",[md_auth.ensureAuth], TwitterController.searchByQuery);
api.post("/getSentiment",[md_auth.ensureAuth], TwitterController.getSentimentAnalysis);
module.exports = api;
