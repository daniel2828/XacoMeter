import { BASE_PATH, API_VERSION } from "./config";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  // GET token from local storage
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (!accessToken || accessToken === "null") {
    logout();
    return null;
  }
  
  return willExpireToken(accessToken) ? null : accessToken;
  
}

export function getRefreshTokenApi() {
  // GET refreshtoken from loca storage
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  if (!refreshToken || refreshToken === "null") {
    logout();
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  // Refresh access token from server
  const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  // Params over
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };
 //Fetch url
 // Check dock
  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        localStorage.setItem("REFRESH_TOKEN", refreshToken);
      }
    });
  
}

export function logout() {
  // Logout function
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
}

function willExpireToken(token) {
  // Expire token function
  // Check token 
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}


