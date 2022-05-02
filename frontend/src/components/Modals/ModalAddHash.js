
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';

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
};
export default function ModalAddHash() {
  
      const [hashName, setHashName] = useState("")
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const handleCreate = ()=> {
        console.log("Hash name"  , hashName);
        handleClose();
      }
      const handleChangeHashtag= (event) => {
        setHashName(event.target.value)
      }
      return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add hashtag</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <>
              <Box sx={style}>
              <Input type='text' placeholder='Hashtag name' value={hashName} onChange={handleChangeHashtag}/>
              <Button onClick={handleCreate}>Create</Button> 
            </Box>
             
              </>
           
          </Modal>
        </div>
      );
   
}
