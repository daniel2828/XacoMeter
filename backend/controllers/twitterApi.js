// const { TwitterApi } = require("twitter-api-v2");
// const clientID = "UDdTNjFjcGptVGJ2ZV9YZWlsakI6MTpjaQ";
// const clientSecret = "yvtV-D3CVWdzYpvzhRyGSIjM5iLf21EeA8TXJTGSVm4G0o_nKp";
const { appOnlyClient } = require("../config");
async function testAPI(req, res) {
  // OAuth2 (app-only or user context)
  // Create a client with an already known bearer token

  // OR - you can also create a app-only client from your consumer keys -
  // const appOnlyClientFromConsumer = await userClient.appLogin();
  /*const jsTweets = await appOnlyClient.v2.search("JavaScript", {
    "media.fields": "url",
  });*/
  // Read+Write level
  const rwClient = appOnlyClient.readWrite;

  const result = await rwClient.v2
    .get("tweets/search/recent", {
      query: "BuenCamino",
      max_results: 10,
    })
    .catch((err) => {
      console.log("ERROR", err);

      return err;
    });
  console.log(result.data);
  //console.log(result.data);
  // Consume every possible tweet of jsTweets (until rate limit is hit)
  // for await (const tweet of jsTweets) {
  //   console.log(tweet);
  // }
  res.status(200).send(result);
}
async function searchByQuery(req, res) {
  // OAuth2 (app-only or user context)
  // Create a client with an already known bearer token

  // OR - you can also create a app-only client from your consumer keys -
  // const appOnlyClientFromConsumer = await userClient.appLogin();
  /*const jsTweets = await appOnlyClient.v2.search("JavaScript", {
    "media.fields": "url",
  });*/
  // Read+Write level
  const { query, max_results } = req.body;
  const rwClient = appOnlyClient.readWrite;

  const result = await rwClient.v2
    .get("tweets/search/recent", {
      query: query,
      max_results: max_results,
    })
    .catch((err) => {
      console.log("ERROR", err);

      return err;
    });
  console.log(result.data);
  //console.log(result.data);
  // Consume every possible tweet of jsTweets (until rate limit is hit)
  // for await (const tweet of jsTweets) {
  //   console.log(tweet);
  // }
  res.status(200).send(result);
}
module.exports = {
  testAPI,
};
