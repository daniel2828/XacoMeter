import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { getAccessTokenApi } from "../api/auth";

import { Redirect } from 'react-router';
export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  if (getAccessTokenApi()) {
    return <Redirect to="/data"></Redirect>;
  }else{
    return (
      <>
        
        {!isRegister && <LoginForm setIsRegister={setIsRegister} />}
        {isRegister && <RegisterForm setIsRegister ={setIsRegister} />}
      </>
    );
  }
 
}
