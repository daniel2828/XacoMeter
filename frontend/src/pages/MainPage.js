import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from "react-router";

import { getTweetsByHashtag } from "../api/tweets";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Grid from "@mui/material/Grid";
//import "./MainPages.scss";
import PieChartComp from "../components/PieChartComp"
import {words} from "../utils/words"; 
import WordCloud from "../components/Graphs/WordCloud";
import TabMain from "../components/Tabs/TabMain";
/**
 * Main page where the data of tweets is displayed
 * @returns MainPage component
 */
export default function MainPage() {
  // States
  const [tweetData, setTweetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [languageData, setLanguageData] = useState([])
  // Handle changes into the hashtag
  const handleChange = async (e = undefined) => {
    e?.preventDefault();
    const tweetsPrev = await getTweetsByHashtag("BuenCamino")

    const tweets = tweetsPrev?.data?.filter(element=>{

      let includes = false;
      words.forEach(word=>{
        if (element.tweet.text.includes(word)){
          includes = true;
        }
      })
      return includes;
    });
    setTweetData(tweets);
    // Use reduce
    var counts = tweets.reduce((p, c) => {
      var name = c.tweet.created_at.substring(0, 10);
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    var countsExtended = Object.keys(counts).map((k) => {
      return { name: k, uv: counts[k] };
    });
    setDaysData(countsExtended);
    // Get the language counted
    var languageCounts = tweets.reduce((p, c) => {
      var name = c.tweet.lang;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    var languageCountsExtended = Object.keys(languageCounts).map((k) => {
      return { name: k, value: languageCounts[k] };
    });
    console.log("language", languageCountsExtended)
    setLanguageData(languageCountsExtended);
  };
  // Effects
  useEffect(async () => {
    handleChange();
  }, []);
  /**
   * Check the tokens to know if you need a re-login
   */
  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <>
        <h1>Select the hashtag to display data.</h1>
        <Select
          labelId="select-hashtag"
          id="select-hashtag"
          value={"BuenCamino"}
          label="Hashtag"
          onChange={handleChange}
        >
          <MenuItem value={"BuenCamino"}>#BuenCamino</MenuItem>
        </Select>
        <h2>
          Number of tweets registered since {daysData[0]?.name}: 
        
        </h2>
        <h2>  {tweetData?.length}</h2>
        <TabMain tweetData={tweetData}></TabMain>
      </>
    );
  }
}
