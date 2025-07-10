import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import showcaseImage from '../../assets/Produtos.png';
import FadeIn from '../animations/FadeIn';

function Showcase() {
  const navigate = useNavigate();

  return (
    <Box 
      id="showcase"
      sx={{ py: { xs: 6, md: 12 }, bgcolor: 'background.paper', textAlign: 'center' }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" justifyContent="center">
          {/* Texto */}
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <FadeIn direction="up" delay={0.2}>
              <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' }
              }}>
                Tudo o que você precisa em um só lugar
              </Typography>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: { xs: 4, md: 5 } }}>
                Gerencie suas vendas, seus clientes, seus produtos e seu financeiro em um só lugar.
              </Typography>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ px: 4, py: 1.5 }}
                onClick={() => navigate('/contato')}
              >
                Solicitar demonstração
              </Button>
            </FadeIn>
          </Grid>

          {/* Imagem do sistema - visível apenas em tablet e desktop */}
          <Grid 
            item 
            md={7} 
            sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              justifyContent: 'center'
            }}
          >
            <FadeIn direction="left" delay={0.4}>
              <Box
                component="img"
                src={showcaseImage}
                alt="Tela do sistema Evolux360"
                loading="lazy"
                sx={{ 
                  width: { sm: '90%', md: '80%' }, 
                  maxWidth: '100%',
                  borderRadius: 2, 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              />
            </FadeIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default memo(Showcase);