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
  }, []);
  
 
  useEffect(() => {
    handleWindowSizeChange(setState);
      window.addEventListener('resize', ()=>handleWindowSizeChange(setState));
      return () => {
          window.removeEventListener('resize', ()=>handleWindowSizeChange(setState));
      }
  }, []);
  
  
  return <XacoContext.Provider value={state}>{children}</XacoContext.Provider>;
}
function handleWindowSizeChange(setState) {
  setState(() => ({
    widthScreen:window.innerWidth
  }));
  
}
function checkUserLogin(setState) {
  const accessToken = getAccessTokenApi();

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();
    // Logout user in case refresh token not found
    if (!refreshToken) {
      logout();
      setState(() => ({
        isLoading: false,
        user: null
      }));
   
    } else {
      // Refresh the access token
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setState(() => ({
      isLoading: false,
      user: jwtDecode(accessToken),
    }));
  }
}
