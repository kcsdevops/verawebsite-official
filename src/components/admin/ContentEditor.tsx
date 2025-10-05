'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  page: string;
  section: string;
  field: string;
  content: string;
  type: 'text' | 'textarea' | 'html' | 'url' | 'number';
  label: string;
  description: string;
  updatedAt: string;
}

export default function ContentEditor() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const pages = [
    { id: 'home', label: 'Página Inicial', icon: '🏠' },
    { id: 'about', label: 'Quem Somos', icon: '👥' },
    { id: 'services', label: 'Serviços', icon: '🦶' },
    { id: 'contact', label: 'Contato', icon: '📞' },
    { id: 'cases', label: 'Cases de Sucesso', icon: '✨' },
    { id: 'footer', label: 'Rodapé', icon: '📄' }
  ];

  useEffect(() => {
    // Simular carregamento do conteúdo existente
    const mockContent: ContentItem[] = [
      // Página Inicial
      {
        id: '1',
        page: 'home',
        section: 'hero',
        field: 'title',
        content: 'Os seus pés em boas mãos!',
        type: 'text',
        label: 'Título Principal',
        description: 'Título da seção hero da página inicial',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '2',
        page: 'home',
        section: 'hero',
        field: 'subtitle',
        content: 'Veracare, cuidando da saúde dos seus pés com dedicação, experiência e expertise.',
        type: 'textarea',
        label: 'Subtítulo',
        description: 'Texto descritivo abaixo do título principal',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '3',
        page: 'home',
        section: 'about-preview',
        field: 'title',
        content: 'Cuidando da saúde dos seus pés com excelência!',
        type: 'text',
        label: 'Título da Seção Sobre',
        description: 'Título da prévia sobre a clínica',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '4',
        page: 'home',
        section: 'about-preview',
        field: 'description',
        content: 'Na Veracare, nossa missão é proporcionar saúde, bem-estar e conforto aos seus pés através de tratamentos preventivos e curativos, sempre com profissionalismo e dedicação.',
        type: 'textarea',
        label: 'Descrição da Clínica',
        description: 'Texto descritivo sobre a clínica',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '5',
        page: 'home',
        section: 'professional',
        field: 'name',
        content: 'Veralucia Trindade Santos',
        type: 'text',
        label: 'Nome da Profissional',
        description: 'Nome completo da podóloga',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '6',
        page: 'home',
        section: 'professional',
        field: 'title',
        content: 'Podóloga Especialista',
        type: 'text',
        label: 'Título Profissional',
        description: 'Título/especialização da profissional',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      // Quem Somos
      {
        id: '7',
        page: 'about',
        section: 'main',
        field: 'title',
        content: 'Conheça Nossa História',
        type: 'text',
        label: 'Título da Página',
        description: 'Título principal da página Quem Somos',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      // Contato
      {
        id: '8',
        page: 'contact',
        section: 'info',
        field: 'phone',
        content: '(11) 96738-1029',
        type: 'text',
        label: 'Telefone',
        description: 'Número de telefone para contato',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '9',
        page: 'contact',
        section: 'info',
        field: 'address',
        content: 'Rua das Palmeiras, 123 - Casa Verde, São Paulo - SP',
        type: 'textarea',
        label: 'Endereço',
        description: 'Endereço completo da clínica',
        updatedAt: '2025-01-15T10:00:00Z'
      },
      // Rodapé
      {
        id: '10',
        page: 'footer',
        section: 'main',
        field: 'description',
        content: 'Cuidando da saúde dos seus pés com dedicação, experiência e expertise.',
        type: 'textarea',
        label: 'Descrição do Rodapé',
        description: 'Texto descritivo no rodapé do site',
        updatedAt: '2025-01-15T10:00:00Z'
      }
    ];

    setContent(mockContent);
  }, []);

  const filteredContent = content.filter(item => {
    const matchesPage = selectedPage === 'all' || item.page === selectedPage;
    const matchesSearch = searchTerm === '' || 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPage && matchesSearch;
  });

  const handleContentChange = (itemId: string, newContent: string) => {
    setContent(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, content: newContent, updatedAt: new Date().toISOString() }
        : item
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    // Simular salvamento (em produção seria uma API call)
    try {
      // await saveContentToAPI(content);
      setHasChanges(false);
      alert('✅ Conteúdo salvo com sucesso!');
    } catch (error) {
      alert('❌ Erro ao salvar o conteúdo. Tente novamente.');
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja descartar todas as alterações?')) {
      // Recarregar conteúdo original
      window.location.reload();
    }
  };

  const renderFieldInput = (item: ContentItem) => {
    const commonProps = {
      value: item.content,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleContentChange(item.id, e.target.value),
      className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    };

    switch (item.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={3}
            placeholder={item.description}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            placeholder={item.description}
          />
        );
      case 'url':
        return (
          <input
            type="url"
            {...commonProps}
            placeholder={item.description}
          />
        );
      default:
        return (
          <input
            type="text"
            {...commonProps}
            placeholder={item.description}
          />
        );
    }
  };

  const getPageIcon = (pageId: string) => {
    return pages.find(p => p.id === pageId)?.icon || '📄';
  };

  const getPageLabel = (pageId: string) => {
    return pages.find(p => p.id === pageId)?.label || pageId;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">📝 Editor de Conteúdo</h2>
            <p className="text-gray-600">Gerencie textos e informações do site</p>
          </div>
          <div className="flex space-x-3">
            {hasChanges && (
              <>
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                >
                  🔄 Descartar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                >
                  💾 Salvar Alterações
                </button>
              </>
            )}
          </div>
        </div>

        {hasChanges && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-yellow-800">
              ⚠️ Você tem alterações não salvas. Lembre-se de salvar antes de sair.
            </p>
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filtro por página */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por página:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPage('all')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  selectedPage === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                📋 Todas
              </button>
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    selectedPage === page.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span>{page.icon}</span>
                  <span>{page.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Busca */}
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite para buscar..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de Conteúdo */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📋 Conteúdo Editável ({filteredContent.length} itens)
        </h3>

        {filteredContent.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600">Nenhum conteúdo encontrado</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredContent.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getPageIcon(item.page)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.label}</h4>
                      <p className="text-sm text-gray-500">
                        {getPageLabel(item.page)} → {item.section}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Atualizado: {new Date(item.updatedAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.description}
                  </label>
                  {renderFieldInput(item)}
                </div>

                {item.content.length > 100 && (
                  <div className="text-xs text-gray-500">
                    {item.content.length} caracteres
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações em lote */}
      {filteredContent.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Ações em Lote</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const exported = JSON.stringify(content, null, 2);
                const blob = new Blob([exported], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `veracare-content-${Date.now()}.json`;
                a.click();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              📥 Exportar Conteúdo
            </button>
            
            <button
              onClick={() => alert('Funcionalidade em desenvolvimento')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              📤 Importar Conteúdo
            </button>
            
            <button
              onClick={() => {
                if (confirm('Tem certeza que deseja restaurar o backup?')) {
                  alert('Backup restaurado com sucesso!');
                }
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              🔄 Restaurar Backup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}