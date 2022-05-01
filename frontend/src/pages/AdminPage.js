import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../api/auth";
import { getHashtags, updateHashtag } from "../api/hashtags";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
export default function AdminPage() {
  const [hashtags, setHashtags] = useState([]);
  const accessToken = getAccessTokenApi();
  useEffect(async () => {
    console.log("AdminPage");
   
    let hashtags = await getHashtags(accessToken);
    setHashtags(hashtags.data);
  }, []);
  const handleChange = (event,_id) => {
    updateHashtag(_id,event.target.checked,accessToken);
  };
  return (
    <>
      {hashtags?.map((hashtag) => {
        return (
          <>
            {hashtag.name}
            <Switch  onChange={(e)=>handleChange(e,hashtag._id)} defaultChecked={hashtag.active}></Switch>
          </>
        );
      })}
      <Button variant="contained">Add hashtag</Button>
    </>
  );
}
