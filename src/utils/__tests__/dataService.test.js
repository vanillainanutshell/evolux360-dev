import { describe, it, expect, beforeEach, vi } from 'vitest';
import { dataService } from '../dataService';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('DataService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getClientes', () => {
    it('deve retornar lista de clientes do localStorage', async () => {
      const mockClientes = [
        { id: '1', nome: 'João Silva', email: 'joao@email.com' }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockClientes));

      const result = await dataService.getClientes();

      expect(result).toEqual(mockClientes);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('evolux_clientes');
    });

    it('deve retornar array vazio se não houver clientes', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await dataService.getClientes();

      expect(result).toEqual([]);
    });
  });

  describe('saveCliente', () => {
    it('deve salvar novo cliente com ID gerado', async () => {
      const mockClientes = [];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockClientes));
      
      const novoCliente = { nome: 'João Silva', email: 'joao@email.com' };
      
      const result = await dataService.saveCliente(novoCliente);

      expect(result.id).toBeDefined();
      expect(result.nome).toBe('João Silva');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('deleteCliente', () => {
    it('deve excluir cliente existente', async () => {
      const mockClientes = [
        { id: '1', nome: 'João Silva', email: 'joao@email.com' }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockClientes));

      const result = await dataService.deleteCliente('1');

      expect(result.nome).toBe('João Silva');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('deve rejeitar se cliente não existir', async () => {
      const mockClientes = [];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockClientes));

      await expect(dataService.deleteCliente('999')).rejects.toThrow('Cliente não encontrado');
    });
  });
});