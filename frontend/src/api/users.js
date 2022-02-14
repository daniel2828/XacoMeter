
import axios from "axios";
const urlBase = "http://localhost:3977/api/v1/users"
export const signIn =async (body)=>{
   const data = await axios.post(`${urlBase}/sign-in`, body)
   console.log(data);
}