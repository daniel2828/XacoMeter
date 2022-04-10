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
export default function SentimentAnalisys({ dataWithSentiment }) {
  //const [dataWithSentiment, setDataWithSentiment] = useState([]);
  //   useEffect(() => {
  //     const accessToken = getAccessTokenApi();
  //     getSentimentAnalysis(accessToken).then(data => {
  //       setDataWithSentiment(data);
  //     });
  //   },[]);
  let dataSortByScore = dataWithSentiment;
 
  return (
    <>
      <div>SentimentAnalisys</div>
      {dataWithSentiment.sort(function (a, b) {
      if (a?.sentiment?.score < b?.sentiment?.score) {
        return 1;
      }
      if (a?.sentiment?.score > b?.sentiment?.score) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }).slice(0, 10).map((element) => {
        return (
          <>
                <SentimentCard  data={element} />
           
          </>
        );
      })}
    </>
  );
}
