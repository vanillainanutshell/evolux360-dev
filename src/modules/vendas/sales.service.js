import { MOCK_DATA } from '../../utils/dataService.js';

const { clientes: CLIENTES, produtos: PRODUTOS, formasPagamento: FORMAS_PAGAMENTO } = MOCK_DATA;

// Inicializa vendas no localStorage ou usa mock
const initVendas = () => {
  const storedVendas = localStorage.getItem('vendas');
  if (storedVendas) {
    return JSON.parse(storedVendas);
  }
  
  // Mock inicial
  const mockVendas = [
    {
      id: '1',
      cliente: CLIENTES[0],
      itens: [
        { 
          produto: PRODUTOS[0], 
          quantidade: 1, 
          precoUnitario: PRODUTOS[0].preco, 
          subtotal: PRODUTOS[0].preco 
        }
      ],
      total: PRODUTOS[0].preco,
      formaPagamento: FORMAS_PAGAMENTO[0],
      data: '2023-11-15T10:30:00Z',
      status: 'pago'
    },
    {
      id: '2',
      cliente: CLIENTES[1],
      itens: [
        { 
          produto: PRODUTOS[1], 
          quantidade: 2, 
          precoUnitario: PRODUTOS[1].preco, 
          subtotal: PRODUTOS[1].preco * 2 
        },
        { 
          produto: PRODUTOS[2], 
          quantidade: 1, 
          precoUnitario: PRODUTOS[2].preco, 
          subtotal: PRODUTOS[2].preco 
        }
      ],
      total: PRODUTOS[1].preco * 2 + PRODUTOS[2].preco,
      formaPagamento: FORMAS_PAGAMENTO[2],
      data: '2023-11-20T14:45:00Z',
      status: 'pendente'
    }
  ];
  
  localStorage.setItem('vendas', JSON.stringify(mockVendas));
  return mockVendas;
};

// Serviços
export const salesService = {
  // Obter clientes
  getClientes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(CLIENTES), 300);
    });
  },
  
  // Obter produtos
  getProdutos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(PRODUTOS), 300);
    });
  },
  
  // Obter formas de pagamento
  getFormasPagamento: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FORMAS_PAGAMENTO), 300);
    });
  },
  
  // Obter vendas com filtros opcionais
  getVendas: async (filtros) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let vendas = initVendas();
        
        // Aplicar filtros se existirem
        if (filtros) {
          if (filtros.clienteId) {
            vendas = vendas.filter(v => v.cliente.id === filtros.clienteId);
          }
          
          if (filtros.dataInicio) {
            vendas = vendas.filter(v => new Date(v.data) >= new Date(filtros.dataInicio));
          }
          
          if (filtros.dataFim) {
            vendas = vendas.filter(v => new Date(v.data) <= new Date(filtros.dataFim));
          }
          
          if (filtros.status) {
            vendas = vendas.filter(v => v.status === filtros.status);
          }
        }
        
        resolve(vendas);
      }, 500);
    });
  },
  
  // Criar nova venda
  createVenda: async (vendaData) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // Busca dados necessários
          const cliente = CLIENTES.find(c => c.id === vendaData.clienteId);
          const formaPagamento = FORMAS_PAGAMENTO.find(f => f.id === vendaData.formaPagamentoId);
          
          if (!cliente) throw new Error('Cliente não encontrado');
          if (!formaPagamento) throw new Error('Forma de pagamento não encontrada');
          
          // Processa itens
          const itens = await Promise.all(vendaData.itens.map(async item => {
            const produto = PRODUTOS.find(p => p.id === item.produtoId);
            if (!produto) throw new Error(`Produto id ${item.produtoId} não encontrado`);
            
            return {
              produto,
              quantidade: item.quantidade,
              precoUnitario: produto.preco,
              subtotal: produto.preco * item.quantidade
            };
          }));
          
          // Calcula total
          const total = itens.reduce((sum, item) => sum + item.subtotal, 0);
          
          // Cria nova venda
          const novaVenda = {
            id: Date.now().toString(),
            cliente,
            itens,
            total,
            formaPagamento,
            data: vendaData.data || new Date().toISOString(),
            status: 'pendente',
            observacoes: vendaData.observacoes
          };
          
          // Salva no localStorage
          const vendas = initVendas();
          vendas.push(novaVenda);
          localStorage.setItem('vendas', JSON.stringify(vendas));
          
          resolve(novaVenda);
        } catch (error) {
          reject(error);
        }
      }, 800);
    });
  },
  
  // Obter venda por ID
  getVendaById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vendas = initVendas();
        const venda = vendas.find(v => v.id === id) || null;
        resolve(venda);
      }, 300);
    });
  }
};