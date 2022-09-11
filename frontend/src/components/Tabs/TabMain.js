import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import TabGraphs from "./TabGraphs";

import SentimentAnalisys from "../SentimentAnalisys/SentimentAnalisys";
import useXaco from "../../hooks/useXaco";
import LastTweets from "../LastTweets/LastTweets";
import {TabPanel, a11yProps} from "../../utils/utils";
/**
 * Main tab
 * @param {*} param0 
 * @returns 
 */
export default function TabMain({ tweetData, tweetDataForSentiment }) {
  const {widthScreen} = useXaco();
  const isMobile = widthScreen <=768;
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
    return (
      <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation={isMobile ? "vertical" : "horizontal"}
            allowScrollButtonsMobile={true}
          >
            <Tab label={t("Graphs")} {...a11yProps(0)} />
            <Tab label={t("Last tweets")} {...a11yProps(1)} />
            <Tab label={t("Sentiment Analisys")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        
            <TabPanel value={value} index={0}>
              {/* <GraphsTab tweetData={tweetData} /> */}
              <TabGraphs tweetData={tweetData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <LastTweets tweetData={tweetData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SentimentAnalisys dataWithSentiment={tweetDataForSentiment} />
            </TabPanel>
        
       
      </Box>
    );
  
  
}
