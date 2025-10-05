'use client';

import { useState, useEffect } from 'react';
import { Header } from '../../../src/components/ui/Header';
import { Footer } from '../../../src/components/ui/Footer';
import AdminSidebar from '../../../src/components/admin/AdminSidebar';
import MediaManager from '../../../src/components/admin/MediaManager';
import CasesEditor from '../../../src/components/admin/CasesEditor';
import ContentEditor from '../../../src/components/admin/ContentEditor';
import DashboardOverview from '../../../src/components/admin/DashboardOverview';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('admin-token');
      if (token) {
        try {
          const response = await fetch('/api/admin/auth/validate', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin-token');
          }
        } catch (error) {
          localStorage.removeItem('admin-token');
        }
      }
    };
    validateAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('admin-token', token);
        setIsAuthenticated(true);
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro de conexão');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
    setPassword('');
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-32">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">🔐 Acesso Administrativo</h1>
              <p className="text-gray-600">Área restrita - VeraCare Admin</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Senha de Administrador
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Digite a senha..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors"
              >
                Entrar
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                💡 Dica: A senha padrão é "veracare123"
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'media':
        return <MediaManager />;
      case 'cases':
        return <CasesEditor />;
      case 'content':
        return <ContentEditor />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 pt-32">
        <div className="container mx-auto px-4">
          {/* Header do Admin */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">🛠️ Painel Administrativo</h1>
                <p className="text-gray-600">Gerencie conteúdo, mídia e configurações do site VeraCare</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                🚪 Sair
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminSidebar 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}