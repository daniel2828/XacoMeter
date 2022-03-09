const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetsSchema = Schema({
  id_tweet: {
    type: String,
    unique: true,
  },
  hashtag: String,
  tweet: Object,
});

module.exports = mongoose.model("Tweets", TweetsSchema);
