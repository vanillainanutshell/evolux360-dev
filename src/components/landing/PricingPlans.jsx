import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Grid,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import FadeIn from '../animations/FadeIn';

// Dados dos planos
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para pequenos negócios iniciando no e-commerce',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Até 100 produtos',
      'Até 500 pedidos/mês',
      'Integração com 1 marketplace',
      'Gestão de estoque básica',
      'Relatórios básicos',
      'Suporte por email'
    ],
    highlighted: false,
    buttonText: 'Começar Agora'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Para negócios em crescimento que precisam de mais recursos',
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      'Até 1.000 produtos',
      'Até 2.000 pedidos/mês',
      'Integração com 3 marketplaces',
      'Gestão de estoque avançada',
      'Relatórios completos',
      'Suporte prioritário',
      'Automações básicas',
      'Gestão financeira'
    ],
    highlighted: true,
    buttonText: 'Escolher Professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Solução completa para grandes operações de e-commerce',
    monthlyPrice: 399,
    yearlyPrice: 319,
    features: [
      'Produtos ilimitados',
      'Pedidos ilimitados',
      'Integração com todos marketplaces',
      'Gestão de estoque avançada',
      'Relatórios personalizados',
      'Suporte 24/7',
      'Automações avançadas',
      'Gestão financeira completa',
      'API completa',
      'Onboarding personalizado'
    ],
    highlighted: false,
    buttonText: 'Falar com Consultor'
  }
];

export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);
  
  const handleBillingChange = () => {
    setIsYearly(!isYearly);
  };
  
  // Calcular desconto anual
  const getDiscount = (monthly, yearly) => {
    const discount = ((monthly * 12 - yearly * 12) / (monthly * 12)) * 100;
    return Math.round(discount);
  };

  return (
    <Box 
      id="planos"
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <FadeIn>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            align="center" 
            gutterBottom
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            Planos e Preços
          </Typography>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ 
              mb: 4, 
              maxWidth: '700px', 
              mx: 'auto' 
            }}
          >
            Escolha o plano ideal para o seu negócio. Todos os planos incluem acesso completo à plataforma.
          </Typography>
        </FadeIn>

        {/* Toggle de faturamento */}
        <FadeIn delay={0.3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={isYearly} 
                  onChange={handleBillingChange}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>
                    {isYearly ? 'Anual' : 'Mensal'}
                  </Typography>
                  {isYearly && (
                    <Chip 
                      label="Economize 20%" 
                      color="primary" 
                      size="small"
                      sx={{ height: 20 }}
                    />
                  )}
                </Box>
              }
            />
          </Box>
        </FadeIn>

        {/* Cards de planos */}
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <FadeIn delay={0.2 + index * 0.2}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: plan.highlighted ? '0 8px 32px rgba(91, 46, 255, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.05)',
                    border: plan.highlighted ? '2px solid' : 'none',
                    borderColor: plan.highlighted ? 'primary.main' : 'transparent',
                    position: 'relative',
                    transform: plan.highlighted ? { md: 'scale(1.05)' } : 'none',
                    zIndex: plan.highlighted ? 2 : 1
                  }}
                >
                  {plan.highlighted && (
                    <Chip
                      label="Mais Popular"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    />
                  )}
                  
                  <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                    {plan.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center"
                    sx={{ mb: 3, height: 40 }}
                  >
                    {plan.description}
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography 
                      variant="h3" 
                      fontWeight="bold" 
                      display="inline"
                      color={plan.highlighted ? 'primary.main' : 'inherit'}
                    >
                      R${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </Typography>
                    <Typography variant="body1" display="inline">
                      /mês
                    </Typography>
                    
                    {isYearly && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Faturado anualmente
                      </Typography>
                    )}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List sx={{ mb: 3, flexGrow: 1 }}>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontSize: '0.9rem'
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 'auto', py: 1.5 }}
                  >
                    {plan.buttonText}
                  </Button>
                </Paper>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
        
        <FadeIn delay={0.8}>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Precisa de um plano personalizado para sua empresa?
            </Typography>
            <Button 
              variant="text" 
              color="primary"
              sx={{ mt: 1, fontWeight: 'bold' }}
            >
              Entre em contato com nossa equipe
            </Button>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
}