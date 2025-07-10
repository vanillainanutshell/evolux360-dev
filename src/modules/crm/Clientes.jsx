import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  TablePagination
} from '@mui/material';
import { Add, Edit, Visibility, Delete } from '@mui/icons-material';
import { dataService } from '../../utils/dataService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import ClientForm from './ClientForm';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import { debounce } from '../../utils/debounce';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [busca, setBusca] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loadClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getClientes();
      setClientes(data);
      setClientesFiltrados(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      setError('Erro ao carregar lista de clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleNewClient = () => {
    setSelectedClient(null);
    setFormOpen(true);
  };

  const handleEditClient = (cliente) => {
    setSelectedClient(cliente);
    setFormOpen(true);
  };

  const handleSaveClient = async (clienteData) => {
    try {
      if (selectedClient) {
        clienteData.id = selectedClient.id;
      }
      await dataService.saveCliente(clienteData);
      await loadClientes();
      setToast({ 
        open: true, 
        message: selectedClient ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!', 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setToast({ open: true, message: 'Erro ao salvar cliente', severity: 'error' });
      throw error;
    }
  };

  const handleDeleteClick = (cliente) => {
    setClienteToDelete(cliente);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Simula exclusão (implementar no dataService depois)
      console.log('Excluindo cliente:', clienteToDelete);
      setConfirmOpen(false);
      setClienteToDelete(null);
      setToast({ open: true, message: 'Cliente excluído com sucesso!', severity: 'success' });
      await loadClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setToast({ open: true, message: 'Erro ao excluir cliente', severity: 'error' });
    }
  };

  const filtrarClientes = useCallback((termo) => {
    if (!termo) {
      setClientesFiltrados(clientes);
    } else {
      const filtrados = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(termo.toLowerCase()) ||
        cliente.email.toLowerCase().includes(termo.toLowerCase()) ||
        (cliente.empresa && cliente.empresa.toLowerCase().includes(termo.toLowerCase()))
      );
      setClientesFiltrados(filtrados);
    }
  }, [clientes]);

  const debouncedFilter = useMemo(
    () => debounce(filtrarClientes, 300),
    [filtrarClientes]
  );

  const handleBusca = (termo) => {
    setBusca(termo);
    setPage(0);
    debouncedFilter(termo);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clientesPaginados = useMemo(() => 
    clientesFiltrados.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [clientesFiltrados, page, rowsPerPage]
  );

  if (loading) {
    return <LoadingSpinner message="Carregando clientes..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadClientes} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Clientes
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleNewClient}>
          Novo Cliente
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar clientes..."
          value={busca}
          onChange={(e) => handleBusca(e.target.value)}
          placeholder="Digite nome, email ou empresa"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesPaginados.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>{cliente.empresa || '-'}</TableCell>
                <TableCell>
                  <Chip 
                    label="Ativo" 
                    color="success" 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEditClient(cliente)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteClick(cliente)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clientesFiltrados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />

      <ClientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveClient}
        cliente={selectedClient}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Cliente"
        message={`Tem certeza que deseja excluir o cliente "${clienteToDelete?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
      />

      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </Box>
  );
}