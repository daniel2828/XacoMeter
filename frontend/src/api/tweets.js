import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const getTweetsByHashtag = async (hashtag,accessToken)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/twitter/searchByQuery`,{hashtag},{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }})
   console.log(data);
   return data;
}
