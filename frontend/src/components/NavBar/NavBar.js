import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";

import Typography from '@mui/material/Typography';

import useXaco from "../../hooks/useXaco";

import { useHistory } from "react-router-dom";
import { logoutUser } from "../../utils/utils";

import Avatar from "@mui/material/Avatar";
import CaminoImage from  "../../assets/img/concha.jpg";
export default function NavBar() {
  const history = useHistory();

  const { user, isLoading ,widthScreen} = useXaco();
  const isMobile = widthScreen <=768;
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (e = undefined) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  }


  const handleChangePage = ()=>{

    history.push("/admin")
  }
  const handleChangeMain = ()=>{  
      history.push("/data")
  }
  if (!isMobile){
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <img src={CaminoImage} alt="Logo"  width="50" height="50" />;
              </Avatar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                XacoMeter
            </Typography>
            <Select
              labelId="select-language"
              id="select-language"
              value={i18n.language ? i18n.language.substring(0,2) : "es"}
              label="Language"
              onChange={handleChangeLanguage}
              style={{backgroundColor:"gainsboro", border:"1px solid", overflow:"hidden"}}
            >
              <MenuItem style={{overflow:"hidden"}} value="es">{t("Spanish")}</MenuItem>
              <MenuItem style={{overflow:"hidden"}} value="en">{t("English")}</MenuItem>
            </Select>
            {!user && (<Button color="inherit">Login</Button>)}
            {user && (<Button onClick={logoutUser} color="inherit">Logout</Button>)}
            <Button onClick={handleChangeMain} color="inherit">Tweets</Button>
            {user?.role =="admin" && (<Button onClick={handleChangePage} color="inherit">Admin</Button>)}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }else{
    return(<></>);
  }
  
}
