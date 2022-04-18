import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const getTweetsByHashtag = async (hashtag,accessToken)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/twitter/searchByQuery`,{hashtag},{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }})
   return data;
}
export const getSentimentAnalysis = async (hashtag,accessToken)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/twitter/getSentiment`,{hashtag},{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }})
   return data;
}
