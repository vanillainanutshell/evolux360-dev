import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function ClientForm({ open, onClose, onSave, cliente = null }) {
  const [formData, setFormData] = useState({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    telefone: cliente?.telefone || '',
    empresa: cliente?.empresa || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nome"
                label="Nome *"
                value={formData.nome}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email *"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="telefone"
                label="Telefone *"
                value={formData.telefone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="empresa"
                label="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}