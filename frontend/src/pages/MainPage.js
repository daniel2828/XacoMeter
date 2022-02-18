import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
      
      {!isRegister && <LoginForm setIsRegister={setIsRegister} />}
      {isRegister && <RegisterForm setIsRegister ={setIsRegister} />}
    </>
  );
}
