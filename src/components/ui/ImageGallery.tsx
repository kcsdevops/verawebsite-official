'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  images: { src: string; alt: string; type: 'antes' | 'depois' | 'durante' }[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Grid de Miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"
            onClick={() => setSelectedImage(index)}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
              <div className="text-3xl mb-2">
                {image.type === 'antes' && '📷'}
                {image.type === 'durante' && '🔬'}
                {image.type === 'depois' && '✨'}
              </div>
              <p className="text-xs font-medium text-gray-600 capitalize">
                {image.type}
              </p>
            </div>
            
            {/* Badge de Tipo */}
            <div className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full text-white ${
              image.type === 'antes' ? 'bg-red-500' :
              image.type === 'durante' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              {image.type}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Visualização */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {title} - {images[selectedImage].type}
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">
                    {images[selectedImage].type === 'antes' && '📷'}
                    {images[selectedImage].type === 'durante' && '🔬'}
                    {images[selectedImage].type === 'depois' && '✨'}
                  </div>
                  <p className="text-xl capitalize font-medium">
                    Imagem {images[selectedImage].type}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {images[selectedImage].alt}
                  </p>
                </div>
              </div>
              
              {/* Navegação */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  disabled={selectedImage === 0}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  ← Anterior
                </button>
                
                <span className="text-sm text-gray-500">
                  {selectedImage + 1} de {images.length}
                </span>
                
                <button
                  onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
                  disabled={selectedImage === images.length - 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  Próxima →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;