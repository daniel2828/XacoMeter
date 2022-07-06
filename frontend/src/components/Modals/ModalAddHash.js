
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { Grid } from '@mui/material';
import { createHashtag } from '../../api/hashtags';
import { createUser } from '../../api/users';
import { getAccessTokenApi } from '../../api/auth';
import { useTranslation } from 'react-i18next';
import Switch from "@mui/material/Switch";
import Notification from "../Notification";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  marginTop: '10%',
};
export default function ModalAddHash({callGetHashtags,isKeyword, isUser}) {
      const [alertOpen, setAlertOpen] = useState(false);
      const {t} = useTranslation();
      const [hashName, setHashName] = useState("");
      const [lastName, setLastname] = useState("")
      const [email, setEmail] = useState("")
      
      const [password, setPassword] = useState("")
      const [adminUser, setAdminUser] = useState(false);
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setHashName("");
        setOpen(false)};
      const accessToken = getAccessTokenApi();
      const handleCreate = async()=> {
        if(isUser){
          try{
            createUser(hashName,lastName, email,password, adminUser,accessToken ).then(response=>{
              handleClose();
              callGetHashtags();
            }).catch(err=>{
              setAlertOpen(true);
            })
          }catch(error      ){
            setAlertOpen(true);
          }
          
        }else{
          await createHashtag(hashName, accessToken,isKeyword );
          handleClose();
          callGetHashtags();
        }
        
       
      }
      const handleChangeHashtag= (event) => {
        setHashName(event.target.value)
      }
      return (
        <div >
          <Button name="Add" onClick={handleOpen} variant="contained">{t("Add")}</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <>
              <Notification
              alertOpen={alertOpen}
            
              status={"alert"}
              message={t("Email already exists")}
            />
              <Box sx={style}>
                  <Grid container spacing={3}>
                      <Grid item xs={12}><Input type='text' name='HashtagName' placeholder='Name' value={hashName} onChange={handleChangeHashtag}/></Grid>
                      {isUser && (
                        <>
                          <Grid item xs={12}><Input type='text' name='UserLastname' placeholder='Lastname' value={lastName} onChange={(e)=>setLastname(e.target.value)}/></Grid>
                          <Grid item xs={12}><Input type='text' name='UserEmail' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/></Grid>
                          <Grid item xs={12}><Input type='password' name='UserPassword' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/> </Grid>
                     
                         <Grid item xs={5}><p>{t("Is Admin?")}</p></Grid>
                         <Grid item xs={3}>
                         <Switch
                         onChange={(e) => setAdminUser(e.target.checked)}
                         defaultChecked={false}
                       ></Switch>
                       </Grid>
                       <Grid item xs={3}></Grid>
                       </>
                      )}
                      <Grid item xs={12}><Button name="create" variant='outlined' onClick={handleCreate}>{t("Create")}</Button> </Grid>

                  </Grid>
                
              </Box>
                
              </>
           
          </Modal>
        </div>
      );
   
}
