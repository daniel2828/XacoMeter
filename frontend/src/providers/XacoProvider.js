import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";
import jwtDecode from "jwt-decode";

export const XacoContext = createContext();
/**
 * Xacometer provider
 * @param {*} props 
 * @returns 
 */
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
/**
 * Handle the size of the windows
 * @param {function} setState 
 */
function handleWindowSizeChange(setState) {
  setState((prevState ) => ({
   
      ...prevState,
      widthScreen:window.innerWidth

   
  }));
  
}
/**
 * Check if user is logged
 * @param {Function} setState 
 */
function checkUserLogin(setState) {
  const accessToken = getAccessTokenApi();
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

 
    setState((prevState ) => ({

        ...prevState,
        isLoading: false,
        user: jwtDecode(accessToken),
 
     
    }));
  }
}
