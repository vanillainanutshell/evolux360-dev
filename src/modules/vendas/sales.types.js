// Tipos e interfaces para o módulo de vendas

/**
 * @typedef {Object} Cliente
 * @property {string} id
 * @property {string} nome
 * @property {string} email
 * @property {string} telefone
 * @property {string} [empresa]
 */

/**
 * @typedef {Object} Produto
 * @property {string} id
 * @property {string} nome
 * @property {number} preco
 * @property {number} estoque
 * @property {string} [descricao]
 * @property {string} [imagem]
 */

/**
 * @typedef {Object} ItemVenda
 * @property {Produto} produto
 * @property {number} quantidade
 * @property {number} precoUnitario
 * @property {number} subtotal
 */

/**
 * @typedef {Object} FormaPagamento
 * @property {string} id
 * @property {string} nome
 */

/**
 * @typedef {Object} Venda
 * @property {string} id
 * @property {Cliente} cliente
 * @property {ItemVenda[]} itens
 * @property {number} total
 * @property {FormaPagamento} formaPagamento
 * @property {string} data - ISO date string
 * @property {'pendente'|'pago'|'cancelado'} status
 * @property {string} [observacoes]
 */

/**
 * @typedef {Object} VendaFormData
 * @property {string} clienteId
 * @property {Array<{produtoId: string, quantidade: number}>} itens
 * @property {string} formaPagamentoId
 * @property {string} [data]
 * @property {string} [observacoes]
 */

/**
 * @typedef {Object} FiltroVendas
 * @property {string} [clienteId]
 * @property {string} [dataInicio]
 * @property {string} [dataFim]
 * @property {string} [status]
 */

export {};