import React from "react";
import { getAccessTokenApi } from "../api/auth";

import { Redirect } from "react-router";
import TabAdmin from "../components/Admin/TabAdmin";
export default function AdminPage() {
 
  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <div className="controll-page">
        <TabAdmin />
      </div>
    );
  }
}
