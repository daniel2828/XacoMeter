const { TwitterApi } = require("twitter-api-v2");
const clientID = "UDdTNjFjcGptVGJ2ZV9YZWlsakI6MTpjaQ";
const clientSecret = "yvtV-D3CVWdzYpvzhRyGSIjM5iLf21EeA8TXJTGSVm4G0o_nKp";
async function testAPI(req, res) {
  // OAuth2 (app-only or user context)
  // Create a client with an already known bearer token
  const appOnlyClient = new TwitterApi(
    "AAAAAAAAAAAAAAAAAAAAAIESZQEAAAAANGHuTJ5ZG84gPWO84VjUl4yZDM8%3D1AsFKH7DiC6CCyy1F2NHciEwzsETKNpT1aCTbVQDxM2sEbi2Ya"
  );
  // OR - you can also create a app-only client from your consumer keys -
  // const appOnlyClientFromConsumer = await userClient.appLogin();
  const jsTweets = await appOnlyClient.v2.search("JavaScript", {
    "media.fields": "url",
  });

  // Consume every possible tweet of jsTweets (until rate limit is hit)
  for await (const tweet of jsTweets) {
    console.log(tweet);
  }
}
module.exports = {
  testAPI,
};
