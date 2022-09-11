import React from "react";
import { getAccessTokenApi } from "../api/auth";

import { Redirect } from "react-router";
import TabAdmin from "../components/Admin/TabAdmin";
/**
 * Admin page
 * @returns 
 */
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
