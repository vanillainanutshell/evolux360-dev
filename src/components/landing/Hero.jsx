import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, TextField } from '@mui/material';
import FadeIn from '../animations/FadeIn';
import DemoModal from './DemoModal';

export default function Hero() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    // Se o usuário preencheu o email, abrimos o modal
    if (email.trim()) {
      handleOpenModal();
    } else {
      // Se não, redirecionamos para a página de contato
      navigate('/contato');
    }
  };

  return (
    <Box 
      id="hero"
      sx={{ 
        background: 'linear-gradient(180deg, #f8f6ff 0%, #ffffff 100%)',
        py: { xs: 8, sm: 10, md: 16 },
        textAlign: 'center',
        pb: { xs: 6, sm: 8, md: 12 }
      }}
    >
      <Container maxWidth="lg">
        <FadeIn>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
            fontSize: { xs: '2.2rem', sm: '3rem', md: '4.5rem' },
            width: '100%',
            lineHeight: 1.2,
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%'
          }}>
            Centralize. Simplifique. Gerencie.
          </Typography>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Box sx={{ 
            width: 100,
            height: 4,
            bgcolor: 'primary.main',
            mx: 'auto',
            my: { xs: 2, md: 3 },
            borderRadius: 2
          }} />
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: { xs: 4, md: 5 } }}>
            Centralize seus canais de venda em um só lugar.
            <br />
            Simplifique seus processos e potencialize seus resultados.
          </Typography>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: { xs: 3, md: 4 },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: { xs: 2, sm: 0 },
            maxWidth: '650px',
            mx: 'auto'
          }}>
            <TextField
              placeholder="Entre com seu e-mail"
              variant="outlined"
              size="small"
              value={email}
              onChange={handleEmailChange}
              sx={{ 
                bgcolor: 'white', 
                width: { xs: '100%', sm: '350px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: { xs: '8px', sm: '8px 0 0 8px' },
                  borderRight: { xs: '1px solid #5B2EFF', sm: 0 },
                  height: '42px',
                  '& fieldset': {
                    borderRight: { sm: 0 },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRightWidth: { xs: '1px', sm: 0 },
                  }
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ 
                borderRadius: { xs: '8px', sm: '0 8px 8px 0' },
                height: '42px',
                px: { xs: 3, md: 4 },
                width: { xs: '100%', sm: '220px' },
                maxWidth: { xs: '350px', sm: 'none' },
                whiteSpace: 'nowrap'
              }}
            >
              Solicitar demonstração
            </Button>
          </Box>
        </FadeIn>
      </Container>

      {/* Modal de demonstração */}
      <DemoModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
      />
    </Box>
  );
}