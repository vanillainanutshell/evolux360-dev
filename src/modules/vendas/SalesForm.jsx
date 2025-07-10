import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { salesService } from './sales.service.js';
import { dataService } from '../../utils/dataService.js';
import Toast from '../../components/Toast';

export default function SalesForm() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Estado do formulário
  const [formData, setFormData] = useState({
    clienteId: '',
    itens: [],
    formaPagamentoId: '',
    data: new Date().toISOString().split('T')[0],
    observacoes: ''
  });

  // Estado para novo item
  const [novoItem, setNovoItem] = useState({
    produtoId: '',
    quantidade: 1
  });

  // Carregar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientesData, produtosData, formasPagamentoData] = await Promise.all([
          dataService.getClientes(),
          dataService.getProdutos(),
          dataService.getFormasPagamento()
        ]);
        
        setClientes(clientesData);
        setProdutos(produtosData);
        setFormasPagamento(formasPagamentoData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setToast({
          open: true,
          message: 'Erro ao carregar dados. Tente novamente.',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Adicionar item à venda
  const handleAdicionarItem = () => {
    if (!novoItem.produtoId || novoItem.quantidade <= 0) {
      setToast({
        open: true,
        message: 'Selecione um produto e quantidade válida',
        severity: 'error'
      });
      return;
    }

    // Verificar se o produto já está na lista
    const itemExistente = formData.itens.findIndex(item => item.produtoId === novoItem.produtoId);
    
    if (itemExistente >= 0) {
      // Atualizar quantidade se já existe
      const itensAtualizados = [...formData.itens];
      itensAtualizados[itemExistente].quantidade += novoItem.quantidade;
      
      setFormData({
        ...formData,
        itens: itensAtualizados
      });
    } else {
      // Adicionar novo item
      setFormData({
        ...formData,
        itens: [...formData.itens, { ...novoItem }]
      });
    }
    
    // Limpar o formulário de novo item
    setNovoItem({
      produtoId: '',
      quantidade: 1
    });
  };

  // Remover item da venda
  const handleRemoverItem = (index) => {
    const itensAtualizados = [...formData.itens];
    itensAtualizados.splice(index, 1);
    
    setFormData({
      ...formData,
      itens: itensAtualizados
    });
  };

  // Calcular total da venda
  const calcularTotal = () => {
    return formData.itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produtoId);
      return total + (produto ? produto.preco * item.quantidade : 0);
    }, 0);
  };

  // Formatar valor
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Salvar venda
  const handleSalvar = async () => {
    // Validações básicas
    if (!formData.clienteId) {
      setToast({
        open: true,
        message: 'Selecione um cliente',
        severity: 'error'
      });
      return;
    }

    if (formData.itens.length === 0) {
      setToast({
        open: true,
        message: 'Adicione pelo menos um produto',
        severity: 'error'
      });
      return;
    }

    if (!formData.formaPagamentoId) {
      setToast({
        open: true,
        message: 'Selecione uma forma de pagamento',
        severity: 'error'
      });
      return;
    }

    try {
      setSalvando(true);
      await dataService.saveVenda(formData);
      setToast({
        open: true,
        message: 'Venda cadastrada com sucesso!',
        severity: 'success'
      });
      
      // Redirecionar após salvar
      setTimeout(() => {
        navigate('/vendas');
      }, 1500);
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
      setToast({
        open: true,
        message: 'Erro ao salvar venda. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nova Venda
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/vendas')}
        >
          Voltar
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Informações da Venda</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="cliente-label">Cliente *</InputLabel>
              <Select
                labelId="cliente-label"
                value={formData.clienteId}
                label="Cliente *"
                onChange={(e) => setFormData({...formData, clienteId: e.target.value})}
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome} {cliente.empresa ? `(${cliente.empresa})` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="pagamento-label">Forma de Pagamento *</InputLabel>
              <Select
                labelId="pagamento-label"
                value={formData.formaPagamentoId}
                label="Forma de Pagamento *"
                onChange={(e) => setFormData({...formData, formaPagamentoId: e.target.value})}
              >
                {formasPagamento.map((forma) => (
                  <MenuItem key={forma.id} value={forma.id}>
                    {forma.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Data"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observações"
              multiline
              rows={2}
              fullWidth
              value={formData.observacoes || ''}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Produtos</Typography>
        
        {/* Adicionar novo produto */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="produto-label">Produto</InputLabel>
              <Select
                labelId="produto-label"
                value={novoItem.produtoId}
                label="Produto"
                onChange={(e) => setNovoItem({...novoItem, produtoId: e.target.value})}
              >
                {produtos.map((produto) => (
                  <MenuItem key={produto.id} value={produto.id}>
                    {produto.nome} - {formatarValor(produto.preco)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Quantidade"
              type="number"
              size="small"
              fullWidth
              value={novoItem.quantidade}
              onChange={(e) => setNovoItem({...novoItem, quantidade: parseInt(e.target.value) || 0})}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdicionarItem}
              fullWidth
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>

        {/* Lista de produtos */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="right">Preço Unit.</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.itens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Nenhum produto adicionado</TableCell>
                </TableRow>
              ) : (
                formData.itens.map((item, index) => {
                  const produto = produtos.find(p => p.id === item.produtoId);
                  if (!produto) return null;
                  
                  const subtotal = produto.preco * item.quantidade;
                  
                  return (
                    <TableRow key={index}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell align="center">{item.quantidade}</TableCell>
                      <TableCell align="right">{formatarValor(produto.preco)}</TableCell>
                      <TableCell align="right">{formatarValor(subtotal)}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error"
                          onClick={() => handleRemoverItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                  Total:
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatarValor(calcularTotal())}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/vendas')}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSalvar}
          disabled={salvando}
        >
          {salvando ? 'Salvando...' : 'Salvar Venda'}
        </Button>
      </Box>

      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </Box>
  );
}