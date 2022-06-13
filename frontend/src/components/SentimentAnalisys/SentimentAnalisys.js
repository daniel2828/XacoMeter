import React from "react";
import { useState } from "react";

import SentimentCard from "./SentimentCard";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

import { useTranslation } from "react-i18next";
import {TabPanel, a11yProps} from "../../utils/utils";
export default function SentimentAnalisys({ dataWithSentiment }) {
  console.log("Data sent", dataWithSentiment)
  let removeRepeated = []
  let removeRepeatedNeg = []
  const [value, setValue] = useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation();



  if (!dataWithSentiment) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("Positive tweets")} {...a11yProps(0)} />
              <Tab label={t("Negative tweets")} {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
           
           
            <Grid container spacing={2}>
              {dataWithSentiment?.sort(function (a, b) {
                  if (a?.sentiment?.score > b?.sentiment?.score) {
                    return -1;
                  }
                  if (a?.sentiment?.score < b?.sentiment?.score) {
                    return 1;
                  }
                  // a must be equal to b
                  return 0;
                })
                .filter((element) => {
                  //log element
                  if (element?.tweet?.referenced_tweets?.length >0){
                    // That means that ITS a retweet
                    return false
                  }
                    if (removeRepeatedNeg?.includes(element.id_tweet)) {
                   
                      return false;
                    }else{
                      removeRepeatedNeg.push(element.id_tweet);
                      return true;
                    }
                  })
                  .slice(0, 10)
                .map((element) => {
                  return (
                    <Grid key ={element.id_tweet} item xs={12} sm={6} md={6} lg={6} xl={4}>
                      <SentimentCard data={element} />
                    </Grid>
                  );
                })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
              {dataWithSentiment
                .sort(function (a, b) {
                  if (a?.sentiment?.score > b?.sentiment?.score) {
                    return 1;
                  }
                  if (a?.sentiment?.score < b?.sentiment?.score) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                })
                .filter((element) => {
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
                  .slice(0, 10)
                .map((element) => {
                  return (
                    <Grid key ={element.id_tweet} item xs={12} sm={8} md={8} lg={4} xl={4}>
                      <SentimentCard data={element} />
                    </Grid>
                  );
                })}
            </Grid>
          </TabPanel>
        </Box>
      </>
    );
  }
}
