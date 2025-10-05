'use client';

import { useState, useEffect } from 'react';

interface CaseData {
  id: string;
  title: string;
  description: string;
  procedure: string;
  results: string;
  beforeImage: string;
  afterImage: string;
  price: string;
  duration: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CasesEditor() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const initialCaseData: CaseData = {
    id: '',
    title: '',
    description: '',
    procedure: '',
    results: '',
    beforeImage: '',
    afterImage: '',
    price: '',
    duration: '',
    difficulty: 'Médio',
    tags: [],
    isPublished: true,
    createdAt: '',
    updatedAt: ''
  };

  const [formData, setFormData] = useState<CaseData>(initialCaseData);

  useEffect(() => {
    // Carregar cases existentes (simulação - em produção seria uma API)
    const existingCases: CaseData[] = [
      {
        id: '1',
        title: 'Unha Encravada Severa',
        description: 'Paciente com unha encravada grau 3, causando dor intensa e infecção.',
        procedure: 'Remoção da espícula ungueal com técnica de fenolização para evitar recidiva.',
        results: 'Alívio imediato da dor, cicatrização completa em 15 dias.',
        beforeImage: '/images/cases/unha-encravada-antes.jpg',
        afterImage: '/images/cases/unha-encravada-depois.jpg',
        price: 'R$ 150,00',
        duration: '45 minutos',
        difficulty: 'Médio',
        tags: ['unha-encravada', 'fenolização', 'dor'],
        isPublished: true,
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15'
      },
      {
        id: '2',
        title: 'Onicomicose Crônica',
        description: 'Tratamento de fungo nas unhas com laserterapia e medicação tópica.',
        procedure: 'Sessões de laser terapêutico combinado com antifúngico tópico.',
        results: 'Melhora visível após 3 sessões, cura completa em 3 meses.',
        beforeImage: '/images/cases/onicomicose-antes.jpg',
        afterImage: '/images/cases/onicomicose-depois.jpg',
        price: 'R$ 120,00/sessão',
        duration: '30 minutos',
        difficulty: 'Difícil',
        tags: ['onicomicose', 'laser', 'fungo'],
        isPublished: true,
        createdAt: '2025-01-10',
        updatedAt: '2025-01-20'
      }
    ];
    
    setCases(existingCases);
  }, []);

  const handleInputChange = (field: keyof CaseData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    
    if (isEditing && selectedCase) {
      // Editar case existente
      const updatedCase = {
        ...formData,
        updatedAt: now
      };
      
      setCases(prev => prev.map(c => c.id === selectedCase.id ? updatedCase : c));
    } else {
      // Criar novo case
      const newCase: CaseData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      
      setCases(prev => [newCase, ...prev]);
    }
    
    // Reset form
    setFormData(initialCaseData);
    setSelectedCase(null);
    setIsEditing(false);
    setShowForm(false);
    
    alert('Case salvo com sucesso!');
  };

  const handleEdit = (caseData: CaseData) => {
    setSelectedCase(caseData);
    setFormData(caseData);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (caseId: string) => {
    if (confirm('Tem certeza que deseja excluir este case?')) {
      setCases(prev => prev.filter(c => c.id !== caseId));
      alert('Case excluído com sucesso!');
    }
  };

  const togglePublished = (caseId: string) => {
    setCases(prev => prev.map(c => 
      c.id === caseId ? { ...c, isPublished: !c.isPublished } : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">✨ Cases de Sucesso</h2>
            <p className="text-gray-600">Gerencie os casos de procedimentos realizados</p>
          </div>
          <button
            onClick={() => {
              setFormData(initialCaseData);
              setSelectedCase(null);
              setIsEditing(false);
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            ➕ Novo Case
          </button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {isEditing ? '✏️ Editar Case' : '➕ Novo Case'}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Case *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Unha Encravada Severa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva o caso inicial do paciente..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Procedimento Realizado *
                </label>
                <textarea
                  value={formData.procedure}
                  onChange={(e) => handleInputChange('procedure', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva o procedimento realizado..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resultados Obtidos *
                </label>
                <textarea
                  value={formData.results}
                  onChange={(e) => handleInputChange('results', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva os resultados e benefícios..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="R$ 150,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45 minutos"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Dificuldade
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Médio">Médio</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="unha-encravada, dor, infecção"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem Antes (URL)
                </label>
                <input
                  type="text"
                  value={formData.beforeImage}
                  onChange={(e) => handleInputChange('beforeImage', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/images/cases/antes.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem Depois (URL)
                </label>
                <input
                  type="text"
                  value={formData.afterImage}
                  onChange={(e) => handleInputChange('afterImage', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/images/cases/depois.jpg"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.isPublished}
                  onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="published" className="text-sm text-gray-700">
                  Publicar case no site
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Atualizar' : 'Salvar'} Case
            </button>
          </div>
        </div>
      )}

      {/* Lista de Cases */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📋 Cases Cadastrados ({cases.length})
        </h3>
        
        {cases.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-gray-600 mb-4">Nenhum case cadastrado ainda</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              ➕ Criar Primeiro Case
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map(caseData => (
              <div key={caseData.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">{caseData.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        caseData.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {caseData.isPublished ? '🟢 Publicado' : '🔴 Rascunho'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        caseData.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                        caseData.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {caseData.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2 text-sm">{caseData.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>💰 {caseData.price}</span>
                      <span>⏱️ {caseData.duration}</span>
                      <span>📅 {new Date(caseData.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {caseData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {caseData.tags.map(tag => (
                          <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePublished(caseData.id)}
                      className={`p-2 rounded-md transition-colors ${
                        caseData.isPublished 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={caseData.isPublished ? 'Despublicar' : 'Publicar'}
                    >
                      {caseData.isPublished ? '👁️' : '👁️‍🗨️'}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(caseData)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    
                    <button
                      onClick={() => handleDelete(caseData.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}