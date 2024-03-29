import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getAccessTokenApi } from "../api/auth";

import { Redirect } from "react-router";
import "./AuthPage.scss";
/**
 * Auth page to handle register and login
 * @returns AuthPage component
 */
export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  if (getAccessTokenApi()) {
    return <Redirect to="/data"></Redirect>;
  } else {
    return (
      <div className="auth-page">

     
      <div className="page-container">
        {!isRegister && <LoginForm setIsRegister={setIsRegister} />}
        {isRegister && <RegisterForm setIsRegister={setIsRegister} />}
      </div>
      </div>
    );
  }
}
