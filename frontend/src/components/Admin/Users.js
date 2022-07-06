

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
import useXaco from "../../hooks/useXaco";

import DeleteDialog from "../Modals/DeleteDialog";
export default function Users() {
   const {widthScreen} = useXaco();
    const isMobile = widthScreen <=768;
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
      
      setUsers(usersRes.data);
    };
  /**
   * handle change hashtag
   * @param {Event} event 
   * @param {Integer} _id 
   */
    const handleChange =async (event, _id) => {
     
      await activeUser({_id: _id, active: event.target.checked}, accessToken);
      callGetUsers();
    };
    /**
     * Handle delete hashtag
     * @param {Integer} _id 
     */
    const handleDelete = async() => {
       const response = await deleteUser(user, accessToken);
    
      callGetUsers();
    };
    
    const perc = isMobile ? "15%":"35%";
 
    
  const [openDialog, setOpenDialog] = useState(false)
const [user, setuser] = useState("")
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          {users?.map((user) => {
            return (
              <Card
                key={user?._id}
                style={{
                  marginLeft: perc,
                  marginRight: perc,
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
                        onClick={() => {
                          setuser(user._id);
                          setOpenDialog(true);

                        }}
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
          <DeleteDialog type={"user"} open={openDialog} setOpen={setOpenDialog} postAction={handleDelete}/>
        </Grid>
        <Grid item xs={12}>
          <ModalAddHash callGetHashtags={callGetUsers}  isUser={true}  />
        </Grid>
      </Grid>
  )
}
