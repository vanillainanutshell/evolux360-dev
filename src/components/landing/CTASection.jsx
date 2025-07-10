import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FadeIn from '../animations/FadeIn';

function CTASection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'text.light',
        py: { xs: 12, md: 15 },
        minHeight: { xs: 'auto', md: '45vh' },
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <FadeIn>
          <Typography 
            variant="h4" 
            fontWeight={700} 
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 4 }}
          >
            Pronto para transformar a gestão do seu negócio?
          </Typography>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Typography 
            variant="h6" 
            color="text.lightSecondary"
            sx={{ 
              mb: 6, 
              fontSize: { xs: '1.4rem', md: '1.8rem' }, 
              fontWeight: 400,
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            Solicite sua demonstração e descubra como simplificar a sua gestão
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Button
            variant="contained"
            color="white"
            className="ctaButton"
            onClick={() => navigate('/contato')}
            sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
          >
            Solicitar demonstração
          </Button>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 4,
              fontSize: { xs: '1.1rem', md: '1.2rem' }
            }}
          >
            Teste grátis por <strong>30 dias</strong>
          </Typography>
        </FadeIn>
      </Container>
    </Box>
  );
}

export default memo(CTASection);