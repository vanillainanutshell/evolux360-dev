import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Settings from '@mui/icons-material/Settings';
import CloudSync from '@mui/icons-material/CloudSync';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import People from '@mui/icons-material/People';

const motivos = [
  {
    icon: <Settings fontSize="large" color="primary" sx={{ fontSize: 70 }} />,
    title: 'Automação de processos manuais',
    desc: 'Elimine tarefas repetitivas e aumente a produtividade da sua equipe.',
  },
  {
    icon: <CloudSync fontSize="large" color="primary" sx={{ fontSize: 70 }} />,
    title: 'Integração multicanal',
    desc: 'Gerencie seu e-commerce e demais canais de vendas em um só lugar.',
  },
  {
    icon: <AssignmentTurnedIn fontSize="large" color="primary" sx={{ fontSize: 70 }} />,
    title: 'Relatórios Inteligentes',
    desc: 'Obtenha insights e tome decisões baseadas em dados claros e objetivos.',
  },
  {
    icon: <People fontSize="large" color="primary" sx={{ fontSize: 70 }} />,
    title: 'Controle Unificado',
    desc: 'Gerencie seus clientes, canais de vendas e tenha uma visão clara do seu financeiro em um só lugar.',
  },
];

function WhyEvolux() {
  return (
    <Box 
      sx={{ 
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: { xs: 8, md: 4 }
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 2 }}
          >
            Por que a Evolux?
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, fontWeight: 400, maxWidth: '800px', mx: 'auto' }}
          >
            A tecnologia que une vendas, clientes e financeiro em uma só plataforma
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'center', 
          gap: 2,
          overflowX: 'visible',
          pb: { xs: 2, md: 0 }
        }}>
          {motivos.map((item, i) => (
            <Box 
              key={i} 
              sx={{ 
                width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: '24%' },
                minWidth: { xs: 'auto', sm: 'auto', md: '23%' },
                height: { xs: 'auto', md: '450px' },
                mb: { xs: 2, md: 0 },
                flex: { xs: '0 0 auto', md: '1 1 0' }
              }}
            >
              <Paper
                variant="card"
                sx={{ p: { xs: '24px 16px', md: '40px 20px' } }}
              >
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: '60px', md: '90px' } }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
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

export default memo(WhyEvolux);