'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MigrationService } from '../../utils/migrationService';
import SocialLogin from '../../components/SocialLogin';
import SocialAuthService from '../../utils/socialAuthService';

interface FormData {
  email: string;
  senha: string;
}

interface Errors {
  email?: string;
  senha?: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // Executar migração automática ao carregar a página
  useEffect(() => {
    MigrationService.autoMigrate();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    // Validação de email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    }

    // Validação de senha
    if (!formData.senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Buscar usuários do localStorage
      const usuarios: Usuario[] = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      
      // Verificar credenciais
      const usuario = usuarios.find((user: Usuario) => 
        user.email === formData.email && user.senha === formData.senha
      );

      if (!usuario) {
        setErrors({ 
          email: 'Email ou senha incorretos',
          senha: 'Email ou senha incorretos'
        });
        setLoading(false);
        return;
      }

      // Salvar sessão do usuário
      localStorage.setItem('veracare_usuario_logado', formData.email);

      // Verificar se tem redirecionamento pendente
      const voltarPara = localStorage.getItem('login_redirect') || '/dashboard';
      localStorage.removeItem('login_redirect');

      // Redirecionar
      router.push(voltarPara);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);

      // Para demonstração, usar dados mock
      const mockSocialData = SocialAuthService.getMockSocialData(provider);
      
      // Fazer login social
      const usuario = await SocialAuthService.loginSocial(mockSocialData);
      
      console.log(`Login realizado com ${provider}:`, usuario);
      
      // Verificar se está vindo do checkout
      const voltarPara = localStorage.getItem('login_redirect') || '/dashboard';
      localStorage.removeItem('login_redirect');
      
      router.push(voltarPara);
    } catch (error) {
      console.error('Erro no login social:', error);
      setErrors({ 
        email: 'Erro ao fazer login. Tente novamente.',
        senha: 'Erro ao fazer login. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Entrar</h1>
            <p className="text-gray-600">
              Acesse sua conta para ver seu prontuário e histórico médico
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.senha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sua senha"
                />
                {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md font-semibold text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center">
                <Link 
                  href="/cadastro" 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Não tem uma conta? Cadastre-se
                </Link>
              </div>
            </form>

            {/* Separador */}
            <div className="my-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou continue com</span>
                </div>
              </div>
            </div>

            {/* Login Social */}
            <SocialLogin onSocialLogin={handleSocialLogin} />

            {/* Dados de teste para demonstração */}
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Para teste:</h3>
              <p className="text-sm text-gray-600">
                Crie uma conta usando o cadastro, use login social ou teste os dados de demonstração que serão criados automaticamente.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}