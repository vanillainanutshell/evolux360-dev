import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Paper
} from '@mui/material';
import { 
  TrendingUp, 
  People, 
  ShoppingCart, 
  AccountBalance 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../utils/dataService.js';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalClientes: 0,
    vendasMes: 0,
    saldoAtual: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const [vendas, clientes] = await Promise.all([
        dataService.getVendas(),
        dataService.getClientes()
      ]);
      
      const totalVendas = vendas.reduce((sum, venda) => sum + venda.total, 0);
      const vendasMes = vendas.filter(venda => {
        const vendaDate = new Date(venda.data);
        const currentMonth = new Date().getMonth();
        return vendaDate.getMonth() === currentMonth;
      }).reduce((sum, venda) => sum + venda.total, 0);
      
      setStats({
        totalVendas,
        totalClientes: clientes.length,
        vendasMes,
        saldoAtual: totalVendas * 0.8
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = useMemo(() => [
    {
      title: 'Vendas do Mês',
      value: `R$ ${stats.vendasMes.toLocaleString('pt-BR')}`,
      icon: <TrendingUp />,
      color: '#4caf50',
      action: () => navigate('/vendas')
    },
    {
      title: 'Total de Clientes',
      value: stats.totalClientes,
      icon: <People />,
      color: '#2196f3',
      action: () => navigate('/crm')
    },
    {
      title: 'Total de Vendas',
      value: `R$ ${stats.totalVendas.toLocaleString('pt-BR')}`,
      icon: <ShoppingCart />,
      color: '#ff9800',
      action: () => navigate('/vendas')
    },
    {
      title: 'Saldo Atual',
      value: `R$ ${stats.saldoAtual.toLocaleString('pt-BR')}`,
      icon: <AccountBalance />,
      color: '#9c27b0',
      action: () => navigate('/financeiro')
    }
  ], [stats, navigate]);

  if (loading) {
    return <LoadingSpinner message="Carregando dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadStats} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-2px)', transition: '0.2s' }
              }}
              onClick={card.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: card.color, mr: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Acesso Rápido
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => navigate('/vendas/nova')}>
                Nova Venda
              </Button>
              <Button variant="outlined" onClick={() => navigate('/crm')}>
                Ver Clientes
              </Button>
              <Button variant="outlined" onClick={() => navigate('/financeiro')}>
                Financeiro
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumo do Sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bem-vindo ao Evolux360! Use o menu lateral para navegar entre os módulos.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
