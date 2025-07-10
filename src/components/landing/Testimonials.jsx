import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Avatar, 
  Rating,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowBackIos as ArrowBackIcon, 
  ArrowForwardIos as ArrowForwardIcon 
} from '@mui/icons-material';
import FadeIn from '../animations/FadeIn';

// Dados de depoimentos
const testimonials = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Gerente de E-commerce',
    company: 'TechStore',
    avatar: null, // URL da imagem ou null para usar iniciais
    rating: 5,
    text: 'O Evolux360 transformou completamente nossa operação de e-commerce. Conseguimos integrar todas as plataformas e ter uma visão unificada das vendas. O suporte é excelente e sempre nos ajuda com qualquer dúvida.'
  },
  {
    id: 2,
    name: 'Maria Souza',
    role: 'Diretora Financeira',
    company: 'Moda Express',
    avatar: null,
    rating: 5,
    text: 'Estávamos tendo dificuldades para gerenciar nosso financeiro com o crescimento das vendas online. O Evolux360 nos ajudou a organizar tudo em um só lugar, com relatórios claros e integração com nosso sistema contábil.'
  },
  {
    id: 3,
    name: 'Pedro Santos',
    role: 'CEO',
    company: 'Artesanato Brasil',
    avatar: null,
    rating: 4,
    text: 'Como pequena empresa, precisávamos de uma solução que não fosse complexa demais, mas que nos desse todas as ferramentas necessárias. O Evolux360 atendeu perfeitamente, com interface intuitiva e funcionalidades completas.'
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    role: 'Gerente de Marketing',
    company: 'Beleza Natural',
    avatar: null,
    rating: 5,
    text: 'A integração com nossas campanhas de marketing digital foi perfeita. Agora conseguimos acompanhar todo o funil de vendas e entender melhor o comportamento dos nossos clientes. Recomendo fortemente!'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Número de depoimentos visíveis por vez
  const visibleCount = isMobile ? 1 : 2;
  
  // Navegar para o próximo depoimento
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex + visibleCount >= testimonials.length 
        ? 0 
        : prevIndex + visibleCount
    );
  };
  
  // Navegar para o depoimento anterior
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex - visibleCount < 0 
        ? Math.max(0, testimonials.length - visibleCount) 
        : prevIndex - visibleCount
    );
  };
  
  // Obter depoimentos visíveis atualmente
  const getVisibleTestimonials = () => {
    return testimonials.slice(activeIndex, activeIndex + visibleCount);
  };

  return (
    <Box 
      id="depoimentos"
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'background.paper'
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
            O que nossos clientes dizem
          </Typography>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ 
              mb: 6, 
              maxWidth: '700px', 
              mx: 'auto' 
            }}
          >
            Veja como o Evolux360 tem ajudado empresas de diversos segmentos a otimizar seus processos e aumentar suas vendas.
          </Typography>
        </FadeIn>

        <Box sx={{ position: 'relative' }}>
          {/* Navegação */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              position: 'absolute',
              top: '50%',
              left: -20,
              right: -20,
              transform: 'translateY(-50%)',
              zIndex: 1
            }}
          >
            <IconButton 
              onClick={handlePrev}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              onClick={handleNext}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          {/* Depoimentos */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 3,
              px: { xs: 2, md: 4 }
            }}
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={0.2 * index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                    flex: 1
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Rating value={testimonial.rating} readOnly />
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4, 
                      flexGrow: 1,
                      fontStyle: 'italic',
                      color: 'text.secondary'
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        mr: 2
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}