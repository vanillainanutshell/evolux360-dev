import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import evoluxLogo from '../../assets/evolux360_logo1.png';

function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'text.purple', py: 8 }}>
      <Box sx={{ 
        maxWidth: '1600px', 
        mx: 'auto', 
        px: { xs: 2, md: 4 },
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'flex-start' },
        gap: { md: 12 }
      }}>
        {/* Logo e descrição */}
        <Box sx={{ 
          width: { xs: '100%', md: '22%' }, 
          mb: { xs: 4, md: 0 },
          pl: { xs: 0, md: 0 }
        }}>
          <Box 
            component="img"
            src={evoluxLogo}
            alt="Evolux360"
            sx={{ 
              width: { xs: '180px', sm: '220px', md: 'auto' },
              maxWidth: '100%',
              mb: 0.5
            }}
          />
          <Typography variant="body2" sx={{ 
            opacity: 0.8, 
            maxWidth: 300,
            mt: 0.5,
            fontSize: { xs: '0.85rem', md: '0.95rem' }
          }}>
            A Evolux360 é uma plataforma inteligente que transforma dados em decisões para o crescimento do seu negócio.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton href="https://instagram.com" target="_blank" sx={{ ml: -1, p: { xs: 1, md: 1.5 } }}>
              <InstagramIcon sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" sx={{ p: { xs: 1, md: 1.5 } }}>
              <LinkedInIcon sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
          </Box>
        </Box>

        {/* Links em flex */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          width: { xs: '100%', md: '70%' },
          gap: { xs: 0, md: 0 }
        }}>
          {/* Produto */}
          <Box sx={{ width: { xs: '50%', sm: '25%' }, mb: 4, pr: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Produto
            </Typography>
            <Link onClick={() => handleNavigation('/contato')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Solicitar demonstração
            </Link>
            <Link onClick={() => handleNavigation('/funcionalidades')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Funcionalidades
            </Link>
            <Link onClick={() => handleNavigation('/planos')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Planos
            </Link>
          </Box>

          {/* Empresa */}
          <Box sx={{ width: { xs: '50%', sm: '25%' }, mb: 4, pr: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Empresa
            </Typography>
            <Link onClick={() => handleNavigation('/contato')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Sobre nós
            </Link>
            <Link onClick={() => handleNavigation('/depoimentos')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Depoimentos
            </Link>
          </Box>

          {/* Suporte */}
          <Box sx={{ width: { xs: '50%', sm: '25%' }, mb: 4, pr: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Suporte
            </Typography>
            <Link onClick={() => handleNavigation('/contato')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Central de ajuda
            </Link>
            <Link onClick={() => handleNavigation('/integracoes')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Integrações
            </Link>
          </Box>

          {/* Dúvidas Frequentes */}
          <Box sx={{ width: { xs: '50%', sm: '25%' }, mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Dúvidas Frequentes
            </Typography>
            <Link onClick={() => handleNavigation('/contato')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Como funciona o período de testes?
            </Link>
            <Link onClick={() => handleNavigation('/integracoes')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Posso integrar com meu e-commerce atual?
            </Link>
            <Link onClick={() => handleNavigation('/contato')} underline="hover" sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, display: 'block', cursor: 'pointer' }}>
              Qual o suporte oferecido?
            </Link>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: { xs: 2, md: 4 }, mt: 6 }}>
        <Typography
          variant="body2"
          align="center"
          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, opacity: 0.7 }}
        >
          © {new Date().getFullYear()} Evolux360. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(Footer);