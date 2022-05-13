const express = require("express");

const HashtagsController = require("../controllers/hashtags");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/createHashtag",[md_auth.ensureAuth], HashtagsController.createHashtag);

api.get("/getHashtags",[md_auth.ensureAuth], HashtagsController.getHashtags);

api.delete("/deleteHashtag/:id",[md_auth.ensureAuth], HashtagsController.deleteHashtag);

api.put("/updateHashtag", [md_auth.ensureAuth], HashtagsController.updateHashtag);
module.exports = api;
