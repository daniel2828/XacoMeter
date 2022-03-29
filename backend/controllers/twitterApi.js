
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
  const {hashtag} = req.body;
  //console.log(hashtag)
  const lastTweet = await Tweets.findOne({hashtag:hashtag}).sort('-id_tweet').exec()
  //console.log("LAST", lastTweet)
  const buenCaminoSearch = await appOnlyClient.v2.search(`#${hashtag}`, {
    ...(lastTweet?.id_tweet ? {"since_id": lastTweet.id_tweet}:{}),
    "max_results": 100,
    "media.fields": "url",
    "expansions": "author_id,geo.place_id",
    "place.fields":
      "contained_within,country,country_code,full_name,geo,id,name,place_type",
    "tweet.fields":
      "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
  });
 // console.log("BCS", buenCaminoSearch);
  let authors= buenCaminoSearch.includes.users;
  let places = buenCaminoSearch.includes.places;
  let tweetsArray = [];
  for await (const tweet of buenCaminoSearch) {
    if (tweet.author_id!==""){
       tweet.author = authors?.find(author => author.id === tweet.author_id);
       //console.log("FOUND" ,  tweet.author )
    }
    if(tweet.geo){
      tweet.location = places?.find(place => place.id=== tweet.geo.place_id );
    }
    tweetsArray.push(tweet);
  }
  //console.log("LEN", tweetsArray.length)
  // Add tweets to DB
  const capsuleTweets = ()=>{
    let newTweets = [];
    tweetsArray.forEach(async(tweet) => {
    
      const tweets = new Tweets();
  
      tweets.id_tweet = tweet.id;
      tweets.hashtag = hashtag;
      tweets.tweet = tweet;
      newTweets.push(tweets);
      await tweets.save((err, tweetStored) => {
        console.log("err", err)
      });
    });
    return newTweets
  }

  const newTweets = await capsuleTweets();
  console.log("NT",newTweets);
  let tweets = await Tweets.find({hashtag:hashtag}).sort( { id_tweet: 1 } )
  //console.log("TEES", tweets)
  if (newTweets.length>0){
    tweets.push(newTweets);
  } 
  res.status(200).send(tweets);
   
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
 // getGrouped
};
