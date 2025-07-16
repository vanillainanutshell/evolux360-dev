import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import FadeIn from '../animations/FadeIn';

// Validação simples de email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: ''
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
    
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        mensagem: ''
      });
      
      setSnackbar({
        open: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao enviar mensagem. Por favor, tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box 
      id="contato"
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <FadeIn>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            align="center" 
            gutterBottom
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            Entre em Contato
          </Typography>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ 
              mb: 6, 
              maxWidth: '700px', 
              mx: 'auto' 
            }}
          >
            Preencha o formulário abaixo para solicitar uma demonstração ou tirar suas dúvidas sobre o Evolux360.
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 2,
              maxWidth: '800px',
              mx: 'auto',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Nome *"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.nome}
                    helperText={errors.nome}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Telefone *"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.telefone}
                    helperText={errors.telefone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mensagem *"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.mensagem}
                    helperText={errors.mensagem}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      px: 5, 
                      py: 1.5,
                      minWidth: '200px'
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Mensagem'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </FadeIn>
      </Container>

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
    </Box>
  );
}