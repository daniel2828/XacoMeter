
import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const signIn =async (body)=>{
  
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/users/sign-in`, body)

   return data;
}
export const signUp =async (body)=>{
    const data = await axios.post(`${BASE_PATH}/${API_VERSION}/users/sign-up`, body)

    return data;
 }
 export const getUsers = async (accessToken)=>{


   return await axios.get(`${BASE_PATH}/${API_VERSION}/users`,
   {headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }});
 }