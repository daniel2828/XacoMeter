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

  const {t} = useTranslation();
  const [loadingTweet, setLoadingTweet] = useState(true);
  const [tweetSorted, setTweetSorted] = useState([])
  let tweetSort = tweetData;
  useEffect(() => {
    let removeRepeated = []
    const sortedData = tweetSort?.sort(function (a, b) {
       if (moment(a?.tweet?.created_at).isAfter(moment(b?.tweet?.created_at))) {
        return -1;
      }
      if (moment(a?.tweet?.created_at).isBefore(moment(b?.tweet?.created_at))) {
        return 1;
      }
      // a must be equal to b
      //return 0;
    }).filter((element) => {
    //log element
    if (element?.tweet?.referenced_tweets?.length >0){
      // That means that ITS a retweet
      return false
    }
      if (removeRepeated?.includes(element.id_tweet)) {
        //console.log("LLL", element)
        return false;
      }else{
        removeRepeated.push(element.id_tweet);
        return true;
      }
    })
    .slice(0, 10);
    
    setTweetSorted(sortedData);
  }, [tweetData])
  

 

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
