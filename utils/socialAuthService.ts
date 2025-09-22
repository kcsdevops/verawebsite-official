// Serviço de autenticação social para Veracare
export interface SocialUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'microsoft';
  accessToken?: string;
  refreshToken?: string;
}

export interface VeracareUser {
  email: string;
  nome: string;
  telefone?: string;
  foto?: string;
  provider: string;
  socialId: string;
  dataCreated: string;
  endereco?: {
    cep?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
}

class SocialAuthService {
  private static readonly USERS_KEY = 'veracare_usuarios';
  private static readonly LOGGED_USER_KEY = 'veracare_usuario_logado';
  private static readonly SOCIAL_USERS_KEY = 'veracare_usuarios_sociais';

  // Mapear dados sociais para formato do sistema
  static mapSocialToVeracareUser(socialData: SocialUserData): VeracareUser {
    return {
      email: socialData.email,
      nome: socialData.name,
      telefone: '', // Será preenchido posteriormente
      foto: socialData.picture,
      provider: socialData.provider,
      socialId: socialData.id,
      dataCreated: new Date().toISOString(),
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    };
  }

  // Fazer login social
  static async loginSocial(socialData: SocialUserData): Promise<VeracareUser> {
    const usuariosRegulares = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const usuariosSociais = JSON.parse(localStorage.getItem(this.SOCIAL_USERS_KEY) || '[]');
    
    // Verificar se já existe usuário com este email (login regular)
    const usuarioRegularExistente = usuariosRegulares.find((u: any) => u.email === socialData.email);
    
    if (usuarioRegularExistente) {
      // Vincular conta social ao usuário existente
      const usuarioAtualizado = {
        ...usuarioRegularExistente,
        foto: socialData.picture || usuarioRegularExistente.foto,
        provider: `${usuarioRegularExistente.provider || 'email'},${socialData.provider}`,
        socialId: socialData.id,
        dataAtualizada: new Date().toISOString()
      };

      // Atualizar na lista de usuários regulares
      const indexRegular = usuariosRegulares.findIndex((u: any) => u.email === socialData.email);
      usuariosRegulares[indexRegular] = usuarioAtualizado;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(usuariosRegulares));

      // Salvar também na lista de usuários sociais
      const usuarioSocial = this.mapSocialToVeracareUser(socialData);
      const indexSocial = usuariosSociais.findIndex((u: any) => u.email === socialData.email);
      if (indexSocial >= 0) {
        usuariosSociais[indexSocial] = usuarioSocial;
      } else {
        usuariosSociais.push(usuarioSocial);
      }
      localStorage.setItem(this.SOCIAL_USERS_KEY, JSON.stringify(usuariosSociais));

      // Fazer login
      localStorage.setItem(this.LOGGED_USER_KEY, usuarioAtualizado.email);
      return usuarioAtualizado;
    }

    // Verificar se já existe usuário social
    const usuarioSocialExistente = usuariosSociais.find((u: any) => 
      u.email === socialData.email || (u.socialId === socialData.id && u.provider === socialData.provider)
    );

    if (usuarioSocialExistente) {
      // Atualizar dados do usuário social existente
      const usuarioAtualizado = {
        ...usuarioSocialExistente,
        nome: socialData.name, // Atualizar nome caso tenha mudado
        foto: socialData.picture || usuarioSocialExistente.foto,
        dataAtualizada: new Date().toISOString()
      };

      const index = usuariosSociais.findIndex((u: any) => u.email === socialData.email);
      usuariosSociais[index] = usuarioAtualizado;
      localStorage.setItem(this.SOCIAL_USERS_KEY, JSON.stringify(usuariosSociais));

      // Fazer login
      localStorage.setItem(this.LOGGED_USER_KEY, usuarioAtualizado.email);
      return usuarioAtualizado;
    }

    // Criar novo usuário social
    const novoUsuario = this.mapSocialToVeracareUser(socialData);
    usuariosSociais.push(novoUsuario);
    localStorage.setItem(this.SOCIAL_USERS_KEY, JSON.stringify(usuariosSociais));

    // Fazer login
    localStorage.setItem(this.LOGGED_USER_KEY, novoUsuario.email);
    return novoUsuario;
  }

