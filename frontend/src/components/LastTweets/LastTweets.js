import { CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import moment from "moment";
export default function LastTweets({ tweetData }) {
  const [tweetsEmbed, setTweetsEmbed] = useState([]);
  const [load, setLoad] = useState(false);
  const {t} = useTranslation();
  const [loadingTweet, setLoadingTweet] = useState(true);
  const [tweetSorted, setTweetSorted] = useState([])
  let tweetSort = tweetData;
  useEffect(() => {
    let removeRepeated = []
    tweetSort= tweetSort?.sort(function (a, b) {
      if (moment(a?.tweet?.createdAt) > moment(b?.tweet?.createdAt)) {
        return -1;
      }
      if (moment(a?.tweet?.createdAt) < moment(b?.tweet?.createdAt)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }).filter((element) => {
      if (removeRepeated?.includes(element.tweet_id)) {
        return true;
      }else{
        removeRepeated.push(element.tweet_id);
        return false;
      }
    })
    .slice(0, 10);
    setTweetSorted(tweetSort);
  }, [tweetData])
  

 
  console.log("AWED", tweetSort);
  useEffect(() => {
    setTweetsEmbed();
    setLoad(true);
  }, []);
  if (!tweetSorted) {
    return <>Loading...</>;
  } else {
    return (
      <Grid container spacing={4}>
        {tweetSorted?.map((element) => {
          return (
            <Grid key={element?.id_tweet} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <TwitterTweetEmbed
                onLoad={() => setLoadingTweet(false)}
                //options={}
                tweetId={element?.id_tweet}
              />

              {loadingTweet && (
                <>
                  <CircularProgress />
                  <p>{t("Loading tweet")}</p>
                  
                </>
              )}

             
            </Grid>
          );
        })}
      </Grid>
    );
  }
}
