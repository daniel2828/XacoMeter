import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
export default function NavBar() {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (e = undefined) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Select
            labelId="select-language"
            id="select-language"
            value={i18n.language ? i18n.language : "es"}
            label="Language"
            onChange={handleChangeLanguage}
          >
            <MenuItem value="es">{t("Spanish")}</MenuItem>
            <MenuItem value="en">{t("English")}</MenuItem>
          </Select>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
