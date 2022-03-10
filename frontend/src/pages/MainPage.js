import React , {useEffect, useState} from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {getTweetsByHashtag} from "../api/tweets";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip  } from 'recharts';

export default function MainPage() {
  const handleChange = async(e=undefined) => {
    console.log("Selected")
    e?.preventDefault();
    const tweets = await getTweetsByHashtag("BuenCamino");
    let dataArr =[];
    tweets.data.forEach(element => {
      console.log(element);
      dataArr.push({
        name: element.tweet.created_at.substring(0,10),
        uv: 1,
        pv: 2400, 
        amt: 2400
      })
    });
    setData(dataArr);
  //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 1, amt: 2}];  
  };
  useEffect(async() => {
    console.log("Selected")
    
    handleChange();
  }, [])
  
 
  const [data, setData] = useState([])
  const renderLineChart = (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);
  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <>
        <h1>Select the hashtag to display data.</h1>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <Select
            labelId="select-hashtag"
            id="select-hashtag"
            value={"BuenCamino"}
            label="Hashtag"
            onChange={handleChange}
          >
            <MenuItem value={"BuenCamino"}>#BuenCamino</MenuItem>
         </Select>
          {renderLineChart}
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          /> */}

          {/* <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Search
          </Button> */}
        {/* </Box> */}
      </>
    );
  }
}
