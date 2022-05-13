import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  
  </Box>
);

export default function SentimentCard({ data }) {
  console.log("DATOS CARDS", data)
  return (
    <Card >
      <CardContent>
       
        <TwitterTweetEmbed  options={{ size:"80%", width:"80%"}}  tweetId={data?.id_tweet} />
        <p>Sentiment score {data?.sentiment?.score}</p>
      </CardContent>
      <CardActions>
          
      </CardActions>
    </Card>
  );
}