import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import evoluxLogo from '../../assets/evolux360_logo1.png';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        setError('Por favor, preencha todos os campos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img src={evoluxLogo} alt="Evolux360" style={{ height: 60, marginBottom: 16 }} />
              <Typography variant="h5" gutterBottom>
                Acesse sua conta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entre com suas credenciais para continuar
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Demo: Use qualquer email e senha para entrar
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
