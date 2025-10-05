'use client';

import { useState } from 'react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: '📊',
      description: 'Dashboard e estatísticas'
    },
    {
      id: 'media',
      label: 'Gerenciar Mídia',
      icon: '🖼️',
      description: 'Upload e organização de imagens'
    },
    {
      id: 'cases',
      label: 'Cases de Sucesso',
      icon: '✨',
      description: 'Editar casos e procedimentos',
      badge: '6'
    },
    {
      id: 'content',
      label: 'Gerenciar Conteúdo',
      icon: '📝',
      description: 'Textos e informações do site'
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-full'}`}>
      {/* Header da Sidebar */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800">Menu Admin</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-blue-100 border-l-4 border-blue-600 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{item.icon}</span>
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Footer da Sidebar */}
      {!isCollapsed && (
        <div className="p-4 border-t mt-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              🦶 VeraCare Admin v1.0
            </div>
            <div className="text-xs text-gray-400">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}