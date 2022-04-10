import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from "react-router";

import { getTweetsByHashtag } from "../api/tweets";
import {MenuItem, Select,Box} from "@mui/material/";


import { words } from "../utils/words";
import TabMain from "../components/Tabs/TabMain";
import { useTranslation } from "react-i18next";
import CircularProgress from '@mui/material/CircularProgress';

import "./MainPage.scss"
/**
 * Main page where the data of tweets is displayed
 * @returns MainPage component
 */
export default function MainPage() {
  // States
  const [hashtag, setHashtag] = useState("BuenCamino");
  const { t} = useTranslation();
  const [tweetData, setTweetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [isSearching, setIsSearching] = useState(true)
  const [languageData, setLanguageData] = useState([]);
  const [tweetDataForSentiment,setTweetDataForSentiment] = useState([]);
  // Handle changes into the hashtag
  const handleChange = async (e) => {
    setIsSearching(true);
    e?.preventDefault();
    const accessToken = getAccessTokenApi();
    const tweetsPrev = await getTweetsByHashtag(
      e?.target?.value ? e?.target?.value : "BuenCamino",
      accessToken
    );

    const tweets = tweetsPrev?.data?.filter((element) => {
      let includes = false;
      words.forEach((word) => {
        if (element?.tweet?.text?.toLowerCase().includes(word)) {
          includes = true;
        }
      });
      return includes;
    });
    setTweetData(tweets);
    setTweetDataForSentiment(tweets);
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
    // // Get the language counted
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
   
    setLanguageData(languageCountsExtended);
    setHashtag(e?.target?.value ? e?.target?.value : "BuenCamino");
    setIsSearching(false);
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
  } else if (isSearching) {
    return <Box sx={{ display: 'flex' , flexDirection:"column", alignItems:"center", marginTop:"30px" }}><p>{t("loading tweets")}</p> <CircularProgress size={150} sx={{marginTop:"40px"}}/></Box>;
  }
  else {
    return (
      <>
        <h1>{t("Select the hashtag to display data.")}</h1>

        <Select
          labelId="select-hashtag"
          id="select-hashtag"
          value={hashtag}
          label="Hashtag"
          onChange={handleChange}
        >
          <MenuItem value={"BuenCamino"}>#BuenCamino</MenuItem>
          <MenuItem value={"CaminoDeSantiago"}>#CaminoDeSantiago</MenuItem>
        </Select>
        <h2>
          {t("Number of tweets registered since")} {daysData[0]?.name}:
        </h2>
        <h2> {tweetData?.length}</h2>
        <TabMain tweetData={tweetData} tweetDataForSentiment={tweetDataForSentiment}></TabMain>
      </>
    );
  }
}
