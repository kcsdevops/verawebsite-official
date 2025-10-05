'use client';

import { useState, useEffect } from 'react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalCases: 6,
    lastUpdate: new Date().toLocaleDateString('pt-BR'),
    siteVersion: '1.0.0'
  });

  const quickActions = [
    {
      title: 'Adicionar Novo Case',
      description: 'Criar um novo case de sucesso',
      icon: '➕',
      action: 'cases',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      title: 'Upload de Imagens',
      description: 'Adicionar novas fotos ao site',
      icon: '📸',
      action: 'media',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      title: 'Editar Conteúdo',
      description: 'Alterar textos das páginas',
      icon: '✏️',
      action: 'content',
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    }
  ];

  const recentActivity = [
    {
      action: 'Case de sucesso criado',
      description: 'Novo caso de unha encravada adicionado',
      time: '2 horas atrás',
      icon: '✨'
    },
    {
      action: 'Imagens atualizadas',
      description: '3 novas fotos de procedimentos',
      time: '5 horas atrás',
      icon: '🖼️'
    },
    {
      action: 'Conteúdo modificado',
      description: 'Texto da página inicial atualizado',
      time: '1 dia atrás',
      icon: '📝'
    }
  ];

  useEffect(() => {
    // Simular carregamento de estatísticas
    const loadStats = async () => {
      // Em produção, estas seriam chamadas API reais
      setStats({
        totalImages: 25,
        totalCases: 6,
        lastUpdate: new Date().toLocaleDateString('pt-BR'),
        siteVersion: '1.0.0'
      });
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📊</div>
            <div>
              <p className="text-sm text-gray-600">Total de Cases</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🖼️</div>
            <div>
              <p className="text-sm text-gray-600">Total de Imagens</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalImages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🌐</div>
            <div>
              <p className="text-sm text-gray-600">Versão do Site</p>
              <p className="text-2xl font-bold text-gray-800">{stats.siteVersion}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🔄</div>
            <div>
              <p className="text-sm text-gray-600">Última Atualização</p>
              <p className="text-sm font-bold text-gray-800">{stats.lastUpdate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Ações Rápidas</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border-2 border-dashed transition-all hover:shadow-md ${action.color}`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{action.icon}</div>
                <h4 className="font-semibold mb-1">{action.title}</h4>
                <p className="text-sm">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Atividade Recente */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Atividade Recente</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mr-4">{activity.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status do Sistema */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Status do Sistema</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">🌐 Site Online</span>
            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">Ativo</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">🔗 LocalTunnel</span>
            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">Conectado</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700">🗄️ Banco de Dados</span>
            <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">JSON Local</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="text-gray-700">🎨 Animações</span>
            <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">Ativas</span>
          </div>
        </div>
      </div>
    </div>
  );
}