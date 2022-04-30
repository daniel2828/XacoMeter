
const Hashtags = require("../models/hashtags");
async function createHashtag(req, res) {
  const {name} = req.body;


  const hashtag = new Hashtags();

  hashtag.name = name;
  hashtag.active = true;
  const response = await hashtag.save();
  res.status(200).send(response);
}
module.exports = {
    createHashtag
    // getGrouped
  };
  