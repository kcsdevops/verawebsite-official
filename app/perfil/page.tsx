'use client';

import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import PedidoService, { Pedido } from '../../utils/pedidoService';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'dados' | 'pedidos' | 'historico'>('dados');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | Pedido['status']>('todos');
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para edição dos dados
  const [dadosEdicao, setDadosEdicao] = useState({
    nome: '',
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

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      router.push('/login');
      return;
    }

    // Carregar dados do usuário
    const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
    const dadosUsuario = usuarios.find((u: any) => u.email === usuarioLogado);
    if (dadosUsuario) {
      setUsuario(dadosUsuario);
      setDadosEdicao({
        nome: dadosUsuario.nome || '',
        telefone: dadosUsuario.telefone || '',
        endereco: dadosUsuario.endereco || {
          cep: '',
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: ''
        }
      });
    }

    // Carregar pedidos do usuário
    const pedidosUsuario = PedidoService.obterPedidosPorUsuario(usuarioLogado);
    setPedidos(pedidosUsuario);
    setLoading(false);
  }, [router]);

  const buscarCEP = async (cep: string) => {
    if (cep.length !== 8) return;
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setDadosEdicao(prev => ({
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

  const salvarDados = () => {
    if (!usuario) return;

    const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === usuario.email);
    
    if (index >= 0) {
      usuarios[index] = {
        ...usuarios[index],
        nome: dadosEdicao.nome,
        telefone: dadosEdicao.telefone,
        endereco: dadosEdicao.endereco
      };
      
      localStorage.setItem('veracare_usuarios', JSON.stringify(usuarios));
      setUsuario(usuarios[index]);
      setEditando(false);
      alert('Dados atualizados com sucesso!');
    }
  };

  const pedidosFiltrados = filtroStatus === 'todos' 
    ? pedidos 
    : pedidos.filter(pedido => pedido.status === filtroStatus);

  const estatisticas = PedidoService.obterEstatisticasUsuario(usuario?.email || '');

  const enviarPedidoWhatsApp = (pedido: Pedido) => {
    const mensagem = PedidoService.gerarMensagemWhatsApp(pedido);
    const telefone = '5511967381029';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando perfil...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!usuario) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">👤</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Usuário não encontrado</h1>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Fazer Login
            </button>
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold">Olá, {usuario.nome}!</h1>
                <p className="text-xl opacity-90">Gerencie sua conta e acompanhe seus pedidos</p>
                <div className="text-sm opacity-80 mt-2">
                  Membro desde: {new Date(usuario.dataCreated || Date.now()).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-8 bg-white border-b">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{estatisticas.total}</div>
                <div className="text-sm text-blue-800">Total de Pedidos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{estatisticas.entregues}</div>
                <div className="text-sm text-green-800">Entregues</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes + estatisticas.confirmados + estatisticas.processando + estatisticas.enviados}</div>
                <div className="text-sm text-yellow-800">Em Andamento</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">R$ {estatisticas.valorTotal.toFixed(2)}</div>
                <div className="text-sm text-purple-800">Total Gasto</div>
              </div>
            </div>
          </div>
        </section>

        {/* Navegação por Abas */}
        <section className="py-8">
          <div className="container">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setAbaAtiva('dados')}
                  className={`flex-1 py-4 px-6 font-medium ${
                    abaAtiva === 'dados' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📝 Meus Dados
                </button>
                <button
                  onClick={() => setAbaAtiva('pedidos')}
                  className={`flex-1 py-4 px-6 font-medium ${
                    abaAtiva === 'pedidos' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🛒 Meus Pedidos
                </button>
                <button
                  onClick={() => setAbaAtiva('historico')}
                  className={`flex-1 py-4 px-6 font-medium ${
                    abaAtiva === 'historico' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 Histórico
                </button>
              </div>

              {/* Conteúdo das Abas */}
              <div className="p-6">
                {abaAtiva === 'dados' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">Meus Dados</h2>
                      <button
                        onClick={() => editando ? salvarDados() : setEditando(true)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          editando 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {editando ? '💾 Salvar' : '✏️ Editar'}
                      </button>
                    </div>

                    {editando && (
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          ⚠️ Você está no modo de edição. Faça as alterações necessárias e clique em "Salvar" para confirmar.
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Dados Pessoais */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Dados Pessoais</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                            {editando ? (
                              <input
                                type="text"
                                value={dadosEdicao.nome}
                                onChange={(e) => setDadosEdicao(prev => ({ ...prev, nome: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <div className="p-2 bg-white rounded border">{usuario.nome}</div>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="p-2 bg-gray-100 rounded border text-gray-600">
                              {usuario.email} (não pode ser alterado)
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp</label>
                            {editando ? (
                              <input
                                type="tel"
                                value={dadosEdicao.telefone}
                                onChange={(e) => setDadosEdicao(prev => ({ ...prev, telefone: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="(11) 99999-9999"
                              />
                            ) : (
                              <div className="p-2 bg-white rounded border">{usuario.telefone || 'Não informado'}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Endereço */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Endereço</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.cep}
                                  onChange={(e) => {
                                    const cep = e.target.value.replace(/\D/g, '');
                                    setDadosEdicao(prev => ({
                                      ...prev,
                                      endereco: { ...prev.endereco, cep }
                                    }));
                                    if (cep.length === 8) buscarCEP(cep);
                                  }}
                                  maxLength={8}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="00000000"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.cep || 'Não informado'}</div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                            {editando ? (
                              <input
                                type="text"
                                value={dadosEdicao.endereco.rua}
                                onChange={(e) => setDadosEdicao(prev => ({
                                  ...prev,
                                  endereco: { ...prev.endereco, rua: e.target.value }
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <div className="p-2 bg-white rounded border">{usuario.endereco?.rua || 'Não informado'}</div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.numero}
                                  onChange={(e) => setDadosEdicao(prev => ({
                                    ...prev,
                                    endereco: { ...prev.endereco, numero: e.target.value }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.numero || 'Não informado'}</div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.complemento}
                                  onChange={(e) => setDadosEdicao(prev => ({
                                    ...prev,
                                    endereco: { ...prev.endereco, complemento: e.target.value }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.complemento || 'Não informado'}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.bairro}
                                  onChange={(e) => setDadosEdicao(prev => ({
                                    ...prev,
                                    endereco: { ...prev.endereco, bairro: e.target.value }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.bairro || 'Não informado'}</div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.cidade}
                                  onChange={(e) => setDadosEdicao(prev => ({
                                    ...prev,
                                    endereco: { ...prev.endereco, cidade: e.target.value }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.cidade || 'Não informado'}</div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                              {editando ? (
                                <input
                                  type="text"
                                  value={dadosEdicao.endereco.estado}
                                  onChange={(e) => setDadosEdicao(prev => ({
                                    ...prev,
                                    endereco: { ...prev.endereco, estado: e.target.value.toUpperCase() }
                                  }))}
                                  maxLength={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="SP"
                                />
                              ) : (
                                <div className="p-2 bg-white rounded border">{usuario.endereco?.estado || 'Não informado'}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {editando && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setEditando(false);
                            // Resetar dados de edição
                            setDadosEdicao({
                              nome: usuario.nome || '',
                              telefone: usuario.telefone || '',
                              endereco: usuario.endereco || {
                                cep: '',
                                rua: '',
                                numero: '',
                                complemento: '',
                                bairro: '',
                                cidade: '',
                                estado: ''
                              }
                            });
                          }}
                          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={salvarDados}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {abaAtiva === 'pedidos' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <h2 className="text-2xl font-bold text-gray-800">Meus Pedidos</h2>
                      
                      {/* Filtros */}
                      <div className="flex flex-wrap gap-2">
                        {(['todos', 'pendente', 'confirmado', 'processando', 'enviado', 'entregue', 'cancelado'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setFiltroStatus(status)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              filtroStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {status === 'todos' ? 'Todos' : PedidoService.formatarStatus(status).label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {pedidosFiltrados.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum pedido encontrado</h3>
                        <p className="text-gray-600 mb-6">
                          {filtroStatus === 'todos' 
                            ? 'Você ainda não fez nenhum pedido.' 
                            : `Nenhum pedido com status "${PedidoService.formatarStatus(filtroStatus as Pedido['status']).label}".`
                          }
                        </p>
                        <button
                          onClick={() => router.push('/catalogo')}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                          Ver Produtos
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pedidosFiltrados.map((pedido) => {
                          const statusInfo = PedidoService.formatarStatus(pedido.status);
                          const lojaNome = pedido.loja === 'nobrevie' ? 'Nobrevie' : 'Podal Nano Cosméticos';
                          
                          return (
                            <div key={pedido.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                              <div className="flex flex-wrap justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-800">Pedido #{pedido.numero}</h3>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <div>🏪 <strong>Loja:</strong> {lojaNome}</div>
                                    <div>📅 <strong>Data:</strong> {new Date(pedido.dataCreated).toLocaleDateString('pt-BR')}</div>
                                    <div>💰 <strong>Total:</strong> R$ {pedido.valorFinal.toFixed(2)}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                    statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                                    statusInfo.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                                    statusInfo.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                    statusInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {statusInfo.icon} {statusInfo.label}
                                  </div>
                                  {pedido.codigoRastreamento && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Rastreamento: {pedido.codigoRastreamento}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Itens do Pedido */}
                              <div className="border-t pt-4">
                                <h4 className="font-medium text-gray-700 mb-2">Itens:</h4>
                                <div className="space-y-2">
                                  {pedido.itens.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                      <span>{item.produto.nome} (x{item.quantidade})</span>
                                      <span className="font-medium">R$ {item.subtotal.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Ações */}
                              <div className="border-t pt-4 flex flex-wrap gap-2">
                                <button
                                  onClick={() => enviarPedidoWhatsApp(pedido)}
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm flex items-center gap-2"
                                >
                                  <span>💬</span>
                                  Enviar via WhatsApp
                                </button>
                                
                                {pedido.status === 'pendente' && (
                                  <button
                                    onClick={() => {
                                      if (confirm('Tem certeza que deseja cancelar este pedido?')) {
                                        PedidoService.cancelarPedido(pedido.id);
                                        setPedidos(PedidoService.obterPedidosPorUsuario(usuario.email));
                                        alert('Pedido cancelado com sucesso!');
                                      }
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                                  >
                                    ❌ Cancelar
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {abaAtiva === 'historico' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Histórico de Compras</h2>
                    
                    {/* Resumo por Status */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">{estatisticas.pendentes}</div>
                        <div className="text-sm text-yellow-800">Pendentes</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{estatisticas.confirmados}</div>
                        <div className="text-sm text-blue-800">Confirmados</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{estatisticas.processando}</div>
                        <div className="text-sm text-purple-800">Processando</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">{estatisticas.enviados}</div>
                        <div className="text-sm text-orange-800">Enviados</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{estatisticas.entregues}</div>
                        <div className="text-sm text-green-800">Entregues</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">{estatisticas.cancelados}</div>
                        <div className="text-sm text-red-800">Cancelados</div>
                      </div>
                    </div>

                    {/* Histórico por Mês */}
                    <div className="bg-white p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumo Financeiro</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">R$ {estatisticas.valorTotal.toFixed(2)}</div>
                          <div className="text-sm text-blue-800">Total Gasto</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            R$ {pedidos.filter(p => p.status === 'entregue').reduce((total, p) => total + p.valorFinal, 0).toFixed(2)}
                          </div>
                          <div className="text-sm text-green-800">Pedidos Entregues</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">
                            R$ {(estatisticas.valorTotal / Math.max(estatisticas.total, 1)).toFixed(2)}
                          </div>
                          <div className="text-sm text-purple-800">Ticket Médio</div>
                        </div>
                      </div>
                    </div>

                    {/* Produtos Mais Comprados */}
                    <div className="bg-white p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Produtos Mais Comprados</h3>
                      {(() => {
                        const produtoCount: { [key: string]: { nome: string; quantidade: number; valor: number } } = {};
                        
                        pedidos.forEach(pedido => {
                          pedido.itens.forEach(item => {
                            if (!produtoCount[item.produto.id]) {
                              produtoCount[item.produto.id] = {
                                nome: item.produto.nome,
                                quantidade: 0,
                                valor: 0
                              };
                            }
                            produtoCount[item.produto.id].quantidade += item.quantidade;
                            produtoCount[item.produto.id].valor += item.subtotal;
                          });
                        });

                        const produtosOrdenados = Object.values(produtoCount)
                          .sort((a, b) => b.quantidade - a.quantidade)
                          .slice(0, 5);

                        return produtosOrdenados.length > 0 ? (
                          <div className="space-y-3">
                            {produtosOrdenados.map((produto, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-800">{produto.nome}</div>
                                  <div className="text-sm text-gray-600">Comprado {produto.quantidade}x</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-gray-800">R$ {produto.valor.toFixed(2)}</div>
                                  <div className="text-sm text-gray-600">Total gasto</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 text-center py-4">Nenhuma compra realizada ainda.</p>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}