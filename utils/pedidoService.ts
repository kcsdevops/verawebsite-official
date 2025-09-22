// Sistema de gerenciamento de pedidos
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem?: string;
  categoria: string;
  loja: 'nobrevie' | 'podal';
}

export interface ItemPedido {
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface DadosCliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

export interface Pedido {
  id: string;
  numero: string;
  usuario: string; // email do usuário
  itens: ItemPedido[];
  dadosCliente: DadosCliente;
  status: 'pendente' | 'confirmado' | 'processando' | 'enviado' | 'entregue' | 'cancelado';
  formaPagamento: 'pix' | 'cartao';
  valorTotal: number;
  valorFrete: number;
  valorDesconto: number;
  valorFinal: number;
  observacoes?: string;
  dataCreated: string;
  dataUpdated: string;
  codigoRastreamento?: string;
  loja: 'nobrevie' | 'podal';
}

class PedidoService {
  private static readonly STORAGE_KEY = 'veracare_pedidos';
  private static readonly COUNTER_KEY = 'veracare_pedido_counter';

  // Gerar número sequencial do pedido
  private static gerarNumeroPedido(): string {
    if (typeof window === 'undefined') return '0001';
    
    const counter = parseInt(localStorage.getItem(this.COUNTER_KEY) || '0') + 1;
    localStorage.setItem(this.COUNTER_KEY, counter.toString());
    return counter.toString().padStart(4, '0');
  }

  // Gerar ID único do pedido
  private static gerarIdPedido(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Criar novo pedido
  static criarPedido(
    itens: ItemPedido[],
    dadosCliente: DadosCliente,
    formaPagamento: 'pix' | 'cartao',
    loja: 'nobrevie' | 'podal',
    usuario: string,
    observacoes?: string
  ): Pedido {
    const valorTotal = itens.reduce((total, item) => total + item.subtotal, 0);
    const valorFrete = valorTotal >= 199 ? 0 : 15; // Frete grátis acima de R$ 199
    const valorDesconto = formaPagamento === 'pix' ? valorTotal * 0.05 : 0; // 5% desconto no PIX
    const valorFinal = valorTotal + valorFrete - valorDesconto;

    const pedido: Pedido = {
      id: this.gerarIdPedido(),
      numero: this.gerarNumeroPedido(),
      usuario,
      itens,
      dadosCliente,
      status: 'pendente',
      formaPagamento,
      valorTotal,
      valorFrete,
      valorDesconto,
      valorFinal,
      observacoes,
      dataCreated: new Date().toISOString(),
      dataUpdated: new Date().toISOString(),
      loja
    };

    this.salvarPedido(pedido);
    return pedido;
  }

  // Salvar pedido no localStorage
  private static salvarPedido(pedido: Pedido): void {
    if (typeof window === 'undefined') return;
    
    const pedidos = this.obterTodosPedidos();
    const index = pedidos.findIndex(p => p.id === pedido.id);
    
    if (index >= 0) {
      pedidos[index] = { ...pedido, dataUpdated: new Date().toISOString() };
    } else {
      pedidos.push(pedido);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pedidos));
  }

  // Obter todos os pedidos
  static obterTodosPedidos(): Pedido[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const pedidos = localStorage.getItem(this.STORAGE_KEY);
      return pedidos ? JSON.parse(pedidos) : [];
    } catch {
      return [];
    }
  }

  // Obter pedidos por usuário
  static obterPedidosPorUsuario(usuario: string): Pedido[] {
    return this.obterTodosPedidos().filter(pedido => pedido.usuario === usuario);
  }

  // Obter pedido por ID
  static obterPedidoPorId(id: string): Pedido | null {
    const pedidos = this.obterTodosPedidos();
    return pedidos.find(pedido => pedido.id === id) || null;
  }

  // Atualizar status do pedido
  static atualizarStatusPedido(id: string, status: Pedido['status']): boolean {
    const pedido = this.obterPedidoPorId(id);
    if (!pedido) return false;

    pedido.status = status;
    this.salvarPedido(pedido);
    return true;
  }

  // Adicionar código de rastreamento
  static adicionarRastreamento(id: string, codigo: string): boolean {
    const pedido = this.obterPedidoPorId(id);
    if (!pedido) return false;

    pedido.codigoRastreamento = codigo;
    pedido.status = 'enviado';
    this.salvarPedido(pedido);
    return true;
  }

  // Cancelar pedido
  static cancelarPedido(id: string): boolean {
    const pedido = this.obterPedidoPorId(id);
    if (!pedido || pedido.status === 'entregue') return false;

    pedido.status = 'cancelado';
    this.salvarPedido(pedido);
    return true;
  }

