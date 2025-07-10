import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Validação simples de email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function DemoModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
        severity: 'success'
      });
      
      // Fechar modal após envio bem-sucedido
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao enviar solicitação. Por favor, tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Limpar formulário ao fechar
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: ''
    });
    setErrors({});
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={loading ? undefined : handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            Solicitar Demonstração
          </Typography>
          {!loading && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Preencha o formulário abaixo para solicitar uma demonstração gratuita do Evolux360. Nossa equipe entrará em contato em até 24 horas úteis.
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome *"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                fullWidth
                error={!!errors.nome}
                helperText={errors.nome}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefone *"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                fullWidth
                error={!!errors.telefone}
                helperText={errors.telefone}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                fullWidth
                disabled={loading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={handleClose} 
            color="inherit"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Enviando...' : 'Solicitar Demonstração'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}