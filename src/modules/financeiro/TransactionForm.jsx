import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Close } from '@mui/icons-material';

const categorias = [
  'Venda',
  'Aluguel',
  'Fornecedores',
  'Marketing',
  'Impostos',
  'Outros'
];

export default function TransactionForm({ open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    tipo: 'receita',
    descricao: '',
    valor: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0]
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
      await onSave({
        ...formData,
        valor: parseFloat(formData.valor)
      });
      setFormData({
        tipo: 'receita',
        descricao: '',
        valor: '',
        categoria: '',
        data: new Date().toISOString().split('T')[0]
      });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Nova Transação
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo</InputLabel>
                <Select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  label="Tipo"
                >
                  <MenuItem value="receita">Receita</MenuItem>
                  <MenuItem value="despesa">Despesa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="valor"
                label="Valor *"
                type="number"
                value={formData.valor}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descricao"
                label="Descrição *"
                value={formData.descricao}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  label="Categoria"
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="data"
                label="Data"
                type="date"
                value={formData.data}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
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