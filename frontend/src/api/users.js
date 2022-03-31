
import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const signIn =async (body)=>{
   console.log(process.env.BACK_PAT)
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/users/sign-in`, body)
   console.log(data);
   return data;
}
export const signUp =async (body)=>{
    const data = await axios.post(`${BASE_PATH}/${API_VERSION}/users/sign-up`, body)
    console.log(data);
    return data;
 }