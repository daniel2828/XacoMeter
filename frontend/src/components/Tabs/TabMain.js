import {useState,useEffect} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WordCloud from "../Graphs/WordCloud";
import { useTranslation } from "react-i18next";
import TabGraphs from "./TabGraphs";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import SentimentAnalisys from "../SentimentAnalisys/SentimentAnalisys";
import useXaco from "../../hooks/useXaco";
import MobileDrawer from "../Mobile/MobileDrawer";
import LastTweets from "../LastTweets/LastTweets";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabMain({ tweetData, tweetDataForSentiment }) {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const {widthScreen} = useXaco();
  const isMobile = widthScreen <=768;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (isMobile){
    return (<MobileDrawer tweetData={tweetData}/>)
  }else{
    return (
      <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
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
  
}
