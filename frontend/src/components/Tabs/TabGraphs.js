import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WordCloud from "../Graphs/WordCloud";
import PieChartComp from "../Graphs/PieChartComp";

import LineChartComp from "../Graphs/LineChart";
import { useTranslation } from "react-i18next";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabgraphs-tabpanel-${index}`}
      aria-labelledby={`tabgraphs-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tabgraphs-tab-${index}`,
    "aria-controls": `tabgraphs-tabpanel-${index}`,
  };
}

export default function TabGraphs({ tweetData }) {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [daysData, setDaysData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  // Handle changes into the hashtag
  const handleChangeTweetData = async (e = undefined) => {
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
    console.log("language", languageCountsExtended);
    setLanguageData(languageCountsExtended);
  };
  // Effects
  useEffect(async () => {
    handleChangeTweetData();
  }, [tweetData]);
  return (
    <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("History of tweets")} {...a11yProps(0)} />
          <Tab label={t("Language distribution")} {...a11yProps(1)} />
          <Tab label={t("Sentiment Analisys")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <div className="tweets">
            <h3> {t("History of tweets")}</h3>
            <LineChartComp daysData={daysData}/>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <h2>
            {t(
              "Language distribution. Number of different languages detected:"
            )}
            {languageData?.length}
          </h2>
          <PieChartComp data={languageData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {t("Third graph")}
      </TabPanel>
    </Box>
  );
}
