import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { ShoppingCart, People, AccountBalance, Settings } from '@mui/icons-material';
import Topbar from '../layouts/Topbar';
import Footer from '../components/landing/Footer';

const features = [
  {
    icon: <ShoppingCart />,
    title: 'Gestão de Vendas',
    description: 'Controle completo de pedidos, produtos e estoque'
  },
  {
    icon: <People />,
    title: 'CRM Integrado',
    description: 'Gerencie clientes e leads em um funil de vendas'
  },
  {
    icon: <AccountBalance />,
    title: 'Controle Financeiro',
    description: 'Acompanhe receitas, despesas e fluxo de caixa'
  },
  {
    icon: <Settings />,
    title: 'Configurações',
    description: 'Personalize o sistema conforme sua necessidade'
  }
];

export default function Features() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
            Funcionalidades
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
            Tudo que você precisa para gerenciar seu negócio
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}