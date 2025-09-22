'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { EmailNotificationService } from '../../utils/emailNotificationService';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  cep: string;
}

interface Errors {
  nome?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
  telefone?: string;
  dataNascimento?: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  cep: string;
  dataCadastro: string;
  prontuario: {
    historico: any[];
    exames: any[];
    consultas: any[];
  };
}

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    cep: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

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

    // Validação de nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação de senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validação de confirmação de senha
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    // Validação de telefone
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!telefoneRegex.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (11) 99999-9999';
    }

    // Validação de data de nascimento
    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
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
      // Verificar se email já existe
      const usuarios: Usuario[] = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const emailExists = usuarios.find((user: Usuario) => user.email === formData.email);
      
      if (emailExists) {
        setErrors({ email: 'Este email já está cadastrado' });
        setLoading(false);
        return;
      }

      // Criar novo usuário
      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha, // Em produção, usar hash
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento,
        endereco: formData.endereco,
        cidade: formData.cidade,
        cep: formData.cep,
        dataCadastro: new Date().toISOString(),
        prontuario: {
          historico: [],
          exames: [],
          consultas: []
        }
      };

      // Salvar no localStorage
      usuarios.push(novoUsuario);
      localStorage.setItem('veracare_usuarios', JSON.stringify(usuarios));

      // Enviar email de boas-vindas
      try {
        await EmailNotificationService.sendWelcomeEmail({
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          telefone: novoUsuario.telefone
        });
      } catch (error) {
        console.error('Erro ao enviar email de boas-vindas:', error);
        // Não interromper o fluxo por erro de email
      }

      // Auto-login após cadastro
      localStorage.setItem('veracare_usuario_logado', JSON.stringify({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }));

      alert('Cadastro realizado com sucesso! Você receberá um email de boas-vindas. Redirecionando para seu painel...');
      router.push('/dashboard');

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };



  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Criar Conta</h1>
            <p className="text-gray-600">
              Cadastre-se para ter acesso ao seu prontuário médico e histórico de consultas
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Dados Pessoais</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
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
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <input
                      type="text"
                      name="telefone"
                      value={formData.telefone}
                      onChange={(e) => {
                        const formatted = formatTelefone(e.target.value);
                        setFormData(prev => ({ ...prev, telefone: formatted }));
                      }}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.telefone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                    {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Data de Nascimento *</label>
                    <input
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dataNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>}
                  </div>


                </div>
              </div>

              {/* Endereço */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Endereço</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Endereço</label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Rua, número, bairro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        setFormData(prev => ({ ...prev, cep: formatted }));
                      }}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Dados de Acesso</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Senha *</label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.senha ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirmar Senha *</label>
                    <input
                      type="password"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Repita sua senha"
                    />
                    {errors.confirmarSenha && <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Já tem uma conta? Faça login
                </Link>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-md font-semibold text-white ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {loading ? 'Cadastrando...' : 'Criar Conta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}