import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Divider
} from '@mui/material';
import { Person, Business, Security, Notifications } from '@mui/icons-material';
import Toast from '../../components/Toast';

export default function Configuracoes() {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [perfil, setPerfil] = useState({
    nome: 'Usuário Demo',
    email: 'usuario@evolux360.com',
    telefone: '(11) 99999-9999',
    empresa: 'Evolux360 Demo'
  });

  const handleSalvarPerfil = () => {
    // Simular salvamento
    setToast({
      open: true,
      message: 'Perfil atualizado com sucesso!',
      severity: 'success'
    });
  };

  const configuracoes = [
    {
      icon: <Person />,
      title: 'Perfil do Usuário',
      description: 'Gerencie suas informações pessoais'
    },
    {
      icon: <Business />,
      title: 'Configurações da Empresa',
      description: 'Dados da empresa e configurações gerais'
    },
    {
      icon: <Security />,
      title: 'Segurança',
      description: 'Alterar senha e configurações de segurança'
    },
    {
      icon: <Notifications />,
      title: 'Notificações',
      description: 'Configurar alertas e notificações'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configurações
      </Typography>

      <Grid container spacing={3}>
        {/* Perfil do Usuário */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                <Person />
              </Avatar>
              <Typography variant="h6">Perfil do Usuário</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome"
                  fullWidth
                  value={perfil.nome}
                  onChange={(e) => setPerfil({...perfil, nome: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={perfil.email}
                  onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone"
                  fullWidth
                  value={perfil.telefone}
                  onChange={(e) => setPerfil({...perfil, telefone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Empresa"
                  fullWidth
                  value={perfil.empresa}
                  onChange={(e) => setPerfil({...perfil, empresa: e.target.value})}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSalvarPerfil}>
                Salvar Alterações
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Menu de Configurações */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Outras Configurações
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {configuracoes.map((config, index) => (
              <Card 
                key={index} 
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {config.icon}
                    </Box>
                    <Typography variant="subtitle2">
                      {config.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {config.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </Box>
  );
}
