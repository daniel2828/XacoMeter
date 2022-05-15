const cron = require("node-cron");
const Hashtags = require("../models/hashtags");
const Tweets = require("../models/tweets");
const { appOnlyClient } = require("../config");
var sentiment = require("multilang-sentiment");
/**
 * Search by query all the data of the last week
 * @param {*} req
 * @param {*} res
 */
 async function processHashtags(hashtag) {
    // Query the last tweet
    console.log("PROCESANDO HASHTAG", hashtag)
    let lastTweetId = "";
    const lastTweet = await Tweets.findOne({ hashtag: hashtag })
      .sort("-id_tweet")
      .exec();
    console.log("LAST", lastTweet)  
    console.log("TEST");
     const created = lastTweet?.tweet?.created_at ? new Date(lastTweet.tweet.created_at) : new Date().getDate() - 7;
    console.log("CREATED", created)
     const dateToday = new Date();
    const lessThanSevenDays =
      created < dateToday.setDate(dateToday.getDate() - 7);
  
    const buenCaminoSearch = await appOnlyClient.v2.search(`#${hashtag}`, {
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
        let sentimentData = sentiment(
          tweet.text,
          tweet.lang !== "und" ? tweet.lang : "es"
        );
        tweets.sentiment = sentimentData;
  
        await tweets.save((err, tweetStored) => {
          console.log("err", err);
        });
      });
      return newTweets;
    };
    const tweets = capsuleTweets();
    console.log("Tweets", tweets);
    
  }
//every day cronjobs
async function createCronJobs() {
  
  cron.schedule("0 0 0 * * *", () => {
    
     
    Hashtags.find({}).then((hashtags) => { 
        console.log("ASDAWD")
        hashtags.forEach(async (hashtag) => {
            console.log(hashtag);
            await processHashtags(hashtag.name);
        });
     });
  
  });

}
module.exports = {
  createCronJobs,
};
