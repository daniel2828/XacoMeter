const express = require("express");

const TwitterController = require("../controllers/twitterApi");

const api = express.Router();

api.post("/test", TwitterController.testAPI);
api.post("/searchByQuery", TwitterController.searchByQuery);
//api.get("/getTweetsByHashtag", TwitterController.getTweetsByHashtag);
module.exports = api;
