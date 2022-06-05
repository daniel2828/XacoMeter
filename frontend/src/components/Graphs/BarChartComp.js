import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function BarChartComp({ tweetData }) {
 
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
        if (dictData[key].count>=5){
            dataPrint.push({    
                name: dictData[key]?.author?.name,
                uv: dictData[key].count,
            }); 
        }
       
    }
  return (
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
 
      <Bar dataKey="uv" fill="#ffc658" />
    </BarChart>
  );
}
