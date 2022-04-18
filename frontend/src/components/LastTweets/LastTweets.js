import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default function LastTweets({ tweetData }) {
  console.log("OPENING", tweetData);
  const [tweetsEmbed, setTweetsEmbed] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTweetsEmbed();
    setLoad(true);
  }, []);
  if (!tweetData){
    return (<>Loading...</>);
  }else{
    return (
      <Grid container spacing={4}>
        {tweetData?.slice(0, 10).map((element) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <TwitterTweetEmbed tweetId={element?.id_tweet} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  
}
