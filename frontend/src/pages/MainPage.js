import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from "react-router";

import { getTweetsByHashtag } from "../api/tweets";
import { MenuItem, Select, Box } from "@mui/material/";

import { words } from "../utils/words";
import TabMain from "../components/Tabs/TabMain";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import "./CommonPages.scss";
import { getHashtags } from "../api/hashtags";
/**
 * Main page where the data of tweets is displayed
 * @returns MainPage component
 */
export default function MainPage() {
  // States
  const [hashtag, setHashtag] = useState("");
  const { t } = useTranslation();
  const [tweetData, setTweetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [languageData, setLanguageData] = useState([]);
  const [tweetDataForSentiment, setTweetDataForSentiment] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  // Handle changes into the hashtag
  const handleChange = async (e) => {
    setIsSearching(true);
    e?.preventDefault();
    const accessToken = getAccessTokenApi();
    const hashtagsRes = await getHashtags(accessToken);

    setHashtags(hashtagsRes.data);
    let tweetsPrev = await getTweetsByHashtag(
      e?.target?.value ? e?.target?.value : "",
      accessToken
    );
    tweetsPrev = tweetsPrev?.data?.filter((element) => {
      let ys = false;

      words.forEach((word) => {
        if (element?.tweet?.text?.toLowerCase().includes(word)) {
          ys = true;
        }
      });
      return ys;
    });

    setTweetData(tweetsPrev);
    setTweetDataForSentiment(tweetsPrev);
    // Use reduce
    let counts = tweetsPrev.reduce((p, c) => {
      let name = c.tweet.created_at.substring(0, 10);
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    let countsExtended = Object.keys(counts).map((k) => {
      return { name: k, uv: counts[k] };
    });
    setDaysData(countsExtended);
    // // Get the language counted
    let languageCounts = tweetsPrev.reduce((p, c) => {
      let name = c.tweet.lang;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    let languageCountsExtended = Object.keys(languageCounts).map((k) => {
      return { name: k, value: languageCounts[k] };
    });

    setLanguageData(languageCountsExtended);
    setHashtag(e?.target?.value ? e?.target?.value : "");
    setIsSearching(false);
  };
  // Effects
  useEffect(() => {
    handleChange();
  }, []);
  /**
   * Check the tokens to know if you need a re-login
   */

  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  } else if (isSearching) {
    return (
      <div className="controll-page">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <p>{t("loading tweets")}</p>{" "}
          <p>{t("Please notice that the time to load the tweets could be long depending on the volume of data")}</p>
          <CircularProgress size={150} sx={{ marginTop: "40px" }} />
        </Box>
      </div>
    );
  } else {
    return (
      <div className="controll-page">
        <h1>{t("Select the hashtag to display data.")}</h1>

        <Select
          labelId="select-hashtag"
          id="select-hashtag"
          value={hashtag}
          label="Hashtag"
          onChange={handleChange}
        >
          {hashtags?.map((hashtag) => {
            if (hashtag.active) {
              const value = (hashtag.isKeyword ? "" : "#") + hashtag.name;

              return (
                <MenuItem key={hashtag?.name} value={value}>
                  {value}
                </MenuItem>
              );
            }
          })}
        </Select>
        {tweetData?.length > 0 && (
          <>
            <h2>
              {t("Number of tweets registered since")}{" "}
              {daysData[daysData.length - 1]?.name}:
            </h2>
            <h2> {tweetData?.length}</h2>
            <TabMain
              tweetData={tweetData}
              tweetDataForSentiment={tweetDataForSentiment}
            ></TabMain>
          </>
        )}
      </div>
    );
  }
}
