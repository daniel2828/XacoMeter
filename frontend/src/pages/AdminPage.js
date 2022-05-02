import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { getHashtags, updateHashtag,deleteHashtag } from "../api/hashtags";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { Redirect } from "react-router";
import ModalAddHash from "../components/Modals/ModalAddHash";
export default function AdminPage() {
  const [hashtags, setHashtags] = useState([]);
  const accessToken = getAccessTokenApi();
  useEffect(async () => {
    console.log("AdminPage");

    let hashtags = await getHashtags(accessToken);
    setHashtags(hashtags.data);
  }, []);
  const handleChange = (event, _id) => {
    updateHashtag(_id, event.target.checked, accessToken);
  };
  const handleDelete = ( _id) => {
    deleteHashtag(_id, accessToken);
  };
  if (!getAccessTokenApi()) {
    return <Redirect to="/"></Redirect>;
  }else{

    return (
  
        <Grid container>
          {hashtags?.map((hashtag) => {
            return (
             
              <Grid item xs={12}>
                {hashtag.name}
               
                  <Switch
                    onChange={(e) => handleChange(e, hashtag._id)}
                    defaultChecked={hashtag.active}
                  ></Switch>
                
                <IconButton color="error" onClick={()=>handleDelete(hashtag._id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
       
            );
          })}
          
          <Grid item xs={12}>
            <ModalAddHash/>
          </Grid>
        </Grid>
    
    );

  }
}
