import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Refresh } from '@mui/icons-material';

export default function ErrorMessage({ message = 'Erro ao carregar dados', onRetry }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {message}
      </Alert>
      {onRetry && (
        <Button 
          variant="outlined" 
          startIcon={<Refresh />}
          onClick={onRetry}
        >
          Tentar Novamente
        </Button>
      )}
    </Box>
  );
}