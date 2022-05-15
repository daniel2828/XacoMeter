import { logout } from "../api/auth";
export  const logoutUser= ()=>{
    logout();
    window.location.reload();
  }