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
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../utils/utils";

export default function NavBar() {
  const history = useHistory();
  
  const { user, isLoading } = useXaco();
  const { t, i18n } = useTranslation();
  console.log("USER," , user)
  const handleChangeLanguage = (e = undefined) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  }
  useEffect(() => {

    console.log("RECIBO EL USER cambiado", user)
  } , [user])

  const handleChangePage = ()=>{
    console.log("HOla")
    history.push("/admin")
  }
  const handleChangeMain = ()=>{  
      history.push("/data")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
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
}
