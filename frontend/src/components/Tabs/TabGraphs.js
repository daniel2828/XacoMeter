import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PieChartComp from "../Graphs/PieChartComp";

import LineChartComp from "../Graphs/LineChartComp";
import { useTranslation } from "react-i18next";
import BarChartComp from "../Graphs/BarChartComp";
import "./TabGraphs.scss";
import { Grid } from "@mui/material";
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

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "80%",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("History of tweets")} {...a11yProps(0)} />
          <Tab label={t("Language distribution")} {...a11yProps(1)} />
          <Tab label={t("Most Active Accounts")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel className="tab-graph" value={value} index={0}>
        <h3> {t("History of tweets")}</h3>
        <div className="tab-graph">
          <LineChartComp tweetData={tweetData} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      
        <div className="tab-graph">
          <PieChartComp tweetData={tweetData} />
        </div>
      </TabPanel>
      <TabPanel className="tab-graph" value={value} index={2}>
        <div className="tab-graph">
          <BarChartComp tweetData={tweetData} />
        </div>
      </TabPanel>
    </Box>
  );
}