  // Obter usuário atual (social ou regular)
  static getCurrentUser(): VeracareUser | null {
    const emailLogado = localStorage.getItem(this.LOGGED_USER_KEY);
    if (!emailLogado) return null;

    // Tentar primeiro nos usuários sociais
    const usuariosSociais = JSON.parse(localStorage.getItem(this.SOCIAL_USERS_KEY) || '[]');
    const usuarioSocial = usuariosSociais.find((u: any) => u.email === emailLogado);
    if (usuarioSocial) return usuarioSocial;

    // Depois nos usuários regulares
    const usuariosRegulares = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const usuarioRegular = usuariosRegulares.find((u: any) => u.email === emailLogado);
    if (usuarioRegular) {
      // Converter para formato padrão
      return {
        email: usuarioRegular.email,
        nome: usuarioRegular.nome,
        telefone: usuarioRegular.telefone,
        foto: usuarioRegular.foto,
        provider: usuarioRegular.provider || 'email',
        socialId: usuarioRegular.socialId || '',
        dataCreated: usuarioRegular.dataCreated,
        endereco: usuarioRegular.endereco
      };
    }

    return null;
  }

  // Atualizar dados do usuário
  static updateUser(dadosAtualizados: Partial<VeracareUser>): boolean {
    const usuarioAtual = this.getCurrentUser();
    if (!usuarioAtual) return false;

    const usuariosSociais = JSON.parse(localStorage.getItem(this.SOCIAL_USERS_KEY) || '[]');
    const usuariosRegulares = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

    // Atualizar em usuários sociais
    const indexSocial = usuariosSociais.findIndex((u: any) => u.email === usuarioAtual.email);
    if (indexSocial >= 0) {
      usuariosSociais[indexSocial] = { ...usuariosSociais[indexSocial], ...dadosAtualizados };
      localStorage.setItem(this.SOCIAL_USERS_KEY, JSON.stringify(usuariosSociais));
    }

    // Atualizar em usuários regulares se existir
    const indexRegular = usuariosRegulares.findIndex((u: any) => u.email === usuarioAtual.email);
    if (indexRegular >= 0) {
      usuariosRegulares[indexRegular] = { ...usuariosRegulares[indexRegular], ...dadosAtualizados };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(usuariosRegulares));
    }

    return true;
  }

  // Logout
  static logout(): void {
    localStorage.removeItem(this.LOGGED_USER_KEY);
  }

  // Verificar se usuário está logado
  static isLoggedIn(): boolean {
    return !!localStorage.getItem(this.LOGGED_USER_KEY);
  }

  // Obter dados para checkout (com endereço completo se disponível)
  static getCheckoutData(): {
    nome: string;
    email: string;
    telefone: string;
    endereco: any;
  } | null {
    const usuario = this.getCurrentUser();
    if (!usuario) return null;

    return {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone || '',
      endereco: usuario.endereco || {
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    };
  }

  // Simular diferentes provedores com dados específicos
  static getMockSocialData(provider: string): SocialUserData {
    const baseData = {
      google: {
        id: 'google_' + Date.now(),
        email: 'usuario.google@gmail.com',
        name: 'João Silva Google',
        picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        provider: 'google' as const
      },
      facebook: {
        id: 'facebook_' + Date.now(),
        email: 'usuario.facebook@facebook.com',
        name: 'Maria Santos Facebook',
        picture: 'https://graph.facebook.com/v12.0/me/picture?type=large',
        provider: 'facebook' as const
      },
      instagram: {
        id: 'instagram_' + Date.now(),
        email: 'usuario.instagram@instagram.com',
        name: 'Pedro Costa Instagram',
        picture: 'https://instagram.fcgh3-1.fna.fbcdn.net/default-avatar',
        provider: 'instagram' as const
      },
      linkedin: {
        id: 'linkedin_' + Date.now(),
        email: 'usuario.linkedin@linkedin.com',
        name: 'Ana Oliveira LinkedIn',
        picture: 'https://media.licdn.com/dms/image/default-avatar',
        provider: 'linkedin' as const
      },
      microsoft: {
        id: 'microsoft_' + Date.now(),
        email: 'usuario.microsoft@outlook.com',
        name: 'Carlos Ferreira Microsoft',
        picture: 'https://graph.microsoft.com/v1.0/me/photo/$value',
        provider: 'microsoft' as const
      }
    };

    return baseData[provider as keyof typeof baseData] || baseData.google;
  }

  // Debug: Listar todos os usuários
  static debug() {
    console.log('Usuários Regulares:', JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'));
    console.log('Usuários Sociais:', JSON.parse(localStorage.getItem(this.SOCIAL_USERS_KEY) || '[]'));
    console.log('Usuário Logado:', localStorage.getItem(this.LOGGED_USER_KEY));
    console.log('Usuário Atual:', this.getCurrentUser());
  }
}

export default SocialAuthService;