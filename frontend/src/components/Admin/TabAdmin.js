import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Hashtags from "./Hashtags";
import Users from "./Users";
import {TabPanel, a11yProps} from "../../utils/utils";
/**
 * Tab admin page
 * @returns Tab for admin
 */
export default function TabAdmin() {
  const [valueAdmin, setValueAdmin] = useState(0);
  const { t } = useTranslation();
  /**
   * Change the value of the tab
   * @param {Integer} newValue 
   */
  const handleChangeAdmin = (_event, newValue) => {
    
    setValueAdmin(newValue);
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
          value={valueAdmin}
          onChange={handleChangeAdmin}
          aria-label="Admin tab"
        >
          <Tab label={t("Hashtags")} {...a11yProps(0)} />
          <Tab label={t("Keywords")} {...a11yProps(1)} />
          <Tab label={t("Users")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel className="tab-graph" value={valueAdmin} index={0}>
       <Hashtags/>
      </TabPanel>
      <TabPanel className="tab-graph" value={valueAdmin} index={1}>
        <Hashtags isKeyword={true}/>
      </TabPanel>
      <TabPanel className="tab-graph" value={valueAdmin} index={2}>
        <Users/>
      </TabPanel>
    </Box>
  );
}
