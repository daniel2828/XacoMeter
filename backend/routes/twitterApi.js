const express = require("express");

const TwitterController = require("../controllers/twitterApi");
const api = express.Router();

api.post("/test",TwitterController.testAPI)

module.exports = api;
