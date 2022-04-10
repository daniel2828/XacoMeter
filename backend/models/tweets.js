const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TweetsSchema = Schema({
  id_tweet:String,
 
  hashtag: String,
  tweet: Object,
  sentiment: Object,
});
TweetsSchema.index({id_tweet:1, hashtag:1}, {unique: true})
module.exports = mongoose.model("Tweets", TweetsSchema);
