import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";
import jwtDecode from "jwt-decode";

export const XacoContext = createContext();

export default function XacoProvider(props) {
  // Auth
  const { children } = props;
  const [state, setState] = useState({
    user: null,
    isLoading: true,
    widthScreen: 0,
  });

  useEffect(() => {
    checkUserLogin(setState);
    handleWindowSizeChange(setState);
    window.addEventListener('resize', ()=>handleWindowSizeChange(setState));
    return () => {
        window.removeEventListener('resize', ()=>handleWindowSizeChange(setState));
    }
  }, []);
  
 


  
  return <XacoContext.Provider value={state}>{children}</XacoContext.Provider>;
}
function handleWindowSizeChange(setState) {
  setState((prevState ) => ({
   
      ...prevState,
      widthScreen:window.innerWidth

   
  }));
  
}
function checkUserLogin(setState) {
  const accessToken = getAccessTokenApi();
  console.log("CHECK USER LOGIN", accessToken)
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();
    // Logout user in case refresh token not found
    if (!refreshToken) {
      logout();

      setState((prevState ) => ({
   
          ...prevState,
          isLoading: false,
          user: null
 
       
      }));
   
    } else {
      // Refresh the access token
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    console.log("SETEAMOS STATE")
 
    setState((prevState ) => ({

        ...prevState,
        isLoading: false,
        user: jwtDecode(accessToken),
 
     
    }));
  }
}
