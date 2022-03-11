import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
import "./MainPages.scss";
/**
 * Main page where the data of tweets is displayed
 * @returns MainPage component
 */
export default function MainPage() {
  // States
  const [tweetData, setTweetData] = useState([]);
  const [data, setData] = useState([]);
  // Handle changes into the hashtag
  const handleChange = async (e = undefined) => {
    e?.preventDefault();
    const tweets = await getTweetsByHashtag("BuenCamino");
    setTweetData(tweets);
    // Use reduce
    var counts = tweets.data.reduce((p, c) => {
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
    setData(countsExtended);
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
          Number of tweets registered since {data[0]?.name}
          {tweetData?.data?.length}
        </h2>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <div className="history-tweets">
              <h3>History of tweets</h3>
              <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
          </Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={8}></Grid>
        </Grid>
      </>
    );
  }
}
