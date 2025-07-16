// Dados mock centralizados
const MOCK_DATA = {
  clientes: [
    { id: '1', nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-1111', empresa: 'TechStore Ltda' },
    { id: '2', nome: 'Maria Souza', email: 'maria@email.com', telefone: '(11) 99999-2222', empresa: 'Moda Express' },
    { id: '3', nome: 'Pedro Santos', email: 'pedro@email.com', telefone: '(11) 99999-3333', empresa: 'Artesanato Brasil' },
    { id: '4', nome: 'Ana Oliveira', email: 'ana@email.com', telefone: '(11) 99999-4444', empresa: 'Beleza Natural' }
  ],
  produtos: [
    { id: '1', nome: 'Notebook Dell', preco: 4500, estoque: 10, descricao: 'Notebook Dell Inspiron 15" 8GB RAM' },
    { id: '2', nome: 'Monitor LG', preco: 1200, estoque: 15, descricao: 'Monitor LG 24" Full HD' },
    { id: '3', nome: 'Teclado Mecânico', preco: 350, estoque: 30, descricao: 'Teclado Mecânico RGB' },
    { id: '4', nome: 'Mouse sem fio', preco: 120, estoque: 50, descricao: 'Mouse sem fio com bateria recarregável' },
    { id: '5', nome: 'Headset Gamer', preco: 280, estoque: 20, descricao: 'Headset Gamer com microfone' }
  ],
  formasPagamento: [
    { id: '1', nome: 'Cartão de Crédito' },
    { id: '2', nome: 'Boleto Bancário' },
    { id: '3', nome: 'PIX' },
    { id: '4', nome: 'Transferência Bancária' }
  ]
};

// Serviço centralizado para gerenciamento de dados
class DataService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Inicializar dados se não existirem
    if (!localStorage.getItem('evolux_clientes')) {
      localStorage.setItem('evolux_clientes', JSON.stringify(MOCK_DATA.clientes));
    }

    if (!localStorage.getItem('evolux_transacoes')) {
      const transacoesIniciais = [
        { id: 1, tipo: 'receita', descricao: 'Venda #001', valor: 1500, data: '2024-01-15', categoria: 'Venda' },
        { id: 2, tipo: 'despesa', descricao: 'Aluguel', valor: 800, data: '2024-01-10', categoria: 'Aluguel' },
        { id: 3, tipo: 'receita', descricao: 'Venda #002', valor: 2300, data: '2024-01-12', categoria: 'Venda' }
      ];
      localStorage.setItem('evolux_transacoes', JSON.stringify(transacoesIniciais));
    }
    
    if (!localStorage.getItem('evolux_produtos')) {
      localStorage.setItem('evolux_produtos', JSON.stringify(MOCK_DATA.produtos));
    }
    
    if (!localStorage.getItem('evolux_formas_pagamento')) {
      localStorage.setItem('evolux_formas_pagamento', JSON.stringify(MOCK_DATA.formasPagamento));
    }
  }

  // Clientes
  async getClientes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clientes = JSON.parse(localStorage.getItem('evolux_clientes') || '[]');
        resolve(clientes);
      }, 300);
    });
  }

  async saveCliente(cliente) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clientes = JSON.parse(localStorage.getItem('evolux_clientes') || '[]');
        
        if (cliente.id) {
          // Editar
          const index = clientes.findIndex(c => c.id === cliente.id);
          if (index !== -1) {
            clientes[index] = cliente;
          }
        } else {
          // Novo
          cliente.id = Date.now().toString();
          clientes.push(cliente);
        }
        
        localStorage.setItem('evolux_clientes', JSON.stringify(clientes));
        resolve(cliente);
      }, 500);
    });
  }

  async deleteCliente(clienteId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const clientes = JSON.parse(localStorage.getItem('evolux_clientes') || '[]');
          const index = clientes.findIndex(c => c.id === clienteId);
          
          if (index === -1) {
            reject(new Error('Cliente não encontrado'));
            return;
          }
          
          const clienteRemovido = clientes.splice(index, 1)[0];
          localStorage.setItem('evolux_clientes', JSON.stringify(clientes));
          resolve(clienteRemovido);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  }

  // Transações
  async getTransacoes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transacoes = JSON.parse(localStorage.getItem('evolux_transacoes') || '[]');
        resolve(transacoes);
      }, 300);
    });
  }

  async saveTransacao(transacao) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transacoes = JSON.parse(localStorage.getItem('evolux_transacoes') || '[]');
        
        transacao.id = Date.now();
        transacoes.unshift(transacao);
        
        localStorage.setItem('evolux_transacoes', JSON.stringify(transacoes));
        resolve(transacao);
      }, 500);
    });
  }

  // Produtos
  async getProdutos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const produtos = JSON.parse(localStorage.getItem('evolux_produtos') || '[]');
        resolve(produtos);
      }, 300);
    });
  }

  // Formas de pagamento
  async getFormasPagamento() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formas = JSON.parse(localStorage.getItem('evolux_formas_pagamento') || '[]');
        resolve(formas);
      }, 300);
    });
  }

  // Vendas
  async getVendas(filtros) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
        
        // Se não há vendas, criar mock inicial
        if (vendas.length === 0) {
          const mockVendas = [
            {
              id: '1',
              cliente: MOCK_DATA.clientes[0],
              itens: [
                { 
                  produto: MOCK_DATA.produtos[0], 
                  quantidade: 1, 
                  precoUnitario: MOCK_DATA.produtos[0].preco, 
                  subtotal: MOCK_DATA.produtos[0].preco 
                }
              ],
              total: MOCK_DATA.produtos[0].preco,
              formaPagamento: MOCK_DATA.formasPagamento[0],
              data: '2023-11-15T10:30:00Z',
              status: 'pago'
            },
            {
              id: '2',
              cliente: MOCK_DATA.clientes[1],
              itens: [
                { 
                  produto: MOCK_DATA.produtos[1], 
                  quantidade: 2, 
                  precoUnitario: MOCK_DATA.produtos[1].preco, 
                  subtotal: MOCK_DATA.produtos[1].preco * 2 
                }
              ],
              total: MOCK_DATA.produtos[1].preco * 2,
              formaPagamento: MOCK_DATA.formasPagamento[2],
              data: '2023-11-20T14:45:00Z',
              status: 'pendente'
            }
          ];
          localStorage.setItem('vendas', JSON.stringify(mockVendas));
          vendas = mockVendas;
        }
        
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
  }

  async saveVenda(vendaData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
        
        const novaVenda = {
          id: Date.now().toString(),
          ...vendaData,
          data: vendaData.data || new Date().toISOString(),
          status: 'pendente'
        };
        
        vendas.push(novaVenda);
        localStorage.setItem('vendas', JSON.stringify(vendas));
        resolve(novaVenda);
      }, 500);
    });
  }

  async getVendaById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
        const venda = vendas.find(v => v.id === id) || null;
        resolve(venda);
      }, 300);
    });
  }
}

export const dataService = new DataService();
export { MOCK_DATA };