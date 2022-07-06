import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useTranslation } from "react-i18next";
import "./Chart.scss";
import useXaco from "../../hooks/useXaco";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComp({ tweetData }) {
  const {widthScreen} = useXaco();
  const isMobile = widthScreen <=768;
  const {t} = useTranslation();
  let languageCounts = tweetData?.reduce((p, c) => {
    let name = c.tweet.lang;
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});

  let languageCountsExtended =null;
  if (languageCounts){
    languageCountsExtended = Object.keys(languageCounts).map((k) => {
      return { name: k, value: languageCounts[k] };
    });
  } 
  const renderLabel = function (entry) {
    return `${entry.name} (${entry.value})`;
  };
 
  const onPieEnter = () => {};
  return (
    <>  <h2>
    {t("Language distribution. Number of different languages detected:")}
    {languageCountsExtended?.length}
  </h2>
    <PieChart
      
      style={{overflowX:isMobile ? "scroll": "visible", scrollbarWidth: "thin", left:"30%"}}
      width={400}
      height={400}
      display="block"
      position="center"
      onMouseEnter={onPieEnter}
    >
      <Pie
        data={languageCountsExtended}
   
        innerRadius={80}
        outerRadius={120}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={false}
        label={renderLabel}
      >
        {languageCountsExtended?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </>
  );
}
