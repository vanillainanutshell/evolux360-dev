import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3
          }}
        >
          <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
            <Typography variant="h4" gutterBottom color="error">
              Ops! Algo deu errado
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
              Ocorreu um erro inesperado. Tente recarregar a página ou voltar ao início.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleReload}
              >
                Recarregar
              </Button>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                Ir ao Início
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;