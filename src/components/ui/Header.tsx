'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const [produtosDropdownOpen, setProdutosDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Controlar scroll do header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header com fundo quando rola
      setScrolled(currentScrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll horizontal com mouse wheel na navegação
  useEffect(() => {
    const handleWheelScroll = (e: WheelEvent) => {
      if (navRef.current && navRef.current.contains(e.target as Node)) {
        e.preventDefault();
        navRef.current.scrollLeft += e.deltaY;
      }
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener('wheel', handleWheelScroll, { passive: false });
      return () => navElement.removeEventListener('wheel', handleWheelScroll);
    }
  }, []);

  const menuItems = [
    { href: '/', label: 'Início', icon: '🏠' },
    { href: '/quem-somos', label: 'Quem Somos', icon: '👥' },
    { href: '/equipe', label: 'Equipe', icon: '👨‍⚕️' },
    { href: '/servicos', label: 'Serviços', icon: '🩺' },
    { href: '/cases-de-sucesso', label: 'Cases de Sucesso', icon: '🏆' },
    { href: '/catalogo', label: 'Catálogo', icon: '📖' },
    { href: '/agenda', label: 'Agendar', icon: '📅' },
    { href: '/agendamento-avancado', label: 'Agendamento+', icon: '⚡' },
    { href: '/contato', label: 'Contato', icon: '📞' },
    { href: '/politica-privacidade', label: 'Privacidade', icon: '🔒' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container">
        {/* Header Principal */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <div className="font-bold text-xl text-blue-900">Veracare</div>
              <div className="text-xs text-gray-500 hidden sm:block">Cuidando dos seus pés</div>
            </div>
          </div>

          {/* Telefone e Ações Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-sm bg-green-50 px-3 py-2 rounded-full border border-green-200">
              <span className="text-green-700 font-semibold">📞 (11) 96738-1029</span>
            </div>
            <div className="flex items-center space-x-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : session ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                    {session.user?.image && (
                      <img 
                        src={session.user.image} 
                        alt="Avatar" 
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-green-700 font-medium text-sm">
                      {session.user?.name}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    Entrar
                  </Link>
                  <Link 
                    href="/cadastro" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    Cadastrar
                  </Link>
                </>
              )}
              {/* Botão Admin - discreto */}
              <Link 
                href="/admin/dashboard" 
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm opacity-60 hover:opacity-100"
                title="Área Administrativa"
              >
                ⚙️
              </Link>
            </div>
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Navegação Desktop - Expandida */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group transform hover:scale-105"
                >
                  <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Dropdown de Produtos - Expandido */}
            <div 
              className="relative"
              onMouseEnter={() => setProdutosDropdownOpen(true)}
              onMouseLeave={() => setProdutosDropdownOpen(false)}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 group transform hover:scale-105">
                <span className="text-lg group-hover:animate-bounce">🛍️</span>
                <span className="font-medium">Produtos</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${produtosDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {produtosDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeInDown">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Nossas Linhas de Produtos</h3>
                  </div>
                  <Link 
                    href="/produtos" 
                    className="block px-4 py-4 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-pulse">🧴</span>
                      <div>
                        <div className="font-medium">Produtos Nobrevie</div>
                        <div className="text-xs text-gray-500">Linha completa para cuidados podológicos</div>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    href="/produtos-podal" 
                    className="block px-4 py-4 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-pulse">🧬</span>
                      <div>
                        <div className="font-medium">Podal Nano Cosméticos</div>
                        <div className="text-xs text-gray-500">Nanotecnologia para uso profissional</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-100`}>
        <div className="container py-4">
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Produtos Mobile */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Produtos</h3>
            <div className="space-y-2">
              <Link 
                href="/produtos" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">🧴</span>
                <div>
                  <div className="font-medium">Nobrevie</div>
                  <div className="text-xs text-gray-500">Cuidados podológicos</div>
                </div>
              </Link>
              <Link 
                href="/produtos-podal" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">🧬</span>
                <div>
                  <div className="font-medium">Podal Nano</div>
                  <div className="text-xs text-gray-500">Nanotecnologia</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Ações Mobile */}
          <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
            <Link 
              href="/login" 
              className="block text-center text-blue-600 hover:text-blue-800 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link 
              href="/cadastro" 
              className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cadastrar
            </Link>
            <div className="text-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <span className="text-green-700 font-semibold">📞 (11) 96738-1029</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS adicionais */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
