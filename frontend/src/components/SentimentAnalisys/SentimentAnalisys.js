import React from "react";
import { useEffect, useState } from "react";
import { getSentimentAnalysis } from "../../api/tweets";
import { getAccessTokenApi } from "../../api/auth";
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
import SentimentCard from "./SentimentCard";
import { Grid } from "@mui/material";
export default function SentimentAnalisys({ dataWithSentiment }) {
  //const [dataWithSentiment, setDataWithSentiment] = useState([]);
  //   useEffect(() => {
  //     const accessToken = getAccessTokenApi();
  //     getSentimentAnalysis(accessToken).then(data => {
  //       setDataWithSentiment(data);
  //     });
  //   },[]);
  let dataSortByScore = dataWithSentiment;
  if (!dataWithSentiment){
    return (<>Loading...</>)
  }
  else{
    return (
      <>
        <div>SentimentAnalisys</div>
        <Grid container spacing={2}>
          {dataWithSentiment
            .sort(function (a, b) {
              if (a?.sentiment?.score < b?.sentiment?.score) {
                return 1;
              }
              if (a?.sentiment?.score > b?.sentiment?.score) {
                return -1;
              }
              // a must be equal to b
              return 0;
            })
            .slice(0, 10)
            .map((element) => {
              return (
              
                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <SentimentCard data={element} />
                  </Grid>
               
              );
            })}
        </Grid>
      </>
    );
  }
 
}
