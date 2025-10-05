'use client';

import { useState, useEffect } from 'react';
import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';
import PedidoService, { ItemPedido, DadosCliente } from '../../utils/pedidoService';
import SocialAuthService from '../../utils/socialAuthService';
import { useRouter } from 'next/navigation';

interface CarrinhoItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  loja: 'nobrevie' | 'podal';
  categoria: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [carrinhoItens, setCarrinhoItens] = useState<CarrinhoItem[]>([]);
  const [loja, setLoja] = useState<'nobrevie' | 'podal'>('nobrevie');
  const [loading, setLoading] = useState(false);
  const [etapa, setEtapa] = useState<'dados' | 'revisao' | 'pagamento' | 'sucesso'>('dados');
  const [usuario, setUsuario] = useState<string>('');
  
  // Dados do cliente
  const [dadosCliente, setDadosCliente] = useState<DadosCliente>({
    nome: '',
    email: '',
    telefone: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });

  // Dados do pedido
  const [formaPagamento, setFormaPagamento] = useState<'pix' | 'cartao'>('pix');
  const [observacoes, setObservacoes] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [aceitouPrivacidade, setAceitouPrivacidade] = useState(false);
  const [pedidoCriado, setPedidoCriado] = useState<any>(null);

  useEffect(() => {
    // Verificar se usuário está logado ou tentar carregar dados sociais
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      // Salvar intenção de checkout para redirecionar após login
      localStorage.setItem('login_redirect', '/checkout' + window.location.search);
      router.push('/login');
      return;
    }
    setUsuario(usuarioLogado);

    // Tentar carregar dados do usuário (social ou regular)
    const dadosCheckout = SocialAuthService.getCheckoutData();
    if (dadosCheckout) {
      setDadosCliente(prev => ({
        ...prev,
        nome: dadosCheckout.nome,
        email: dadosCheckout.email,
        telefone: dadosCheckout.telefone,
        endereco: dadosCheckout.endereco
      }));
    } else {
      // Fallback para usuários regulares antigos
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const dadosUsuario = usuarios.find((u: any) => u.email === usuarioLogado);
      if (dadosUsuario) {
        setDadosCliente(prev => ({
          ...prev,
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          telefone: dadosUsuario.telefone || ''
        }));
      }
    }

    // Carregar carrinho
    const urlParams = new URLSearchParams(window.location.search);
    const lojaParam = urlParams.get('loja') as 'nobrevie' | 'podal';
    if (lojaParam) {
      setLoja(lojaParam);
      const carrinhoKey = lojaParam === 'nobrevie' ? 'veracare_carrinho' : 'veracare_carrinho_podal';
      const carrinhoObj = JSON.parse(localStorage.getItem(carrinhoKey) || '{}');
      
      // Produtos simplificados para checkout - em um sistema real viria do banco de dados
      const produtosBase: {[key: string]: {nome: string, preco: number, categoria: string}} = {
        // Produtos Nobrevie
        'homeomag-gel': { nome: 'HomeoMag - 120g', preco: 75.90, categoria: 'Hidratantes' },
        'homeocreme-120g': { nome: 'HomeoCreme - 120g', preco: 57.99, categoria: 'Hidratantes' },
        'homeofree-30ml': { nome: 'HomeoFree - 30ml', preco: 60.30, categoria: 'Unhas' },
        // Produtos Podal
        'fungi-mai-emoliente': { nome: 'Fungi Mai - Emoliente', preco: 86.45, categoria: 'Para Unhas' },
        'sos-nail-base': { nome: 'Base Fortalecedora - SOS Nail 7ml', preco: 77.52, categoria: 'Para Unhas' },
        'mille-extreme': { nome: 'Pomada para Rachaduras - Mille Extreme 60g', preco: 86.45, categoria: 'Para os Pés' }
      };
      
      // Converter objeto do carrinho para array de itens
      const itensArray = Object.entries(carrinhoObj).map(([id, quantidade]) => {
        const produtoBase = produtosBase[id];
        return produtoBase ? {
          id,
          nome: produtoBase.nome,
          preco: produtoBase.preco,
          quantidade: quantidade as number,
          loja: lojaParam,
          categoria: produtoBase.categoria
        } : {
          id,
          nome: `Produto ${id}`,
          preco: 50.00, // Preço padrão se não encontrar
          quantidade: quantidade as number,
          loja: lojaParam,
          categoria: 'Geral'
        };
      }).filter(item => item.quantidade > 0) as CarrinhoItem[];
      
      setCarrinhoItens(itensArray);
    }
  }, [router]);

  const valorSubtotal = carrinhoItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const valorFrete = valorSubtotal >= 199 ? 0 : 15;
  const valorDesconto = formaPagamento === 'pix' ? valorSubtotal * 0.05 : 0;
  const valorFinal = valorSubtotal + valorFrete - valorDesconto;

  const buscarCEP = async (cep: string) => {
    if (cep.length !== 8) return;
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setDadosCliente(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            cep,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const validarDados = (): string[] => {
    const erros: string[] = [];
    
    if (!dadosCliente.nome.trim()) erros.push('Nome é obrigatório');
    if (!dadosCliente.email.trim()) erros.push('Email é obrigatório');
    if (!dadosCliente.telefone.trim()) erros.push('Telefone é obrigatório');
    if (!dadosCliente.endereco.cep.trim()) erros.push('CEP é obrigatório');
    if (!dadosCliente.endereco.rua.trim()) erros.push('Rua é obrigatória');
    if (!dadosCliente.endereco.numero.trim()) erros.push('Número é obrigatório');
    if (!dadosCliente.endereco.bairro.trim()) erros.push('Bairro é obrigatório');
    if (!dadosCliente.endereco.cidade.trim()) erros.push('Cidade é obrigatória');
    if (!dadosCliente.endereco.estado.trim()) erros.push('Estado é obrigatório');
    if (!aceitouTermos) erros.push('Você deve aceitar os termos de uso');
    if (!aceitouPrivacidade) erros.push('Você deve aceitar a política de privacidade');
    
    return erros;
  };

  const finalizarPedido = () => {
    const erros = validarDados();
    if (erros.length > 0) {
      alert('Erros encontrados:\n' + erros.join('\n'));
      return;
    }

    setLoading(true);

    try {
      // Converter itens do carrinho para formato do pedido
      const itensPedido: ItemPedido[] = carrinhoItens.map(item => ({
        produto: {
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          categoria: item.categoria,
          loja: item.loja
        },
        quantidade: item.quantidade,
        precoUnitario: item.preco,
        subtotal: item.preco * item.quantidade
      }));

      // Criar pedido
      const pedido = PedidoService.criarPedido(
        itensPedido,
        dadosCliente,
        formaPagamento,
        loja,
        usuario,
        observacoes
      );

      setPedidoCriado(pedido);

      // Limpar carrinho
      const carrinhoKey = loja === 'nobrevie' ? 'veracare_carrinho' : 'veracare_carrinho_podal';
      localStorage.removeItem(carrinhoKey);

      setEtapa('sucesso');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const enviarWhatsApp = () => {
    if (!pedidoCriado) return;
    
    const mensagem = PedidoService.gerarMensagemWhatsApp(pedidoCriado);
    const telefone = '5511967381029';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  if (carrinhoItens.length === 0 && etapa !== 'sucesso') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Carrinho Vazio</h1>
            <p className="text-gray-600 mb-6">Adicione produtos ao carrinho antes de finalizar a compra.</p>
            <button
              onClick={() => router.push('/catalogo')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Ver Produtos
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (etapa === 'sucesso') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="container py-16">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">Pedido Realizado com Sucesso!</h1>
              <p className="text-gray-600 mb-6">
                Seu pedido #{pedidoCriado?.numero} foi criado e será processado em breve.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Próximos Passos:</h3>
                <div className="text-sm text-green-700 text-left space-y-1">
                  <div>1. Clique no botão abaixo para enviar seu pedido via WhatsApp</div>
                  <div>2. Nossa equipe confirmará o pagamento e processamento</div>
                  <div>3. Você receberá atualizações sobre o status do pedido</div>
                  <div>4. Acompanhe o pedido na seção "Meus Pedidos" do seu perfil</div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={enviarWhatsApp}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Enviar Pedido via WhatsApp
                </button>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push('/perfil')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    Ver Meus Pedidos
                  </button>
                  <button
                    onClick={() => router.push('/catalogo')}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="container py-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${etapa === 'dados' ? 'text-blue-600' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${etapa === 'dados' ? 'bg-blue-600' : 'bg-green-600'}`}>
                  {etapa === 'dados' ? '1' : '✓'}
                </div>
                <span className="ml-2 font-medium">Dados de Entrega</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200">
                <div className={`h-1 ${etapa !== 'dados' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex items-center ${etapa === 'revisao' ? 'text-blue-600' : etapa === 'pagamento' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${etapa === 'revisao' ? 'bg-blue-600' : etapa === 'pagamento' ? 'bg-green-600' : 'bg-gray-400'}`}>
                  {etapa === 'pagamento' ? '✓' : '2'}
                </div>
                <span className="ml-2 font-medium">Revisão</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200">
                <div className={`h-1 ${etapa === 'pagamento' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex items-center ${etapa === 'pagamento' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${etapa === 'pagamento' ? 'bg-blue-600' : 'bg-gray-400'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Pagamento</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {etapa === 'dados' && 'Dados de Entrega'}
                  {etapa === 'revisao' && 'Revisão do Pedido'}
                  {etapa === 'pagamento' && 'Forma de Pagamento'}
                </h2>

                {etapa === 'dados' && (
                  <div className="space-y-6">
                    {/* Dados Pessoais */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Dados Pessoais</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                          <input
                            type="text"
                            value={dadosCliente.nome}
                            onChange={(e) => setDadosCliente(prev => ({ ...prev, nome: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            value={dadosCliente.email}
                            onChange={(e) => setDadosCliente(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp *</label>
                          <input
                            type="tel"
                            value={dadosCliente.telefone}
                            onChange={(e) => setDadosCliente(prev => ({ ...prev, telefone: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Endereço */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Endereço de Entrega</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.cep}
                              onChange={(e) => {
                                const cep = e.target.value.replace(/\D/g, '');
                                setDadosCliente(prev => ({
                                  ...prev,
                                  endereco: { ...prev.endereco, cep }
                                }));
                                if (cep.length === 8) buscarCEP(cep);
                              }}
                              maxLength={8}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="00000000"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rua *</label>
                          <input
                            type="text"
                            value={dadosCliente.endereco.rua}
                            onChange={(e) => setDadosCliente(prev => ({
                              ...prev,
                              endereco: { ...prev.endereco, rua: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.numero}
                              onChange={(e) => setDadosCliente(prev => ({
                                ...prev,
                                endereco: { ...prev.endereco, numero: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.complemento}
                              onChange={(e) => setDadosCliente(prev => ({
                                ...prev,
                                endereco: { ...prev.endereco, complemento: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.bairro}
                              onChange={(e) => setDadosCliente(prev => ({
                                ...prev,
                                endereco: { ...prev.endereco, bairro: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.cidade}
                              onChange={(e) => setDadosCliente(prev => ({
                                ...prev,
                                endereco: { ...prev.endereco, cidade: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                            <input
                              type="text"
                              value={dadosCliente.endereco.estado}
                              onChange={(e) => setDadosCliente(prev => ({
                                ...prev,
                                endereco: { ...prev.endereco, estado: e.target.value.toUpperCase() }
                              }))}
                              maxLength={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="SP"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Observações */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Informações adicionais sobre a entrega..."
                      />
                    </div>

                    {/* Termos */}
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="termos"
                          checked={aceitouTermos}
                          onChange={(e) => setAceitouTermos(e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <label htmlFor="termos" className="text-sm text-gray-600">
                          Aceito os <a href="/termos" target="_blank" className="text-blue-600 hover:underline">termos de uso</a> e condições de compra *
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacidade"
                          checked={aceitouPrivacidade}
                          onChange={(e) => setAceitouPrivacidade(e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <label htmlFor="privacidade" className="text-sm text-gray-600">
                          Aceito a <a href="/politica-privacidade" target="_blank" className="text-blue-600 hover:underline">política de privacidade</a> e tratamento de dados *
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const erros = validarDados();
                        if (erros.length > 0) {
                          alert('Erros encontrados:\n' + erros.join('\n'));
                          return;
                        }
                        setEtapa('revisao');
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Continuar para Revisão
                    </button>
                  </div>
                )}

                {etapa === 'revisao' && (
                  <div className="space-y-6">
                    {/* Dados de Entrega */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Dados de Entrega</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Nome:</strong> {dadosCliente.nome}</div>
                        <div><strong>Email:</strong> {dadosCliente.email}</div>
                        <div><strong>Telefone:</strong> {dadosCliente.telefone}</div>
                        <div><strong>Endereço:</strong> {dadosCliente.endereco.rua}, {dadosCliente.endereco.numero}</div>
                        {dadosCliente.endereco.complemento && <div><strong>Complemento:</strong> {dadosCliente.endereco.complemento}</div>}
                        <div><strong>Bairro:</strong> {dadosCliente.endereco.bairro}</div>
                        <div><strong>Cidade/UF:</strong> {dadosCliente.endereco.cidade}/{dadosCliente.endereco.estado}</div>
                        <div><strong>CEP:</strong> {dadosCliente.endereco.cep}</div>
                      </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Itens do Pedido</h3>
                      <div className="space-y-3">
                        {carrinhoItens.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800">{item.nome}</div>
                              <div className="text-sm text-gray-600">Quantidade: {item.quantidade}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-800">R$ {(item.preco * item.quantidade).toFixed(2)}</div>
                              <div className="text-sm text-gray-600">Unit: R$ {item.preco.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setEtapa('dados')}
                        className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => setEtapa('pagamento')}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}

                {etapa === 'pagamento' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4">Escolha a forma de pagamento</h3>
                      <div className="space-y-3">
                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formaPagamento === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormaPagamento('pix')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="pagamento"
                                checked={formaPagamento === 'pix'}
                                onChange={() => setFormaPagamento('pix')}
                                className="mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-800">PIX</div>
                                <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-600 font-bold">5% de desconto</div>
                              <div className="text-sm text-gray-600">R$ {(valorSubtotal * 0.05).toFixed(2)} de economia</div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formaPagamento === 'cartao' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormaPagamento('cartao')}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="pagamento"
                              checked={formaPagamento === 'cartao'}
                              onChange={() => setFormaPagamento('cartao')}
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium text-gray-800">Cartão de Crédito</div>
                              <div className="text-sm text-gray-600">Parcelamento em até 12x sem juros</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">🔒 Segurança do Pagamento</h4>
                      <p className="text-sm text-yellow-700">
                        O pagamento será processado de forma segura através do WhatsApp com nossa equipe especializada. 
                        Após finalizar o pedido, você será direcionado para enviar os detalhes via WhatsApp.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setEtapa('revisao')}
                        className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={finalizarPedido}
                        disabled={loading}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold"
                      >
                        {loading ? 'Finalizando...' : 'Finalizar Pedido'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {valorSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete:</span>
                    <span>{valorFrete === 0 ? 'Grátis' : `R$ ${valorFrete.toFixed(2)}`}</span>
                  </div>
                  {valorDesconto > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto PIX (5%):</span>
                      <span>-R$ {valorDesconto.toFixed(2)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {valorFinal.toFixed(2)}</span>
                  </div>
                </div>

                {valorSubtotal < 199 && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
                    💡 Frete grátis em compras a partir de R$ 199,00. 
                    Faltam R$ {(199 - valorSubtotal).toFixed(2)} para ganhar frete grátis!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
