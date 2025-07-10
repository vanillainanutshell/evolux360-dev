import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TouchApp from '@mui/icons-material/TouchApp';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import AutoGraph from '@mui/icons-material/AutoGraph';

const beneficios = [
  {
    icon: <TouchApp sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    title: 'Simplificando a gestão',
    desc: 'Interface intuitiva que facilita e simplifica suas tarefas diárias.',
  },
  {
    icon: <IntegrationInstructions sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    title: 'Tecnologia de Ponta',
    desc: 'Integração perfeita com seus canais digitais.',
  },
  {
    icon: <AutoGraph sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    title: 'Inovação que transforma',
    desc: 'Processos otimizados que geram resultados reais.',
  },
];

function Benefits() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 3 }}
          >
            A união perfeita entre gestão eficiente e inovação moderna
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, fontWeight: 400, maxWidth: '800px', mx: 'auto' }}
          >
            Nossa solução combina tecnologia com funcionalidades completas para oferecer a melhor experiência para a sua gestão
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'center', 
          gap: { xs: 2, md: 3 },
          overflowX: 'visible',
          pb: { xs: 2, md: 0 }
        }}>
          {beneficios.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                width: { xs: 'calc(100% - 16px)', sm: 'calc(50% - 16px)', md: '33%' },
                minWidth: { xs: 'auto', sm: 'auto', md: '30%' },
                height: { xs: 'auto', md: '320px' },
                mb: { xs: 2, md: 0 },
                flex: { xs: '0 0 auto', md: '1 1 0' }
              }}
            >
              <Paper
                variant="darkCard"
                sx={{ p: { xs: '24px 16px', md: '36px 24px' } }}
              >
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: '60px', md: '70px' } }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="#DDDDDD" sx={{ flexGrow: 1 }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default memo(Benefits);