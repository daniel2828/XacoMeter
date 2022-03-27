import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";
export const getTweetsByHashtag = async (hashtag)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/twitter/searchByQuery`,{hashtag})
   console.log(data);
   return data;
}
