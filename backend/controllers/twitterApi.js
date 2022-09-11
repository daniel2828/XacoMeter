const Tweets = require("../models/tweets");
const {processHashtags} = require("../utils/reusable");
const sentiment = require("multilang-sentiment");


const logger = require("../logging/winstonLogger");
async function testAPI(req, res) {
  res.status(200).json({ name: 'john' });
}
/**
 * Search by query all the data of the last week
 * @param {*} req
 * @param {*} res
 */
async function searchByQuery(req, res) {
  // Query the last tweet

  let { hashtag } = req.body;
  const newTweets = await processHashtags(hashtag);


  logger("Nuevos tweets", newTweets);
  let tweets = await Tweets.find({ hashtag: hashtag.toString() });

  if (newTweets?.length > 0) {
    tweets.push(newTweets);
  }

  tweets.sort((a, b) => {
    if (a.id_tweet < b.id_tweet) {
      return 1;
    }
    if (a.id_tweet > b.id_tweet) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
 
  res.status(200).send(tweets);
}
async function getByHashtag(req,res){
  let { hashtag } = req.body;
  if (hashtag.substring(0, 1) == "#") {
    hashtag = hashtag.substring(1, hashtag.length);

  }
  const query = { hashtag: hashtag.toString() };
  const tweets = await Tweets.find(query);
  res.status(200).send(tweets);
}
async function getSentimentAnalysis(req, res) {
  const { hashtag } = req.body;
  const tweets = await Tweets.find({ hashtag: hashtag.toString() }).sort({ id_tweet: 1 });
  let tweetsRet = [];
  tweets.forEach((tweet) => {
    if (tweet.sentiment == undefined) {
      let sentimentData;
      try {
        sentimentData = sentiment(
          tweet.tweet.text,
          tweet.tweet.lang !== "und" ? tweet.tweet.lang : "es"
        );
      } catch (error) {
        sentimentData = sentiment(tweet.tweet.text, "en");
      }

      Tweets.updateOne(
        { _id: tweet._id },
        { sentiment: sentimentData },
        { multi: true },
        function (err, numberAffected) {
          logger("Tweets actualizados", numberAffected);
        }
      );
      tweet.sentiment = sentiment;
      tweetsRet.push(tweet);
    } else {
      tweetsRet.push(tweet);
    }
  });
  res.status(200).send(tweetsRet);
}
async function modifyRecordsArray(req, res) {
  const { hashtag } = req.body;
  const tweets = await Tweets.find({ hashtag: hashtag.toString() }).sort({ id_tweet: 1 });

  tweets.forEach((tweet) => {
    if (tweet.sentiment != undefined) {
      let sentimentWords = tweet.sentiment.words;
      let newArrayWords = [];
      let hastoUpdate=false;
      sentimentWords?.forEach((word) => {
        if (word?.value == undefined) {
          hastoUpdate = true;

          let newWord = {};
          newWord.value = word;

          try {
            newWord.score = sentiment(
              word,
              tweet.tweet.lang !== "und" ? tweet.tweet.lang : "es"
            );
          } catch (error) {
            newWord.score = sentiment(word, "en");
          }

          newArrayWords.push(newWord);
        }

      });
      if (hastoUpdate){
        Tweets.updateOne(
          { _id: tweet._id },
          { "sentiment.words": newArrayWords },
          { multi: true },
          function (err, numberAffected) {
            if (err) {
              logger("ERROR actualizando", err);
            }else{
  
        
            }
          }
        );
      }
      
    }
  });
  res.status(200).send("OK");

}

module.exports = {
  testAPI,
  searchByQuery,
  getSentimentAnalysis,
  modifyRecordsArray,
  getByHashtag
  
};
