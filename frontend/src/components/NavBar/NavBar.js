import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";

import Typography from '@mui/material/Typography';
import { logout } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
export default function NavBar() {
  const { user, isLoading } = useAuth();
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (e = undefined) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };
  console.log( "KAB " ,i18n.language)
  const logoutUser= ()=>{
    logout();
    window.location.reload();
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}