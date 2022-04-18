import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
import useXaco from "../../hooks/useXaco";
export default function LineChartComp({tweetData}) {
  const {widthScreen} = useXaco();
  var counts = tweetData.reduce((p, c) => {
    var name = c.tweet.created_at.substring(0, 10);
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});
  console.log("COUNTS", counts);
  // var countsExtended = []
  // tweetData.forEach(element => {
  //   var name = element.tweet.created_at.substring(0, 10);
  //   var obj = {name: name, uv: }
  //   countsExtended.push(obj);
  // })
  let countsExtended = Object.keys(counts).sort().map((k) => {
    return { name: k, uv: counts[k] };
  });

  //setDaysData(countsExtended);
  return (
    <LineChart style={{marginLeft:"20%"}} width={widthScreen>= 768 ? 600:320} height={widthScreen>= 768 ? 300:200} data={countsExtended}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
