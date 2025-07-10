import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function Toast({ 
  open, 
  onClose, 
  message, 
  severity = 'success',
  autoHideDuration = 4000 
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}