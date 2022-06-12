import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
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
  import { useState } from 'react';
import SentimentModal from './SentimentModal';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  
  </Box>
);

export default function SentimentCard({ data }) {
  const [loadingTweet, setLoadingTweet] = useState(true)
 const {t} = useTranslation();
  const newWords = data?.sentiment?.words?.map((word, index)=> {
   
       return (<p>{t("Word")}  :  {word?.value}  , {t("Score")}  {word?.score?.score}</p>)

  })
  return (
   

    <Card >
      <CardContent>
      
      
            
      <TwitterTweetEmbed onLoad={()=>setLoadingTweet(false)}   tweetId={data?.id_tweet} />
        
        {loadingTweet && (
          <>
          
          <CircularProgress />
          <p>{t("Loading tweet")}</p>
          </>
        )}
        
        {
        !loadingTweet &&(
          <>
           <p> {t("Total Score")}: {data?.sentiment?.score}</p>
           <SentimentModal newWords={newWords}/>
          </>
         
          
        )
       }

      </CardContent>
      
      <CardActions>
          
      </CardActions>
    </Card>
   

  );
}