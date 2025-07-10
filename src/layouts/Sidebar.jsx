import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Dashboard, ShoppingCart, People, AccountBalance, Settings, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import evoluxLogo from '../assets/evolux360_logo1.png';

const drawerWidth = 240;

const menuItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Vendas', icon: <ShoppingCart />, path: '/vendas' },
  { label: 'Clientes', icon: <People />, path: '/crm' },
  { label: 'Financeiro', icon: <AccountBalance />, path: '/financeiro' },
  { label: 'Configurações', icon: <Settings />, path: '/configuracoes' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #eee' }}>
        <img src={evoluxLogo} alt="Evolux360" style={{ height: 40 }} />
      </Box>
      
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ label, icon, path }) => (
          <ListItem component={Link} to={path} key={label} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ borderTop: '1px solid #eee' }}>
        <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </Box>
    </Drawer>
  );
}
