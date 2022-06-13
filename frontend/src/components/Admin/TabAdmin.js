import React, {useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Hashtags from "./Hashtags";
import Users from "./Users";
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
/**
 * Tab admin page
 * @returns Tab for admin
 */
export default function TabAdmin() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  /**
   * Change the value of the tab
   * @param {Integer} newValue 
   */
  const handleChange = (_event, newValue) => {
    
    setValue(newValue);
  };
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
          aria-label="Admin tab"
        >
          <Tab label={t("Hashtags")} {...a11yProps(0)} />
          <Tab label={t("Keywords")} {...a11yProps(1)} />
          <Tab label={t("Users")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel className="tab-graph" value={value} index={0}>
       <Hashtags/>
      </TabPanel>
      <TabPanel className="tab-graph" value={value} index={1}>
        <Hashtags isKeyword={true}/>
      </TabPanel>
      <TabPanel className="tab-graph" value={value} index={2}>
        <Users/>
      </TabPanel>
    </Box>
  );
}
