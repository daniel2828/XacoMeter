import React, {useState} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MenuItem, Select } from "@mui/material/";
import { useTranslation } from "react-i18next";
export default function BarChartComp({ tweetData }) {
  const {t} = useTranslation();
  const [numTweets, setNumTweets] = useState(100)
  let dictData = {};
  /**
   * Create the dict of authors
   */
  tweetData?.forEach((tweet) => {
    if (tweet.tweet.author_id in dictData) {

      dictData[tweet.tweet.author_id].count++;
    } else {
      dictData[tweet.tweet.author_id] = {
        count: 1,
        author: tweet.tweet.author,
      };
    }
  });
  let dataPrint=[];
//loop dictData to create dataPrint
    for (let key in dictData) { 
      // TODO PASAR A VARIABLE
        if (dictData[key].count>=numTweets){
            dataPrint.push({    
                name: dictData[key]?.author?.name,
                "tweets": dictData[key].count,
            }); 
        }
       
    }
    const handleChange = async (e) => {
 
      e?.preventDefault();
   
      setNumTweets(e?.target?.value ? e?.target?.value : "100");

    };
  return (
    <>
    <p>{t("Number of tweets")}</p>
    <Select
          labelId="select-hashtag"
          id="select-hashtag"
          value={numTweets}
          label="Hashtag"
          onChange={handleChange}
        >
                <MenuItem key={"5"} value={5}>
                  5
                </MenuItem>
                <MenuItem key={"10"} value={10}>
                  10
                </MenuItem>
                <MenuItem key={"100"} value={100}>
                  100
                </MenuItem>
                <MenuItem key={"300"} value={300}>
                  300
                </MenuItem>
          
        </Select>
        
        <BarChart
      width={500}
      height={300}
      data={dataPrint}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{marginLeft:"20%"}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" hide/>
      <YAxis />
      <Tooltip />
      <Legend />
 
      <Bar dataKey="tweets" fill="#ffc658" />
    </BarChart>
        </>
   
  );
}
