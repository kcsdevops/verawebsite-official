'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Mostrar popup após 3 segundos da página carregar
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMinimized) {
      // Se minimizado, reabrir após 30 segundos
      const timer = setTimeout(() => {
        setIsMinimized(false);
        setIsVisible(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [isMinimized]);

  const handleWhatsAppClick = () => {
    const whatsappUrl = 'https://wa.me/5511967381029?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20conversar%20sobre%20os%20servi%C3%A7os%20da%20Veracare!';
    window.open(whatsappUrl, '_blank');
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleMinimize = () => {
    setIsVisible(false);
    setIsMinimized(true);
  };

  if (!isVisible) {
    return (
      // Botão flutuante quando minimizado
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 animate-pulse"
          title="Falar no WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Veracare</h4>
              <p className="text-xs opacity-90">Online agora</p>
            </div>
          </div>
          <button
            onClick={handleMinimize}
            className="text-white hover:bg-green-600 rounded p-1 transition-colors"
            title="Minimizar"
            aria-label="Minimizar chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              👋 Olá! Bem-vindo à Veracare!
            </p>
            <p className="text-sm text-gray-700">
              Estamos aqui para cuidar da saúde dos seus pés. Quer conversar conosco?
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              <span>Conversar no WhatsApp</span>
            </button>
            
            <button
              onClick={handleMinimize}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors"
            >
              Talvez mais tarde
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3) translateY(100px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1) translateY(0px);
            opacity: 1;
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}