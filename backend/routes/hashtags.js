const express = require("express");

const HashtagsController = require("../controllers/hashtags");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/createHashtag",[md_auth.ensureAuth], HashtagsController.createHashtag);
module.exports = api;
