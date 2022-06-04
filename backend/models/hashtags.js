const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HashtagSchema = Schema({
  name: String,
  active: Boolean,
  isKeyword: Boolean
});

module.exports = mongoose.model("Hashtag", HashtagSchema);
