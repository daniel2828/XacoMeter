
import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const signIn =async (body)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/sign-in`, body)
   console.log(data);
}