import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../utils/dataService.js';

export default function SalesList() {
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({});
  const navigate = useNavigate();

  // Carregar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vendasData, clientesData] = await Promise.all([
          dataService.getVendas(),
          dataService.getClientes()
        ]);
        
        setVendas(vendasData);
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Aplicar filtros
  const handleFiltrar = async () => {
    try {
      setLoading(true);
      const vendasFiltradas = await dataService.getVendas(filtros);
      setVendas(vendasFiltradas);
    } catch (error) {
      console.error('Erro ao filtrar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Limpar filtros
  const handleLimparFiltros = async () => {
    setFiltros({});
    try {
      setLoading(true);
      const vendasData = await dataService.getVendas();
      setVendas(vendasData);
    } catch (error) {
      console.error('Erro ao limpar filtros:', error);
    } finally {
      setLoading(false);
    }
  };

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Formatar valor
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pago':
        return 'success.main';
      case 'pendente':
        return 'warning.main';
      case 'cancelado':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vendas
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/vendas/nova')}
        >
          Nova Venda
        </Button>
      </Box>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filtros</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="cliente-label">Cliente</InputLabel>
              <Select
                labelId="cliente-label"
                value={filtros.clienteId || ''}
                label="Cliente"
                onChange={(e) => setFiltros({...filtros, clienteId: e.target.value})}
              >
                <MenuItem value="">Todos</MenuItem>
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Data Início"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filtros.dataInicio || ''}
              onChange={(e) => setFiltros({...filtros, dataInicio: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Data Fim"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filtros.dataFim || ''}
              onChange={(e) => setFiltros({...filtros, dataFim: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={filtros.status || ''}
                label="Status"
                onChange={(e) => setFiltros({...filtros, status: e.target.value})}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="pago">Pago</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={handleLimparFiltros}>
            Limpar
          </Button>
          <Button variant="contained" onClick={handleFiltrar}>
            Filtrar
          </Button>
        </Box>
      </Paper>

      {/* Tabela de Vendas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Carregando...</TableCell>
              </TableRow>
            ) : vendas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Nenhuma venda encontrada</TableCell>
              </TableRow>
            ) : (
              vendas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell>{venda.id}</TableCell>
                  <TableCell>{venda.cliente.nome}</TableCell>
                  <TableCell>{formatarData(venda.data)}</TableCell>
                  <TableCell>{formatarValor(venda.total)}</TableCell>
                  <TableCell>
                    <Box 
                      component="span" 
                      sx={{ 
                        color: getStatusColor(venda.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}
                    >
                      {venda.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary"
                      onClick={() => navigate(`/vendas/${venda.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}