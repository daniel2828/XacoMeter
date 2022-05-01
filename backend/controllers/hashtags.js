
const Hashtags = require("../models/hashtags");
async function createHashtag(req, res) {
  const {name} = req.body;
  const hashtag = new Hashtags();
  hashtag.name = name;
  hashtag.active = true;
  const response = await hashtag.save();
  res.status(200).send(response);
}
async function getHashtags(req, res) {
    console.log("HOLA")
    let hashtags = await Hashtags.find();
    res.status(200).send(hashtags);
  }
async function deleteHashtag(req, res) {
    const {_id} = req.body;
    let response = await Hashtags.findByIdAndDelete(_id);
    console.log("REES", response)
    res.status(200).send(response);
}
async function updateHashtag(req, res) {
    const {_id, active} = req.body;
    let response = await Hashtags.findByIdAndUpdate(_id, {$set: {active: active}});
    res.status(200).send(response);
}
module.exports = {
    createHashtag,
    getHashtags,
    deleteHashtag,
    updateHashtag
    // getGrouped
  };
  