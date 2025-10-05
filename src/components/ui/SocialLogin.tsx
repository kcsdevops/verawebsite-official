'use client';

import { useState } from 'react';

interface SocialLoginProps {
  onSocialLogin?: (provider: string) => Promise<void>;
  onLogin?: (provider: string, userData: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Dados fictícios para simulação em desenvolvimento
const mockSocialData = {
  google: {
    id: 'google_123456789',
    email: 'usuario@gmail.com',
    name: 'João Silva',
    picture: 'https://via.placeholder.com/150',
    provider: 'google'
  },
  facebook: {
    id: 'facebook_987654321',
    email: 'usuario@facebook.com',
    name: 'Maria Santos',
    picture: 'https://via.placeholder.com/150',
    provider: 'facebook'
  },
  instagram: {
    id: 'instagram_456789123',
    email: 'usuario@instagram.com',
    name: 'Pedro Costa',
    picture: 'https://via.placeholder.com/150',
    provider: 'instagram'
  },
  linkedin: {
    id: 'linkedin_789123456',
    email: 'usuario@linkedin.com',
    name: 'Ana Oliveira',
    picture: 'https://via.placeholder.com/150',
    provider: 'linkedin'
  },
  microsoft: {
    id: 'microsoft_321654987',
    email: 'usuario@outlook.com',
    name: 'Carlos Ferreira',
    picture: 'https://via.placeholder.com/150',
    provider: 'microsoft'
  }
};

export function SocialLogin({ 
  onSocialLogin, 
  onLogin, 
  onError, 
  className = '' 
}: SocialLoginProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: keyof typeof mockSocialData) => {
    setLoading(provider);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em um ambiente real, aqui seria feita a chamada para a API da rede social
      const userData = mockSocialData[provider];
      
      // Simular possível erro (5% de chance)
      if (Math.random() < 0.05) {
        throw new Error(`Erro ao conectar com ${provider}`);
      }
      
      // Usar o callback preferencial se disponível
      if (onSocialLogin) {
        await onSocialLogin(provider);
      } else if (onLogin) {
        onLogin(provider, userData);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Erro ao fazer login com ${provider}`;
      onError?.(errorMessage);
    } finally {
      setLoading(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: '🔍',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: '🪟',
      color: 'bg-gray-700 hover:bg-gray-800',
      textColor: 'text-white'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center text-sm text-gray-600 mb-4">
        ou entre com suas redes sociais
      </div>
      
      {socialProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSocialLogin(provider.id as keyof typeof mockSocialData)}
          disabled={loading !== null}
          className={`
            w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-all duration-200
            ${provider.color} ${provider.textColor}
            ${loading === provider.id ? 'opacity-50 cursor-not-allowed' : ''}
            ${loading !== null && loading !== provider.id ? 'opacity-30' : ''}
            disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg
          `}
        >
          {loading === provider.id ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Conectando...</span>
            </>
          ) : (
            <>
              <span className="text-xl">{provider.icon}</span>
              <span>Continuar com {provider.name}</span>
            </>
          )}
        </button>
      ))}
      
      <div className="text-xs text-gray-500 text-center mt-4">
        Ao fazer login, você concorda com nossos{' '}
        <a href="/termos" className="text-blue-600 hover:underline">termos de uso</a>
        {' '}e{' '}
        <a href="/politica-privacidade" className="text-blue-600 hover:underline">política de privacidade</a>
      </div>
    </div>
  );
}

export default SocialLogin;