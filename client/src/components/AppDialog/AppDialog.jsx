import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UiDiv from '../ui/uiKit/layouts/UiDiv';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../../redux/reducers/modalSlice';

export default function AppDialog() {
  
  const isModalOpen = useSelector(state => state.modal)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    dispatch(openLoginModal())
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <UiDiv >

        </UiDiv>
        
       
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="password"
            fullWidth
            variant="standard"
          />
       
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        
      </Dialog>
    </div>
  );
}

