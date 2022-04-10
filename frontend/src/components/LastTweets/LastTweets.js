import React, {useState,useEffect} from "react";
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
  const [tweetsEmbed, setTweetsEmbed] = useState([])
  const [load, setLoad] = useState(false)
  
  useEffect(() => {
    
    setTweetsEmbed();
     setLoad(true)
  }, [])
  
 
      return (
          
        tweetData?.slice(0, 10).map((element) => {
          return (<TwitterTweetEmbed tweetId={element?.id_tweet} />)
        })
      )
  
}
