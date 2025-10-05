'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '../../../src/components/ui/Header';
import { Footer } from '../../../src/components/ui/Footer';

const errorMessages: Record<string, string> = {
  Configuration: 'Erro de configuração do servidor.',
  AccessDenied: 'Acesso negado. Você não tem permissão para acessar.',
  Verification: 'Token expirado ou inválido.',
  Default: 'Ocorreu um erro durante a autenticação.',
  OAuthSignin: 'Erro ao conectar com o provedor.',
  OAuthCallback: 'Erro no callback do provedor.',
  OAuthCreateAccount: 'Não foi possível criar sua conta.',
  EmailCreateAccount: 'Não foi possível criar conta com email.',
  Callback: 'Erro no processo de autenticação.',
  OAuthAccountNotLinked: 'Para confirmar sua identidade, entre com a mesma conta usada originalmente.',
  EmailSignin: 'Erro ao enviar email de verificação.',
  CredentialsSignin: 'Falha na autenticação. Verifique suas credenciais.',
  SessionRequired: 'Você precisa estar logado para acessar esta página.'
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const message = errorMessages[error] || errorMessages.Default;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Ícone de Erro */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Título e Mensagem */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Erro na Autenticação</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Tentar Novamente
              </Link>
              
              <Link
                href="/"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Voltar ao Início
              </Link>
            </div>

            {/* Ajuda */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Precisa de ajuda? Entre em contato conosco:
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="mailto:suporte@veracare.com.br"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  📧 Email
                </a>
                <a
                  href="https://wa.me/5511967381029"
                  className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function LoadingFallback() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-600">Carregando...</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorContent />
    </Suspense>
  );
}
