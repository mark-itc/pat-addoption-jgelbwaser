import React, { useState } from 'react';
import { Button } from '@mui/material';
import SignInMui from '../SignInForm/SignInMui'


export default function SignInModal() {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Sign In
        </Button>
        <SignInMui open={open} onClose={handleClose} />
      </>
    );
  
}

  
