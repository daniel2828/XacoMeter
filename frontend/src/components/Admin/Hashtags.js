

import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../../api/auth";
import { getHashtags, updateHashtag, deleteHashtag } from "../../api/hashtags";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import ModalAddHash from "../../components/Modals/ModalAddHash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
export default function Hashtags({isKeyword}) {
    const [hashtags, setHashtags] = useState([]);
    const accessToken = getAccessTokenApi();
    
    const callGetHashtags = async () => {
      let hashtags = await getHashtags(accessToken);
      hashtags = hashtags.data.filter(hashtag => hashtag.isKeyword === isKeyword);
      setHashtags(hashtags);
    };
    useEffect(() => {
      callGetHashtags();
    }, []);
    const handleChange = (event, _id) => {
      updateHashtag(_id, event.target.checked, accessToken);
      callGetHashtags();
    };
    const handleDelete = (_id) => {
      deleteHashtag(_id, accessToken);
      callGetHashtags();
    };
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          {hashtags?.map((hashtag) => {
            return (
              <Card
                style={{
                  marginLeft: "40%",
                  marginRight: "40%",
                  marginTop: "2%",
                }}
              >
                <Grid container>
                  <Grid item xs={9}>
                    <CardContent>
                      {hashtag.name}

                      <Switch
                        onChange={(e) => handleChange(e, hashtag._id)}
                        defaultChecked={hashtag.active}
                      ></Switch>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3}>
                    <CardActions>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(hashtag._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <ModalAddHash callGetHashtags={callGetHashtags}  isKeyword={isKeyword}  />
        </Grid>
      </Grid>
  )
}
