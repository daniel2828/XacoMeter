import { logout } from "../api/auth";
export  const logoutUser= ()=>{
    logout();
    window.location.reload();
  }

/**
 * Generic tabpanel
 * @param {*} props 
 * @returns 
 */
 export function TabPanel(props) {
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
  

  
 export function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }