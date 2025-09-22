export interface EmailData {
  to: string;
  name: string;
  subject: string;
  htmlContent: string;
}

export interface ConsultaData {
  id: string;
  data: string;
  hora: string;
  tipo: string;
  observacoes?: string;
}

export interface UsuarioData {
  nome: string;
  email: string;
  telefone: string;
}

export class EmailNotificationService {
  private static readonly EMPRESA_INFO = {
    nome: 'Veracare',
    telefone: '(11) 96738-1029',
    endereco: 'Rua das Palmeiras, 123 - Centro',
    website: 'www.veracare.com.br'
  };

  // Template base para todos os emails
  private static getBaseTemplate(title: string, content: string): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 10px; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1); 
            margin-top: 20px;
        }
        .header { 
            background: linear-gradient(135deg, #2563eb, #1d4ed8); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 10px 10px 0 0; 
            margin: -20px -20px 20px -20px;
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
        }
        .content { 
            padding: 20px 0; 
        }
        .highlight { 
            background-color: #dbeafe; 
            border-left: 4px solid #2563eb; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 5px;
        }
        .button { 
            display: inline-block; 
            background-color: #2563eb; 
            color: white; 
            padding: 12px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
            font-weight: bold;
        }
        .button:hover { 
            background-color: #1d4ed8; 
        }
        .footer { 
            border-top: 1px solid #e5e7eb; 
            padding-top: 20px; 
            margin-top: 30px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px;
        }
        .contact-info { 
            background-color: #f9fafb; 
            border: 1px solid #e5e7eb; 
            border-radius: 5px; 
            padding: 15px; 
            margin: 20px 0;
        }
        .success { 
            color: #059669; 
            font-weight: bold; 
        }
        .warning { 
            color: #d97706; 
            font-weight: bold; 
        }
        .error { 
            color: #dc2626; 
            font-weight: bold; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏥 ${this.EMPRESA_INFO.nome}</h1>
            <p>Cuidando da sua saúde com excelência</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <div class="contact-info">
                <strong>${this.EMPRESA_INFO.nome}</strong><br>
                📞 ${this.EMPRESA_INFO.telefone}<br>
                📍 ${this.EMPRESA_INFO.endereco}<br>
                🌐 ${this.EMPRESA_INFO.website}
            </div>
            <p>Este é um e-mail automático. Não responda este e-mail.</p>
            <p>© 2025 ${this.EMPRESA_INFO.nome}. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>`;
  }

  // Email de boas-vindas após cadastro
  static generateWelcomeEmail(usuario: UsuarioData): EmailData {
    const content = `
        <h2>Bem-vindo(a) à ${this.EMPRESA_INFO.nome}! 🎉</h2>
        
        <p>Olá <strong>${usuario.nome}</strong>,</p>
        
        <p>É com grande satisfação que confirmamos o seu cadastro em nossa plataforma de agendamentos.</p>
        
        <div class="highlight">
            <h3>✅ Seu cadastro foi realizado com sucesso!</h3>
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>E-mail:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        </div>
        
        <p>Agora você pode:</p>
        <ul>
            <li>📅 Agendar consultas online</li>
            <li>📱 Receber lembretes automáticos</li>
            <li>📊 Acompanhar seu histórico médico</li>
            <li>🔄 Cancelar ou reagendar com facilidade</li>
        </ul>
        
        <p>
            <a href="http://localhost:3000/agendamento" class="button">
                🗓️ Fazer meu primeiro agendamento
            </a>
        </p>
        
        <p>Nossa equipe está sempre à disposição para ajudá-lo. Em caso de dúvidas, entre em contato conosco.</p>
        
        <p class="success">Obrigado por escolher a ${this.EMPRESA_INFO.nome}!</p>
    `;

    return {
      to: usuario.email,
      name: usuario.nome,
      subject: `🎉 Bem-vindo(a) à ${this.EMPRESA_INFO.nome}!`,
      htmlContent: this.getBaseTemplate('Bem-vindo', content)
    };
  }

  // Email de confirmação de agendamento
  static generateAppointmentConfirmationEmail(consulta: ConsultaData, usuario: UsuarioData): EmailData {
    const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const content = `
        <h2>Agendamento Confirmado! ✅</h2>
        
        <p>Olá <strong>${usuario.nome}</strong>,</p>
        
        <p>Seu agendamento foi confirmado com sucesso. Confira os detalhes abaixo:</p>
        
        <div class="highlight">
            <h3>📅 Detalhes da Consulta</h3>
            <p><strong>Código:</strong> #${consulta.id}</p>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Horário:</strong> ${consulta.hora}</p>
            <p><strong>Tipo:</strong> ${consulta.tipo}</p>
            ${consulta.observacoes ? `<p><strong>Observações:</strong> ${consulta.observacoes}</p>` : ''}
        </div>
        
        <div class="warning">
            <h3>⚠️ Importante - Política de Cancelamento</h3>
            <p>Cancelamentos devem ser feitos com <strong>pelo menos 24 horas de antecedência</strong>.</p>
            <p>Após esse prazo, o cancelamento não será possível pelo sistema.</p>
        </div>
        
        <p>
            <a href="http://localhost:3000/meus-agendamentos" class="button">
                📱 Gerenciar Agendamentos
            </a>
        </p>
        
        <h3>📋 Orientações para a consulta:</h3>
        <ul>
            <li>Chegue com 15 minutos de antecedência</li>
            <li>Traga documento com foto e cartão do convênio</li>
            <li>Liste seus medicamentos atuais</li>
            <li>Prepare suas dúvidas e sintomas</li>
        </ul>
        
        <p>Em caso de emergência, ligue para ${this.EMPRESA_INFO.telefone}.</p>
        
        <p class="success">Aguardamos você! 🏥</p>
    `;

    return {
      to: usuario.email,
      name: usuario.nome,
      subject: `✅ Agendamento Confirmado - ${dataFormatada} às ${consulta.hora}`,
      htmlContent: this.getBaseTemplate('Agendamento Confirmado', content)
    };
  }

  // Email de cancelamento
  static generateCancellationEmail(consulta: ConsultaData, usuario: UsuarioData): EmailData {
    const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const content = `
        <h2>Agendamento Cancelado 🚫</h2>
        
        <p>Olá <strong>${usuario.nome}</strong>,</p>
        
        <p>Confirmamos o cancelamento da sua consulta conforme solicitado.</p>
        
        <div class="highlight">
            <h3>❌ Consulta Cancelada</h3>
            <p><strong>Código:</strong> #${consulta.id}</p>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Horário:</strong> ${consulta.hora}</p>
            <p><strong>Tipo:</strong> ${consulta.tipo}</p>
            <p><strong>Status:</strong> <span class="error">CANCELADA</span></p>
        </div>
        
        <p>Sentimos muito pela necessidade do cancelamento. Esperamos atendê-lo em breve!</p>
        
        <p>
            <a href="http://localhost:3000/agendamento" class="button">
                📅 Fazer Novo Agendamento
            </a>
        </p>
        
        <p>Nossa agenda está sempre aberta para você. Entre em contato conosco quando precisar.</p>
        
        <p class="success">Cuidamos de você! 💙</p>
    `;

    return {
      to: usuario.email,
      name: usuario.nome,
      subject: `🚫 Agendamento Cancelado - ${dataFormatada}`,
      htmlContent: this.getBaseTemplate('Agendamento Cancelado', content)
    };
  }

  // Email de lembrete (24h antes)
  static generateReminderEmail(consulta: ConsultaData, usuario: UsuarioData): EmailData {
    const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const content = `
        <h2>Lembrete: Consulta Amanhã! ⏰</h2>
        
        <p>Olá <strong>${usuario.nome}</strong>,</p>
        
        <p>Este é um lembrete da sua consulta marcada para amanhã.</p>
        
        <div class="highlight">
            <h3>📅 Sua Consulta Amanhã</h3>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Horário:</strong> ${consulta.hora}</p>
            <p><strong>Tipo:</strong> ${consulta.tipo}</p>
        </div>
        
        <div class="warning">
            <h3>⚠️ Última chance para cancelar</h3>
            <p>Se precisar cancelar, faça-o até às 23:59 de hoje.</p>
            <p>Após esse horário, o cancelamento não será mais possível.</p>
        </div>
        
        <p>
            <a href="http://localhost:3000/meus-agendamentos" class="button">
                🔄 Gerenciar Agendamento
            </a>
        </p>
        
        <h3>📋 Não esqueça de trazer:</h3>
        <ul>
            <li>Documento com foto</li>
            <li>Cartão do convênio</li>
            <li>Lista de medicamentos</li>
            <li>Exames anteriores (se houver)</li>
        </ul>
        
        <p class="success">Até amanhã! 🏥</p>
    `;

    return {
      to: usuario.email,
      name: usuario.nome,
      subject: `⏰ Lembrete: Consulta amanhã às ${consulta.hora}`,
      htmlContent: this.getBaseTemplate('Lembrete de Consulta', content)
    };
  }

  // Simular envio de email (em produção, usar SendGrid, Nodemailer, etc.)
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Aqui você integraria com um serviço real de e-mail
      console.log('📧 Email simulado enviado para:', emailData.to);
      console.log('📝 Assunto:', emailData.subject);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar modal de confirmação para o usuário
      this.showEmailConfirmation(emailData);
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return false;
    }
  }

  // Mostrar confirmação visual do email enviado
  private static showEmailConfirmation(emailData: EmailData): void {
    // Criar modal de confirmação
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div style="
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.5); 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        z-index: 10000;
      ">
        <div style="
          background: white; 
          padding: 30px; 
          border-radius: 10px; 
          max-width: 500px; 
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <h2 style="color: #059669; margin-bottom: 20px;">📧 Email Enviado!</h2>
          <p><strong>Para:</strong> ${emailData.to}</p>
          <p><strong>Assunto:</strong> ${emailData.subject}</p>
          <p style="color: #6b7280; margin: 20px 0;">
            O email foi enviado com sucesso. Verifique sua caixa de entrada.
          </p>
          <button onclick="this.closest('div').style.display='none'" style="
            background: #2563eb; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer;
            font-weight: bold;
          ">
            Fechar
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }, 5000);
  }

  // Enviar email de boas-vindas
  static async sendWelcomeEmail(usuario: UsuarioData): Promise<boolean> {
    const emailData = this.generateWelcomeEmail(usuario);
    return this.sendEmail(emailData);
  }

  // Enviar email de confirmação de agendamento
  static async sendAppointmentConfirmation(consulta: ConsultaData, usuario: UsuarioData): Promise<boolean> {
    const emailData = this.generateAppointmentConfirmationEmail(consulta, usuario);
    return this.sendEmail(emailData);
  }

  // Enviar email de cancelamento
  static async sendCancellationEmail(consulta: ConsultaData, usuario: UsuarioData): Promise<boolean> {
    const emailData = this.generateCancellationEmail(consulta, usuario);
    return this.sendEmail(emailData);
  }

  // Enviar email de lembrete
  static async sendReminderEmail(consulta: ConsultaData, usuario: UsuarioData): Promise<boolean> {
    const emailData = this.generateReminderEmail(consulta, usuario);
    return this.sendEmail(emailData);
  }
}