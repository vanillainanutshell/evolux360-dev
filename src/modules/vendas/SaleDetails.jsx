import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../../utils/dataService.js';

export default function SaleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venda, setVenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenda = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const vendaData = await dataService.getVendaById(id);
        
        if (!vendaData) {
          setError('Venda não encontrada');
          return;
        }
        
        setVenda(vendaData);
      } catch (error) {
        console.error('Erro ao carregar venda:', error);
        setError('Erro ao carregar dados da venda');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVenda();
  }, [id]);

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Formatar valor
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pago':
        return 'success';
      case 'pendente':
        return 'warning';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  if (error || !venda) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" gutterBottom>{error || 'Erro desconhecido'}</Typography>
        <Button variant="contained" onClick={() => navigate('/vendas')}>
          Voltar para Vendas
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalhes da Venda #{venda.id}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/vendas')}
        >
          Voltar
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Informações da Venda</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Chip 
                label={venda.status.toUpperCase()} 
                color={getStatusColor(venda.status)}
                sx={{ mt: 0.5 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Data</Typography>
              <Typography variant="body1">{formatarData(venda.data)}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Forma de Pagamento</Typography>
              <Typography variant="body1">{venda.formaPagamento.nome}</Typography>
            </Box>
            {venda.observacoes && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Observações</Typography>
                <Typography variant="body1">{venda.observacoes}</Typography>
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Informações do Cliente</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Nome</Typography>
              <Typography variant="body1">{venda.cliente.nome}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{venda.cliente.email}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Telefone</Typography>
              <Typography variant="body1">{venda.cliente.telefone}</Typography>
            </Box>
            {venda.cliente.empresa && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Empresa</Typography>
                <Typography variant="body1">{venda.cliente.empresa}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Produtos</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="right">Preço Unit.</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venda.itens.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.produto.nome}</TableCell>
                  <TableCell align="center">{item.quantidade}</TableCell>
                  <TableCell align="right">{formatarValor(item.precoUnitario)}</TableCell>
                  <TableCell align="right">{formatarValor(item.subtotal)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                  Total:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatarValor(venda.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}