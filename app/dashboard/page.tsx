'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MigrationService } from '../../utils/migrationService';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  cep: string;
  dataCadastro: string;
  prontuario: {
    historico: any[];
    exames: any[];
    consultas: any[];
  };
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  tipo: string;
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}

interface Exame {
  id: string;
  nome: string;
  data: string;
  resultado: string;
  observacoes: string;
  arquivo?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Executar migração automática para remover CPF de dados antigos
    MigrationService.autoMigrate();
    
    // Verificar se usuário está logado
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      router.push('/login');
      return;
    }

    try {
      const dadosUsuario = JSON.parse(usuarioLogado);
      // Buscar dados completos do usuário
      const usuarios: Usuario[] = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const usuarioCompleto = usuarios.find(u => u.id === dadosUsuario.id);
      
      if (usuarioCompleto) {
        setUsuario(usuarioCompleto);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('veracare_usuario_logado');
    router.push('/');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!usuario) {
    return null;
  }

  const proximasConsultas = usuario.prontuario.consultas
    .filter((c: Consulta) => c.status === 'agendada')
    .slice(0, 3);

  const ultimosExames = usuario.prontuario.exames
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="container py-6">
        {/* Header do Dashboard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Olá, {usuario.nome}!
              </h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo ao seu painel médico
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button
                onClick={() => router.push('/agendamento')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              >
                📅 Agendar Consulta
              </button>
              <button
                onClick={() => router.push('/meus-agendamentos')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                📋 Meus Agendamentos
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Navegação por Abas */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Visão Geral' },
                { id: 'consultas', label: 'Consultas' },
                { id: 'exames', label: 'Exames' },
                { id: 'perfil', label: 'Meu Perfil' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Aba: Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Próximas Consultas */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Próximas Consultas</h3>
                    {proximasConsultas.length > 0 ? (
                      <div className="space-y-2">
                        {proximasConsultas.map((consulta: Consulta) => (
                          <div key={consulta.id} className="text-sm">
                            <p className="font-medium">{consulta.tipo}</p>
                            <p className="text-blue-600">{consulta.data} às {consulta.hora}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-blue-600">Nenhuma consulta agendada</p>
                    )}
                  </div>

                  {/* Últimos Exames */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-3">Últimos Exames</h3>
                    {ultimosExames.length > 0 ? (
                      <div className="space-y-2">
                        {ultimosExames.map((exame: Exame) => (
                          <div key={exame.id} className="text-sm">
                            <p className="font-medium">{exame.nome}</p>
                            <p className="text-green-600">{exame.data}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-green-600">Nenhum exame registrado</p>
                    )}
                  </div>

                  {/* Informações Rápidas */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-3">Informações</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Paciente desde:</span> {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</p>
                      <p><span className="font-medium">Consultas realizadas:</span> {usuario.prontuario.consultas.filter((c: Consulta) => c.status === 'realizada').length}</p>
                      <p><span className="font-medium">Exames realizados:</span> {usuario.prontuario.exames.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Aba: Consultas */}
            {activeTab === 'consultas' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Histórico de Consultas</h3>
                  <button
                    onClick={() => router.push('/agendamento')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Nova Consulta
                  </button>
                </div>
                
                {usuario.prontuario.consultas.length > 0 ? (
                  <div className="space-y-3">
                    {usuario.prontuario.consultas.map((consulta: Consulta) => (
                      <div key={consulta.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{consulta.tipo}</h4>
                            <p className="text-sm text-gray-600">{consulta.data} às {consulta.hora}</p>
                            {consulta.observacoes && (
                              <p className="text-sm mt-2">{consulta.observacoes}</p>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            consulta.status === 'realizada' ? 'bg-green-100 text-green-800' :
                            consulta.status === 'agendada' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {consulta.status === 'realizada' ? 'Realizada' :
                             consulta.status === 'agendada' ? 'Agendada' : 'Cancelada'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Nenhuma consulta registrada</p>
                    <button
                      onClick={() => router.push('/agendamento')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                    >
                      Agendar Primeira Consulta
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Aba: Exames */}
            {activeTab === 'exames' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Resultados de Exames</h3>
                </div>
                
                {usuario.prontuario.exames.length > 0 ? (
                  <div className="space-y-3">
                    {usuario.prontuario.exames.map((exame: Exame) => (
                      <div key={exame.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium">{exame.nome}</h4>
                            <p className="text-sm text-gray-600 mb-2">{exame.data}</p>
                            <p className="text-sm">{exame.resultado}</p>
                            {exame.observacoes && (
                              <p className="text-sm text-gray-600 mt-2">{exame.observacoes}</p>
                            )}
                          </div>
                          {exame.arquivo && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Ver Arquivo
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum exame registrado</p>
                  </div>
                )}
              </div>
            )}

            {/* Aba: Perfil */}
            {activeTab === 'perfil' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Meus Dados</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.nome}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefone</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.telefone}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">

                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Endereço</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.endereco}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cidade</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.cidade}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CEP</label>
                      <p className="mt-1 text-sm text-gray-900">{usuario.cep}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}