import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Topbar from '../layouts/Topbar';
import Footer from '../components/landing/Footer';

const integrations = [
  { name: 'Mercado Livre', description: 'Integração completa com marketplace' },
  { name: 'Shopee', description: 'Sincronização de produtos e pedidos' },
  { name: 'Amazon', description: 'Gestão de vendas na Amazon' },
  { name: 'Magazine Luiza', description: 'Marketplace Magazine Luiza' }
];

export default function Integrations() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
            Integrações
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
            Conecte sua loja com os principais marketplaces
          </Typography>
          
          <Grid container spacing={3}>
            {integrations.map((integration, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {integration.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {integration.description}
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