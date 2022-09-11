import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { t } from "i18next";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LineChartComp from "../Graphs/LineChartComp";
import BarChartComp from "../Graphs/BarChartComp";
import PieChartComp from "../Graphs/PieChartComp";
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import LastTweets from "../LastTweets/LastTweets";
import SentimentAnalisys from "../SentimentAnalisys/SentimentAnalisys";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileDrawer({ tweetData, tweetDataForSentiment }) {
  const history = useHistory();
  const handleChangeAdmin = ()=>{
   
    history.push("/admin")
  }
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  // Menu last tweets



  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = (component) => {
      if(component){
        setComponent(component);
      }
     
     setAnchorEl(null);
     setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Xacometer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
           
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            button
            key={"Graphs"}
          >
            <ListItemIcon>
              <SignalCellularAltIcon />
            </ListItemIcon>
            <ListItemText primary={t("Graphs")} />
           
          </ListItem>
          <ListItem
           
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={()=>handleClose("LastTweets")}
           button
           key={"LastTweets"}
         >
           <ListItemIcon>
             <AlignHorizontalLeftIcon />
           </ListItemIcon>
           <ListItemText primary={t("Last tweets")} />
          
         </ListItem>
         <ListItem
           
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={()=>handleClose("SentimentAnalisys")}
           button
           key={"SentimentAnalisys"}
         >
           <ListItemIcon>
             <SentimentVerySatisfiedIcon />
           </ListItemIcon>
           <ListItemText primary={t("Sentiment analisys")} />
          
         </ListItem>
 
        </List>
        <Divider />
        <ListItem button key={"Admin"}  onClick={handleChangeAdmin}>
              <ListItemIcon>
                <AdminPanelSettingsIcon/>
              </ListItemIcon>
              <ListItemText primary={"Admin"} />
         </ListItem>
        <ListItem button key={"Logout"}  onClick={logoutUser}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
         </ListItem>
      
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={()=>handleClose("Timeline")}>{t("History of tweets")}</MenuItem>
          <MenuItem onClick={()=>handleClose("Language")}>{t("Language distribution")}</MenuItem>
          
          <MenuItem onClick={()=>handleClose("Accounts")}>{t("Most active accounts")}</MenuItem>
        </Menu>
        
        {component === "Timeline" && <LineChartComp tweetData={tweetData} />}
        {component === "Language" && <PieChartComp tweetData={tweetData} />}
        {component === "Accounts" && <BarChartComp tweetData={tweetData} />}
        {component === "LastTweets" && <LastTweets tweetData={tweetData}/>}
        {component === "SentimentAnalisys" && <SentimentAnalisys tweetDataForSentiment={tweetDataForSentiment}/>}
      </Main>
    </Box>
  );
}
