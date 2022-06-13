const Tweets = require("../models/tweets");
const { appOnlyClient } = require("../config");
var sentiment = require("multilang-sentiment");
const capsuleTweets = (tweetsArray, hashtag) => {
  let newTweets = [];
  tweetsArray.forEach(async (tweet) => {
    const tweets = new Tweets();

    tweets.id_tweet = tweet.id;
    tweets.hashtag = hashtag;
    tweets.tweet = tweet;
    newTweets.push(tweets);
    // MAKE SENTIMENT ANALISYS
    try {
      let sentimentData = sentiment(
        tweet.text,
        tweet.lang !== "und" ? tweet.lang : "es"
      );
      tweets.sentiment = sentimentData;
      if (tweets.sentiment != undefined) {
        let sentimentWords = tweets.sentiment.words;
        let newArrayWords = [];
        sentimentWords?.forEach((word) => {
          let newWord = {};
          newWord.value = word;

          try {
            newWord.score = sentiment(
              word,
              tweets.tweet.lang !== "und" ? tweets.tweet.lang : "es"
            );
          } catch (error) {
            newWord.score = sentiment(word, "en");
          }

          newArrayWords.push(newWord);
        });
        tweets.sentiment.words = newArrayWords;
      }

      await tweets.save((err, tweetStored) => {
        console.log("err", err);
      });
    } catch (error) {
      console.log("ERROR EL Lenguaje no es válido para análisis", error);
    }
  });
  return newTweets;
};

const processHashtags = async(hashtag)=> {
  // Query the last tweet

  if (hashtag.substring(0, 1) == "#") {
    hashtag = hashtag.substring(1, hashtag.length);
  }
  console.log(hashtag);
  const lastTweet = await Tweets.findOne({ hashtag: hashtag })
    .sort("-id_tweet")
    .exec();

  let lessThanSevenDays = false;
  //console.log(lastTweet?.length)
  if (lastTweet) {
    const created = new Date(lastTweet?.tweet?.created_at);
    const dateToday = new Date();
    lessThanSevenDays = created < dateToday.setDate(dateToday.getDate() - 7);
  }
  const buenCaminoSearch = await appOnlyClient.v2.search(hashtag, {
    ...(lastTweet?.id_tweet && lessThanSevenDays == false
      ? { since_id: lastTweet.id_tweet }
      : {}),
    max_results: 100,
    "media.fields": "url",
    expansions: "author_id,geo.place_id",
    "place.fields":
      "contained_within,country,country_code,full_name,geo,id,name,place_type",
    "tweet.fields":
      "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
  });
  // console.log("BCS", buenCaminoSearch);
  let authors = buenCaminoSearch.includes.users;
  let places = buenCaminoSearch.includes.places;
  let tweetsArray = [];
  for await (const tweet of buenCaminoSearch) {
    if (tweet.author_id !== "") {
      tweet.author = authors?.find((author) => author.id === tweet.author_id);
      //console.log("FOUND" ,  tweet.author )
    }
    if (tweet.geo) {
      tweet.location = places?.find((place) => place.id === tweet.geo.place_id);
    }
    tweetsArray.push(tweet);
  }

  // Add tweets to DB

  return capsuleTweets(tweetsArray,hashtag);
}

module.exports = {
  processHashtags,
};
