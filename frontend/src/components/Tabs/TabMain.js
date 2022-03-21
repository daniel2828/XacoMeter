import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GraphsTab from "./TabElement/GraphsTab";

import WordCloud from "../Graphs/WordCloud";
import { useTranslation } from "react-i18next";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { t } = useTranslation();
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabMain({tweetData}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%' , marginLeft:"10%" ,marginRight:"10%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Graphs" {...a11yProps(0)} />
          <Tab label="Last tweets" {...a11yProps(1)} />
          <Tab label="Sentiment Analisys" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GraphsTab tweetData={tweetData}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WordCloud  tweetData={tweetData}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Sentiment Analisys
      </TabPanel>
    </Box>
  );
}