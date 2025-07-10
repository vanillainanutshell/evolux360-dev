import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import logobranco from '../assets/logobranco.png';

function Topbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Função para navegação
  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar 
      position="fixed"
      sx={{
        boxShadow: 2,
        bgcolor: 'primary.main'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1, px: { xs: 1, md: 2 }, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box 
            component="img" 
            src={logobranco} 
            alt="Evolux360" 
            sx={{ 
              height: { xs: 32, md: 40 }, 
              width: 'auto',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          />

          {/* Desktop/Tablet Links */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: { md: 1, lg: 2 }, 
            mx: 'auto'
          }}>
            <Button 
              onClick={() => handleNavigation('/integracoes')}
              sx={{ 
                color: 'white',
                px: { md: 1, lg: 1.5 },
                minWidth: { md: 'auto', lg: 'auto' }
              }}
            >
              Integrações
            </Button>
            <Button 
              onClick={() => handleNavigation('/funcionalidades')}
              sx={{ 
                color: 'white',
                px: { md: 1, lg: 1.5 },
                minWidth: { md: 'auto', lg: 'auto' }
              }}
            >
              Funcionalidades
            </Button>
            <Button 
              onClick={() => handleNavigation('/planos')}
              sx={{ 
                color: 'white',
                px: { md: 1, lg: 1.5 },
                minWidth: { md: 'auto', lg: 'auto' }
              }}
            >
              Planos
            </Button>
            <Button 
              onClick={() => handleNavigation('/contato')}
              sx={{ 
                color: 'white',
                px: { md: 1, lg: 1.5 },
                minWidth: { md: 'auto', lg: 'auto' }
              }}
            >
              Contato
            </Button>
          </Box>

          {/* Desktop/Tablet Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { md: 1, lg: 2 } }}>
            <Button 
              variant="contained" 
              onClick={() => handleNavigation('/contato')}
              sx={{
                px: { md: 1, lg: 2 },
                fontSize: { md: '0.8rem', lg: '0.9rem' },
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              Solicitar demo
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => handleNavigation('/login')}
              sx={{
                px: { md: 1, lg: 2 },
                fontSize: { md: '0.8rem', lg: '0.9rem' }
              }}
            >
              Acessar
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              color: 'white',
              p: 1
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '100%',
                left: '0 !important',
                right: '0 !important',
                borderRadius: 0,
                mt: 1,
                bgcolor: 'primary.main',
                color: 'white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
            MenuListProps={{
              sx: {
                py: 0
              }
            }}
          >
            <MenuItem onClick={() => handleNavigation('/integracoes')} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Button fullWidth sx={{ color: 'white', justifyContent: 'center', py: 1.5 }}>
                Integrações
              </Button>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/funcionalidades')} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Button fullWidth sx={{ color: 'white', justifyContent: 'center', py: 1.5 }}>
                Funcionalidades
              </Button>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/planos')} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Button fullWidth sx={{ color: 'white', justifyContent: 'center', py: 1.5 }}>
                Planos
              </Button>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/contato')} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Button fullWidth sx={{ color: 'white', justifyContent: 'center', py: 1.5 }}>
                Contato
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 2 }}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleNavigation('/contato')}
                sx={{ 
                  py: 1.5, 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#f5f5f5'
                  }
                }}
              >
                Solicitar demonstração
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ pt: 0, pb: 2 }}>
              <Button 
                variant="outlined" 
                color="inherit"
                fullWidth
                onClick={() => handleNavigation('/login')}
                sx={{ py: 1.5, borderColor: 'white', color: 'white' }}
              >
                Acessar conta
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Topbar;