import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Grid from "@mui/material/Grid";
import "./Graphs.scss";
import PieChartComp from "../../../components/PieChartComp"
import {words} from "../../../utils/words"; 
import WordCloud from "../../../components/Graphs/WordCloud";
/**
 * Main page where the data of tweets is displayed
 * @returns MainPage component
 */
export default function MainPage({tweetData}) {
  // States
  const [daysData, setDaysData] = useState([]);
  const [languageData, setLanguageData] = useState([])
  // Handle changes into the hashtag
  const handleChange = async (e = undefined) => {
    e?.preventDefault();
  
    // Use reduce
    var counts = tweetData.reduce((p, c) => {
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
    var languageCounts = tweetData.reduce((p, c) => {
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
  }, [tweetData]);
  /**
   * Check the tokens to know if you need a re-login
   */
 
    return (
      <>
      
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <div className="history-tweets">
              <h3>History of tweets</h3>
              <LineChart width={600} height={300} data={daysData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            
            <h2>
              Language distribution. Number of different languages detected: {languageData?.length}
              
            </h2>
            <PieChartComp data={languageData} />
          </Grid>
          <Grid item xs={12} md={12}>
            <WordCloud  tweetData={tweetData}/>
          </Grid>
          <Grid item xs={6} md={8}></Grid>
        </Grid>
      </>
    );
  
}