  // Obter estatísticas dos pedidos por usuário
  static obterEstatisticasUsuario(usuario: string) {
    const pedidos = this.obterPedidosPorUsuario(usuario);
    
    return {
      total: pedidos.length,
      pendentes: pedidos.filter(p => p.status === 'pendente').length,
      confirmados: pedidos.filter(p => p.status === 'confirmado').length,
      processando: pedidos.filter(p => p.status === 'processando').length,
      enviados: pedidos.filter(p => p.status === 'enviado').length,
      entregues: pedidos.filter(p => p.status === 'entregue').length,
      cancelados: pedidos.filter(p => p.status === 'cancelado').length,
      valorTotal: pedidos.reduce((total, p) => total + p.valorFinal, 0)
    };
  }

  // Formatar status para exibição
  static formatarStatus(status: Pedido['status']): { label: string; color: string; icon: string } {
    const statusMap = {
      pendente: { label: 'Aguardando Pagamento', color: 'yellow', icon: '⏳' },
      confirmado: { label: 'Pagamento Confirmado', color: 'blue', icon: '✅' },
      processando: { label: 'Preparando Pedido', color: 'purple', icon: '📦' },
      enviado: { label: 'Enviado', color: 'orange', icon: '🚚' },
      entregue: { label: 'Entregue', color: 'green', icon: '🎉' },
      cancelado: { label: 'Cancelado', color: 'red', icon: '❌' }
    };
    
    return statusMap[status];
  }

  // Gerar mensagem para WhatsApp
  static gerarMensagemWhatsApp(pedido: Pedido): string {
    const status = this.formatarStatus(pedido.status);
    const lojaNome = pedido.loja === 'nobrevie' ? 'Nobrevie' : 'Podal Nano Cosméticos';
    
    let mensagem = `🛒 *PEDIDO VERACARE #${pedido.numero}*\n\n`;
    mensagem += `👤 *Cliente:* ${pedido.dadosCliente.nome}\n`;
    mensagem += `📧 *Email:* ${pedido.dadosCliente.email}\n`;
    mensagem += `📱 *Telefone:* ${pedido.dadosCliente.telefone}\n\n`;
    
    mensagem += `🏪 *Loja:* ${lojaNome}\n`;
    mensagem += `${status.icon} *Status:* ${status.label}\n\n`;
    
    mensagem += `📦 *ITENS DO PEDIDO:*\n`;
    pedido.itens.forEach(item => {
      mensagem += `• ${item.produto.nome}\n`;
      mensagem += `  Qtd: ${item.quantidade}x | Valor: R$ ${item.precoUnitario.toFixed(2)}\n`;
      mensagem += `  Subtotal: R$ ${item.subtotal.toFixed(2)}\n\n`;
    });
    
    mensagem += `💰 *RESUMO FINANCEIRO:*\n`;
    mensagem += `• Subtotal: R$ ${pedido.valorTotal.toFixed(2)}\n`;
    mensagem += `• Frete: R$ ${pedido.valorFrete.toFixed(2)}\n`;
    if (pedido.valorDesconto > 0) {
      mensagem += `• Desconto PIX (5%): -R$ ${pedido.valorDesconto.toFixed(2)}\n`;
    }
    mensagem += `• *TOTAL: R$ ${pedido.valorFinal.toFixed(2)}*\n\n`;
    
    mensagem += `💳 *Forma de Pagamento:* ${pedido.formaPagamento === 'pix' ? 'PIX' : 'Cartão de Crédito'}\n\n`;
    
    mensagem += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    mensagem += `${pedido.dadosCliente.endereco.rua}, ${pedido.dadosCliente.endereco.numero}\n`;
    if (pedido.dadosCliente.endereco.complemento) {
      mensagem += `${pedido.dadosCliente.endereco.complemento}\n`;
    }
    mensagem += `${pedido.dadosCliente.endereco.bairro}\n`;
    mensagem += `${pedido.dadosCliente.endereco.cidade}/${pedido.dadosCliente.endereco.estado}\n`;
    mensagem += `CEP: ${pedido.dadosCliente.endereco.cep}\n\n`;
    
    if (pedido.observacoes) {
      mensagem += `📝 *Observações:* ${pedido.observacoes}\n\n`;
    }
    
    if (pedido.codigoRastreamento) {
      mensagem += `📋 *Código de Rastreamento:* ${pedido.codigoRastreamento}\n\n`;
    }
    
    mensagem += `📅 *Data do Pedido:* ${new Date(pedido.dataCreated).toLocaleString('pt-BR')}\n`;
    mensagem += `🔄 *Última Atualização:* ${new Date(pedido.dataUpdated).toLocaleString('pt-BR')}\n\n`;
    
    mensagem += `---\n`;
    mensagem += `*Veracare - Cuidado e Qualidade*\n`;
    mensagem += `Site: https://veracare.com.br`;
    
    return mensagem;
  }
}

export default PedidoService;