'use client';

import { Header } from '../../../src/components/ui/Header';
import { Footer } from '../../../src/components/ui/Footer';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignOutPage() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Sair da conta
            </h1>
            
            <p className="text-gray-600 mb-8">
              Tem certeza de que deseja sair da sua conta? Você precisará fazer login novamente para acessar sua área pessoal.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saindo...' : 'Sim, sair da conta'}
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}