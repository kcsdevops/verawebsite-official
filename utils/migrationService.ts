/**
 * Serviço de Migração - Remove CPF de dados existentes no localStorage
 * Executar sempre que o usuário acessar o sistema para limpar dados antigos
 */

export class MigrationService {
  /**
   * Remove CPF de todos os usuários existentes no localStorage
   */
  static removeCPFFromExistingUsers(): void {
    try {
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      
      if (usuarios.length > 0) {
        // Remover CPF de cada usuário
        const usuariosMigrados = usuarios.map((usuario: any) => {
          const { cpf, ...usuarioSemCPF } = usuario;
          return usuarioSemCPF;
        });

        // Salvar dados migrados
        localStorage.setItem('veracare_usuarios', JSON.stringify(usuariosMigrados));
        
        console.log(`✅ Migração concluída: CPF removido de ${usuariosMigrados.length} usuários`);
      }
    } catch (error) {
      console.error('❌ Erro na migração:', error);
    }
  }

  /**
   * Verifica se a migração é necessária
   */
  static needsMigration(): boolean {
    try {
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      return usuarios.some((usuario: any) => usuario.hasOwnProperty('cpf'));
    } catch (error) {
      return false;
    }
  }

  /**
   * Executa migração automática se necessário
   */
  static autoMigrate(): void {
    if (this.needsMigration()) {
      console.log('🔄 Iniciando migração automática para remover CPF...');
      this.removeCPFFromExistingUsers();
    }
  }

  /**
   * Função de limpeza completa (uso administrativo)
   */
  static clearAllData(): void {
    if (confirm('⚠️ ATENÇÃO: Isso irá apagar TODOS os dados do sistema. Confirma?')) {
      localStorage.removeItem('veracare_usuarios');
      localStorage.removeItem('veracare_currentUser');
      console.log('🗑️ Todos os dados foram removidos');
      window.location.reload();
    }
  }

  /**
   * Exibir relatório do estado atual dos dados
   */
  static showDataReport(): void {
    try {
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const currentUser = localStorage.getItem('veracare_currentUser');
      
      console.log('📊 RELATÓRIO DE DADOS:');
      console.log(`├─ Total de usuários: ${usuarios.length}`);
      console.log(`├─ Usuário logado: ${currentUser ? 'Sim' : 'Não'}`);
      console.log(`├─ Usuários com CPF: ${usuarios.filter((u: any) => u.hasOwnProperty('cpf')).length}`);
      console.log(`└─ Status: ${this.needsMigration() ? '⚠️ Migração necessária' : '✅ Dados atualizados'}`);
      
      // Mostrar estrutura de um usuário exemplo (sem dados sensíveis)
      if (usuarios.length > 0) {
        const exemploUsuario = { ...usuarios[0] };
        delete exemploUsuario.senha;
        delete exemploUsuario.email;
        delete exemploUsuario.telefone;
        exemploUsuario.nome = 'Usuario***';
        console.log('📋 Estrutura de usuário:', Object.keys(exemploUsuario));
      }
    } catch (error) {
      console.error('❌ Erro ao gerar relatório:', error);
    }
  }
}

// Adicionar funções globais para debug no console do navegador
declare global {
  interface Window {
    veracareDebug: {
      migrate: () => void;
      report: () => void;
      clear: () => void;
    };
  }
}

// Disponibilizar funções de debug globalmente
if (typeof window !== 'undefined') {
  window.veracareDebug = {
    migrate: () => MigrationService.removeCPFFromExistingUsers(),
    report: () => MigrationService.showDataReport(),
    clear: () => MigrationService.clearAllData()
  };
}