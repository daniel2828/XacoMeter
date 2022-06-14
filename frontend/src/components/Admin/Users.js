

import React, { useEffect, useState } from "react";
import { getAccessTokenApi } from "../../api/auth";
import Switch from "@mui/material/Switch";
import {getUsers,activeUser,deleteUser} from "../../api/users"
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import ModalAddHash from "../../components/Modals/ModalAddHash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { t } from "i18next";
export default function Users() {
  console.log("ENTRE  ")
    const [users, setUsers] = useState([]);
    const accessToken = getAccessTokenApi();
    //Effect to get hashtags from api
    useEffect(() => {
        callGetUsers();
      return () => {
        setUsers([]);
      };
    }, []);
    /**
     * Get all hashtags from the API
     */
    const callGetUsers = async () => {
      const usersRes = await getUsers(accessToken);
      console.log("USER" , usersRes)
      setUsers(usersRes.data);
    };
  /**
   * handle change hashtag
   * @param {Event} event 
   * @param {Integer} _id 
   */
    const handleChange =async (event, _id) => {
      console.log("ADWA")
      await activeUser({_id: _id, active: event.target.checked}, accessToken);
      callGetUsers();
    };
    /**
     * Handle delete hashtag
     * @param {Integer} _id 
     */
    const handleDelete = async(_id) => {
     await deleteUser(_id, accessToken);
      callGetUsers();
    };
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          {users?.map((user) => {
            return (
              <Card
                key={user?._id}
                style={{
                  marginLeft: "40%",
                  marginRight: "40%",
                  marginTop: "2%",
                }}
              >
                <Grid container>
                  <Grid item xs={9}>
                    <CardContent>
                      <p>{user?.name} {user?.lastname}</p>
                      {user?.role ==="admin" && (
                        <p>{t("Admin user")}</p>
                      )}
                      <Switch
                        data-testid={`${user?.name}Update`}
                        onChange={(e) => handleChange(e, user._id)}
                        defaultChecked={user?.active}
                      ></Switch>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3}>
                    <CardActions>
                      <IconButton
                      data-testid={`${user.name}Delete`}
                        color="error"
                        onClick={() => handleDelete(user._id)}
                        name={`${user.name}Delete`}
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
          <ModalAddHash callGetHashtags={callGetUsers}  isUser={true}  />
        </Grid>
      </Grid>
  )
}
