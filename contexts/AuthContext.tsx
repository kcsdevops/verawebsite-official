'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (usuarioLogado) {
      try {
        setUsuario(JSON.parse(usuarioLogado));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('veracare_usuario_logado');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const usuarioEncontrado = usuarios.find((user: any) => 
        user.email === email && user.senha === senha
      );

      if (usuarioEncontrado) {
        const dadosUsuario = {
          id: usuarioEncontrado.id,
          nome: usuarioEncontrado.nome,
          email: usuarioEncontrado.email
        };
        
        setUsuario(dadosUsuario);
        localStorage.setItem('veracare_usuario_logado', JSON.stringify(dadosUsuario));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('veracare_usuario_logado');
  };

  const value = {
    usuario,
    loading,
    login,
    logout,
    isAuthenticated: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}