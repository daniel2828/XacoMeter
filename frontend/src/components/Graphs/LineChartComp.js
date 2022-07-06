import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Legend
  } from "recharts";

  import "./Chart.scss";
import useXaco from "../../hooks/useXaco";
import moment from "moment";
import { useTranslation } from "react-i18next";
export default function LineChartComp({tweetData}) {
  const {t} = useTranslation();
   const parseDayToName=(day)=>{
    
    //convert number to day of the week
    let dayName;
    switch(day){
      case "0": dayName= t("Monday");
                 break;
      case "1":  dayName=t("Tuesday");
                break;
      case "2":  dayName=t("Wednesday"); 
                break;
      case "3":  dayName=t("Thursday");
                break;  
      case "4": dayName= t("Friday");
                break;
      case "5":  dayName=t("Saturday");
                break;
      case "6":  dayName=t("Sunday");
                break;
      default:  dayName=t("Monday");

    }
    return dayName;

   }
   const getTemporalyLineWeekly = (start, end)=>{

    const counts = tweetData?.reduce((p, c) => {
   
      let name = c.tweet.created_at.substring(start, end);
      let newDate = moment.utc();
      newDate.set('year',  c.tweet.created_at.substring(0, 4));

      newDate.set('month', c.tweet.created_at.substring(5, 7));
              
      newDate.set('date', c.tweet.created_at.substring(8, 10));
      
      name = newDate.day();
      
  
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    let countsExtended = null;
    if (counts){
      countsExtended = Object.keys(counts).sort().map((k) => {
        return { name: parseDayToName(k), "tweets": counts[k] };
      });
    }
   
    return countsExtended;
  }
   const getTemporalyLine = (start, end)=>{
  
    const counts = tweetData?.reduce((p, c) => {
 
      let name = c.tweet.created_at.substring(start, end);
    
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});
    
    let countsExtended = null;
    if (counts) {
       countsExtended =  Object.keys(counts).sort().map((k) => {
        return { name: k, "tweets": counts[k] };
      });
    }
   
    return countsExtended;
  }
  const {widthScreen} = useXaco();
  const dailyLine = getTemporalyLine(0,10);
  const monthlyLine = getTemporalyLine(0,7);
  const dayOfWeek = getTemporalyLineWeekly(0,10);
  const isMobile = widthScreen <=768;

  //setDaysData(countsExtended);
  return (
    <>
    <p>
      {t("Daily activity")}
    </p>
    <LineChartResumed tweetData={dailyLine}/>
    <p>
      {t("Montly activty")}
    </p>
    <BarChart
      width={widthScreen>= 768 ? 650:320}
      height={widthScreen>= 768 ? 350:200} 
      data={monthlyLine}
    
      style={{marginBottom:"10px" , overflowX:isMobile ? "scroll": "visible", scrollbarWidth: "thin", left:"25%"}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      
      <Bar dataKey="tweets" fill="#ffc658" />
    </BarChart>
    {/* <LineChartResumed tweetData={monthlyLine}/> */}
    <p>
    {t("Activity by day of the week")}
    </p>
    <LineChartResumed tweetData={dayOfWeek}/>
    </>
    
  );
}
const LineChartResumed = ({tweetData}) => { 
  const {widthScreen} = useXaco();
  const isMobile = widthScreen <=768;
   return(
    <LineChart   style={{marginBottom:"10px",overflowX:isMobile ? "scroll": "visible", scrollbarWidth: "thin", left:"25%"}} width={widthScreen>= 768 ? 650:320} height={widthScreen>= 768 ? 350:200} data={tweetData}>
    <Line type="monotone" dataKey="tweets" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
   )
};