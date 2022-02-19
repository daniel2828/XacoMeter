import React from "react";
import { getAccessTokenApi } from "../api/auth";
import { Redirect } from 'react-router';
export default function MainPage() {
  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <>
         <p>Main page</p>
      </>
    );
  }
}
