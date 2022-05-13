
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { Grid } from '@mui/material';
import { createHashtag } from '../../api/hashtags';
import { getAccessTokenApi } from '../../api/auth';

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
export default function ModalAddHash({callGetHashtags}) {
  
      const [hashName, setHashName] = useState("")
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const accessToken = getAccessTokenApi();
      const handleCreate = async()=> {
        const data = await createHashtag(hashName, accessToken );
        console.log(data);
        handleClose();
        callGetHashtags();
      }
      const handleChangeHashtag= (event) => {
        setHashName(event.target.value)
      }
      return (
        <div >
          <Button onClick={handleOpen} variant="contained">Add hashtag</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <>
              <Box sx={style}>
                  <Grid container spacing={3}>
                      <Grid item xs={12}><Input type='text' placeholder='Hashtag name' value={hashName} onChange={handleChangeHashtag}/></Grid>
                      <Grid item xs={12}><Button variant='outlined' onClick={handleCreate}>Create</Button> </Grid>
                   
                  </Grid>
                
              </Box>
                
              </>
           
          </Modal>
        </div>
      );
   
}
