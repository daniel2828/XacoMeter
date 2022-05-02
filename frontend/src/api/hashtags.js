import axios from "axios";
import { BASE_PATH, API_VERSION } from "./config";

export const getHashtags = async (accessToken)=>{
    const data = await axios.get(`${BASE_PATH}/${API_VERSION}/hashtags/getHashtags`,{headers:{
       "Content-Type": "application/json",
       Authorization : accessToken
    }})
    console.log("ADAWD", data)
    return data;
  }
  export const updateHashtag = async (_id,active,accessToken)=>{
    const data = await axios.put(`${BASE_PATH}/${API_VERSION}/hashtags/updateHashtag`,{_id:_id,active:active},{headers:{
       "Content-Type": "application/json",
       Authorization : accessToken
    }})
    console.log("ADAWD", data)
    return data;
  }
  export const deleteHashtag = async (_id, accessToken)=>{
    console.log("ACCSES", accessToken)
    const data = await axios.delete(`${BASE_PATH}/${API_VERSION}/hashtags/deleteHashtag/${_id}`,{headers:{
       "Content-Type": "application/json",
       Authorization : accessToken
    }})
    console.log("ADAWD", data)
    return data;
  }