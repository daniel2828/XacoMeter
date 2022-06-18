

import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../../api/auth";
import { getHashtags, updateHashtag, deleteHashtag } from "../../api/hashtags";
import Switch from "@mui/material/Switch";
import "./Admin.scss";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import ModalAddHash from "../../components/Modals/ModalAddHash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import useXaco from "../../hooks/useXaco";

/**
 * Hashtags component, shows a list of hashtags in card format
 * @param {Boolean} isKeyword - if true, it will show only keywords 
 * @returns List of hashtags in card format
 */
export default function Hashtags({isKeyword}) {
     const {widthScreen} = useXaco();
    const isMobile = widthScreen <=768;
    const [hashtags, setHashtags] = useState([]);
    const accessToken = getAccessTokenApi();
    //Effect to get hashtags from api
    useEffect(() => {
      callGetHashtags();
      return () => {
        setHashtags([]);
      };
    }, []);
    /**
     * Get all hashtags from the API
     */
    const callGetHashtags = async () => {
      let hashtags = await getHashtags(accessToken);
      hashtags = hashtags?.data?.filter(hashtag => hashtag.isKeyword === isKeyword);
      setHashtags(hashtags);
    };
  /**
   * handle change hashtag
   * @param {Event} event 
   * @param {Integer} _id 
   */
    const handleChange = (event, _id) => {
      updateHashtag(_id, event.target.checked, accessToken);
      callGetHashtags();
    };
    /**
     * Handle delete hashtag
     * @param {Integer} _id 
     */
    const handleDelete = (_id) => {
      deleteHashtag(_id, accessToken);
      callGetHashtags();
    };
    const perc = isMobile ? "15%":"35%";
 
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          {hashtags?.map((hashtag) => {
            return (
              <Card
                key={hashtag?._id}
                style={{
                  marginLeft: perc,
                  marginRight: perc,
                  marginTop: "2%",
                }}
              >
                <Grid container>
                  <Grid item xs={9}>
                    <CardContent>
                      <p>{hashtag?.name}</p>

                      <Switch
                        data-testid={`${hashtag.name}Update`}
                        onChange={(e) => handleChange(e, hashtag._id)}
                        defaultChecked={hashtag.active}
                      ></Switch>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3}>
                    <CardActions>
                      <IconButton
                      data-testid={`${hashtag.name}Delete`}
                        color="error"
                        onClick={() => handleDelete(hashtag._id)}
                        name={`${hashtag.name}Delete`}
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
