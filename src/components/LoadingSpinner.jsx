import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        p: 4 
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}