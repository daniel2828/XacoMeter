
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
 export const activeUser =async (body,accessToken)=>{
   const data = await axios.post(`${BASE_PATH}/${API_VERSION}/users/active`, body, {headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }})

   return data;
}
export const createUser = async (userName,lastName, email,password, adminUser,accessToken)=>{

   
   const body = {name:userName,lastName:lastName,email:email, password:password, adminUser:adminUser};
   console.log("BODY ", body)
   return await axios.post(`${BASE_PATH}/${API_VERSION}/users/createUser`,body,{headers:{
     "Content-Type": "application/json",
     Authorization : accessToken
  }});
 }
 export const deleteUser = async (_id, accessToken)=>{

 
   return await axios.delete(`${BASE_PATH}/${API_VERSION}/users/deleteUser/${_id}`,{headers:{
     "Content-Type": "application/json",
     Authorization : accessToken
  }});
 }
 export const getUsers = async (accessToken)=>{


   return await axios.get(`${BASE_PATH}/${API_VERSION}/users`,
   {headers:{
      "Content-Type": "application/json",
      Authorization : accessToken
   }});
 }