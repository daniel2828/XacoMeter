import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";

export const getHashtags = async (accessToken)=>{

    return await axios.get(`${BASE_PATH}/${API_VERSION}/hashtags/getHashtags`,{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }});
  }
  export const updateHashtag = async (_id,active,accessToken)=>{

    return await axios.put(`${BASE_PATH}/${API_VERSION}/hashtags/updateHashtag`,{_id:_id,active:active},{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }})
;
  }
  export const deleteHashtag = async (_id, accessToken)=>{

 
    return await axios.delete(`${BASE_PATH}/${API_VERSION}/hashtags/deleteHashtag/${_id}`,{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }});
  }
  export const createHashtag = async (hashName, accessToken,isKeyword)=>{

 

    return await axios.post(`${BASE_PATH}/${API_VERSION}/hashtags/createHashtag`,{name:hashName, isKeyword:isKeyword},{headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }});
  }