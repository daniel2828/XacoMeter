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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

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
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#ffc658" />
    </BarChart>
  );
}
