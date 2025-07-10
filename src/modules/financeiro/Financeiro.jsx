import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Add, TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';
import { dataService } from '../../utils/dataService';
import TransactionForm from './TransactionForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Financeiro() {
  const [stats, setStats] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0
  });
  const [transacoes, setTransacoes] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFinanceiro = async () => {
    try {
      setLoading(true);
      setError(null);
      const [transacoesData, vendas] = await Promise.all([
        dataService.getTransacoes(),
        dataService.getVendas()
      ]);
      
      setTransacoes(transacoesData);
      
      const receitas = transacoesData.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
      const despesas = transacoesData.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
      
      setStats({
        receitas,
        despesas,
        saldo: receitas - despesas
      });
    } catch (error) {
      console.error('Erro ao carregar dados financeiros:', error);
      setError('Erro ao carregar dados financeiros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinanceiro();
  }, []);

  const formatCurrency = useMemo(() => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }),
    []
  );

  const formatValue = (value) => formatCurrency.format(value);

  const handleSaveTransaction = async (transactionData) => {
    try {
      await dataService.saveTransacao(transactionData);
      await loadFinanceiro();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Carregando dados financeiros..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadFinanceiro} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Financeiro
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setFormOpen(true)}>
          Nova Transação
        </Button>
      </Box>

      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="h6">Receitas</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatValue(stats.receitas)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
                <Typography variant="h6">Despesas</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {formatValue(stats.despesas)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccountBalance sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Saldo</Typography>
              </Box>
              <Typography variant="h4" color="primary.main">
                {formatValue(stats.saldo)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabela de Transações */}
      <Typography variant="h6" gutterBottom>
        Últimas Transações
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacoes.map((transacao) => (
              <TableRow key={transacao.id}>
                <TableCell>
                  <Chip 
                    label={transacao.tipo}
                    color={transacao.tipo === 'receita' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{transacao.descricao}</TableCell>
                <TableCell>
                  <Typography 
                    color={transacao.tipo === 'receita' ? 'success.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {formatValue(transacao.valor)}
                  </Typography>
                </TableCell>
                <TableCell>{new Date(transacao.data).toLocaleDateString('pt-BR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveTransaction}
      />
    </Box>
  );
}
