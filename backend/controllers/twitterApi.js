const Tweets = require("../models/tweets");
const { appOnlyClient } = require("../config");
var sentiment = require("multilang-sentiment");

async function testAPI(req, res) {
  const rwClient = appOnlyClient.readWrite;

  const result = await rwClient.v2
    .get("tweets/search/all", {
      query: "BuenCamino",
      max_results: 10,
    })
    .catch((err) => {
      console.log("ERROR", err);

      return err;
    });

  res.status(200).send(result);
}
/**
 * Search by query all the data of the last week
 * @param {*} req
 * @param {*} res
 */
async function searchByQuery(req, res) {
  // Query the last tweet
  let lastTweetId = "";
  let { hashtag } = req.body;
  if (hashtag.substring(0, 1) == "#") {
    hashtag = hashtag.substring(1, hashtag.length);

  }
  //console.log(hashtag)
  const lastTweet = await Tweets.findOne({ hashtag: hashtag })
    .sort("-id_tweet")
    .exec();
  //console.log("LAST", lastTweet)

  let lessThanSevenDays = false;
  if (lastTweet?.length > 0) {
   
    const created = new Date(lastTweet?.tweet?.created_at);
    const dateToday = new Date();
    lessThanSevenDays = created < dateToday.setDate(dateToday.getDate() - 7);
  } else {
    console.log("NO TWEETS");
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
  // console.log("LEN", tweetsArray.length)
  // Add tweets to DB
  const capsuleTweets = () => {
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

  const newTweets = await capsuleTweets();

  console.log("NT", newTweets);
  let tweets = await Tweets.find({ hashtag: hashtag });

  //console.log("TEES", tweets)
  if (newTweets?.length > 0) {
    tweets.push(newTweets);
  }
  // let tweetsFiltered = tweets?.filter((element) => {
  //   let ys = false;
  //   //console.log("Words", words, element);
  //   words.words.forEach((word) => {
  //     if (element?.tweet?.text?.toLowerCase().includes(word)) {
  //       ys = true;
  //     }
  //   });
  //   return ys;
  // });
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
  console.log("RES");
  res.status(200).send(tweets);
}
async function getSentimentAnalysis(req, res) {
  const { hashtag } = req.body;
  const tweets = await Tweets.find({ hashtag: hashtag }).sort({ id_tweet: 1 });
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
          console.log("Actualiza");
        }
      );
      tweet.sentiment = sentiment;
      tweetsRet.push(tweet);
    } else {
      tweetsRet.push(tweet);
    }
  });
  res.status(200).send(tweetsRet);
  // let tweetsArray = [];
}
async function modifyRecordsArray(req, res) {
  const { hashtag } = req.body;
  const tweets = await Tweets.find({ hashtag: hashtag }).sort({ id_tweet: 1 });
  let tweetsRet = [];
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
              console.log("ERROR", err);
            }else{
  
        
            }
          }
        );
      }
      
     
      //tweet.sentiment = sentiment;
      //tweetsRet.push(tweet);
    }
  });
  res.status(200).send("OK");
  // let tweetsArray = [];
}
// async function getGrouped(req, res) {
//   const tweets = await Tweets.aggregate( [
//     {
//       $group: {
//          _id: {},
//       }
//     }
//   ] )

// }
module.exports = {
  testAPI,
  searchByQuery,
  getSentimentAnalysis,
  modifyRecordsArray,
  // getGrouped
};
