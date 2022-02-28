const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetsSchema = Schema({
  id_tweet: {
    type: String,
    unique: true,
  },
  hashtag: String,
  text: String,
});

module.exports = mongoose.model("Tweets", TweetsSchema);
