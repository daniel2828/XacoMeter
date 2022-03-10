
const Tweets = require("../models/tweets");
const { appOnlyClient } = require("../config");
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
  console.log(result.data);
  res.status(200).send(result);
}
/**
 * Search by query all the data of the last week
 * @param {*} req
 * @param {*} res
 */
async function searchByQuery(req, res) {
  // Query the last tweet
  let lastTweetId ="";

  Tweets.findOne({}).sort('-id_tweet').exec(async(err,tweet)=>{
 
      const buenCaminoSearch = await appOnlyClient.v2.search("#BuenCamino", {
        ...(tweet?.id_tweet ? {"since_id": tweet.id_tweet}:{}),
        "max_results": 100,
        "media.fields": "url",
        "expansions": "author_id,geo.place_id",
        "place.fields":
          "contained_within,country,country_code,full_name,geo,id,name,place_type",
        "tweet.fields":
          "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
      });
      let authors= buenCaminoSearch.includes.users;
      let places = buenCaminoSearch.includes.places;
      let tweetsArray = [];
      for await (const tweet of buenCaminoSearch) {
        if (tweet.author_id!==""){
           tweet.author = authors?.find(author => author.id === tweet.author_id);
           console.log("FOUND" ,  tweet.author )
        }
        if(tweet.geo){
          tweet.location = places?.find(place => place.id=== tweet.geo.place_id );
        }
        tweetsArray.push(tweet);
      }
      // Add tweets to DB
      tweetsArray.forEach((tweet) => {
        const tweets = new Tweets();
    
        tweets.id_tweet = tweet.id;
        tweets.hashtag = "BuenCamino";
        tweets.tweet = tweet;
    
        tweets.save((err, tweetStored) => {});
      });
      const {hashtag} = req.body;
  
      Tweets.find({},(err, tweets)=>{
        res.status(200).send(tweets);
      })
      //res.status(200).send(buenCaminoSearch);
  })
 
   
}
async function getTweetsByHashtag(req, res) {
  
 
}
module.exports = {
  testAPI,
  searchByQuery,
  getTweetsByHashtag
};
