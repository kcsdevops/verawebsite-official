'use client';

import { useState, useRef, useCallback } from 'react';

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadDate: string;
  category: string;
}

export default function MediaManager() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'Todas', icon: '📁' },
    { id: 'cases', label: 'Cases de Sucesso', icon: '✨' },
    { id: 'procedures', label: 'Procedimentos', icon: '🦶' },
    { id: 'clinic', label: 'Clínica', icon: '🏥' },
    { id: 'team', label: 'Equipe', icon: '👥' },
    { id: 'equipment', label: 'Equipamentos', icon: '🔧' }
  ];

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    
    // Simular upload (em produção, seria uma chamada API real)
    Array.from(files).forEach((file, index) => {
      setTimeout(() => {
        const newImage: UploadedImage = {
          id: Date.now().toString() + index,
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          category: 'cases' // categoria padrão
        };
        
        setImages(prev => [newImage, ...prev]);
        
        if (index === files.length - 1) {
          setIsUploading(false);
          setShowUpload(false);
        }
      }, (index + 1) * 500);
    });
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    
    if (files.length > 0) {
      const fakeEvent = {
        target: { files }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const deleteImages = () => {
    setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const updateImageCategory = (imageId: string, category: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, category } : img
    ));
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Em produção, mostraria uma notificação
    alert('URL copiada para a área de transferência!');
  };

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">🖼️ Gerenciador de Mídia</h2>
            <p className="text-gray-600">Upload e organização de imagens do site</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              📸 Upload
            </button>
            {selectedImages.length > 0 && (
              <button
                onClick={deleteImages}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                🗑️ Excluir ({selectedImages.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {showUpload && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📤 Upload de Imagens</h3>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-600 mb-4">
              Arraste e solte suas imagens aqui ou clique para selecionar
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              disabled={isUploading}
            >
              {isUploading ? '📤 Uploading...' : '📁 Selecionar Arquivos'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          {isUploading && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md">
              <p className="text-blue-700">⏳ Fazendo upload das imagens...</p>
            </div>
          )}
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                filter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {category.id === 'all' ? images.length : images.filter(img => img.category === category.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Imagens */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-gray-600 text-lg mb-4">Nenhuma imagem encontrada</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              📸 Fazer Upload
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {filteredImages.length} imagem(ns) encontrada(s)
              </h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedImages(filteredImages.map(img => img.id));
                      } else {
                        setSelectedImages([]);
                      }
                    }}
                    className="mr-2"
                  />
                  Selecionar todas
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map(image => (
                <div
                  key={image.id}
                  className={`relative group bg-gray-100 rounded-lg overflow-hidden ${
                    selectedImages.includes(image.id) ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="absolute top-2 left-2 z-10"
                  />
                  
                  {/* Imagem */}
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => copyImageUrl(image.url)}
                  />
                  
                  {/* Overlay com informações */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 text-white text-center transition-opacity">
                      <button
                        onClick={() => copyImageUrl(image.url)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm mb-2 block w-full"
                      >
                        📋 Copiar URL
                      </button>
                      <select
                        value={image.category}
                        onChange={(e) => updateImageCategory(image.id, e.target.value)}
                        className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {categories.filter(cat => cat.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Info da imagem */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(image.uploadDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}