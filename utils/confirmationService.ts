// Automated confirmation system for appointments

export interface ConfirmationData {
  consulta: {
    id: string;
    data: string;
    hora: string;
    tipo: string;
    observacoes: string;
  };
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
}

export class ConfirmationService {
  /**
   * Generate WhatsApp confirmation message
   */
  generateWhatsAppMessage(data: ConfirmationData): string {
    const { consulta, usuario } = data;
    const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return encodeURIComponent(`
🏥 *VERACARE - Confirmação de Agendamento*

Olá ${usuario.nome}! Seu agendamento foi confirmado automaticamente:

📅 *Data:* ${dataFormatada}
⏰ *Horário:* ${consulta.hora}
🩺 *Serviço:* ${consulta.tipo}
📝 *ID do Agendamento:* ${consulta.id}

${consulta.observacoes ? `📋 *Observações:* ${consulta.observacoes}` : ''}

📍 *Endereço:* Rua Dias de Oliveira, 83 – Casa Verde
📞 *Contato:* (11) 96738-1029

⚠️ *Importante:*
• Chegue 10 minutos antes
• Traga documento com foto
• Use roupas confortáveis
• Para cancelar, avise com 24h de antecedência

Estamos ansiosos para atendê-lo! 💙
    `.trim());
  }

  /**
   * Generate email confirmation content
   */
  generateEmailContent(data: ConfirmationData): {
    subject: string;
    body: string;
  } {
    const { consulta, usuario } = data;
    const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      subject: `✅ Agendamento Confirmado - Veracare ${consulta.data} às ${consulta.hora}`,
      body: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmação de Agendamento - Veracare</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6; }
        .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
        .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .highlight { background: #E0F2FE; padding: 15px; border-radius: 6px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏥 VERACARE</h1>
            <h2>Agendamento Confirmado Automaticamente!</h2>
        </div>
        
        <div class="content">
            <p>Olá <strong>${usuario.nome}</strong>,</p>
            
            <p>Seu agendamento foi confirmado com sucesso através do nosso sistema automatizado! 🎉</p>
            
            <div class="info-box">
                <h3>📅 Detalhes do Agendamento</h3>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Horário:</strong> ${consulta.hora}</p>
                <p><strong>Serviço:</strong> ${consulta.tipo}</p>
                <p><strong>ID do Agendamento:</strong> ${consulta.id}</p>
                ${consulta.observacoes ? `<p><strong>Observações:</strong> ${consulta.observacoes}</p>` : ''}
            </div>

            <div class="highlight">
                <h3>📍 Local do Atendimento</h3>
                <p><strong>Endereço:</strong> Rua Dias de Oliveira, 83 – Próximo ao terminal Casa Verde</p>
                <p><strong>Telefone:</strong> (11) 96738-1029</p>
            </div>

            <div class="info-box">
                <h3>⚠️ Informações Importantes</h3>
                <ul>
                    <li>Chegue 10 minutos antes do horário agendado</li>
                    <li>Traga um documento com foto</li>
                    <li>Use roupas confortáveis</li>
                    <li>Para cancelamentos, avise com 24 horas de antecedência</li>
                </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+5511967381029" class="button">📞 Ligar para a Clínica</a>
                <a href="https://wa.me/5511967381029" class="button">💬 WhatsApp</a>
            </div>

            <p>Se precisar de qualquer esclarecimento, não hesite em entrar em contato!</p>
            
            <p>Estamos ansiosos para atendê-lo! 💙</p>
        </div>
        
        <div class="footer">
            <p>Esta é uma confirmação automática gerada pelo sistema de agendamento da Veracare.</p>
            <p>© 2025 Veracare - Cuidando dos seus pés com carinho e profissionalismo</p>
        </div>
    </div>
</body>
</html>
      `.trim()
    };
  }

  /**
   * Send WhatsApp confirmation (opens WhatsApp with pre-filled message)
   */
  sendWhatsAppConfirmation(data: ConfirmationData): void {
    const message = this.generateWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/5511967381029?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Send email confirmation (opens email client with pre-filled content)
   */
  sendEmailConfirmation(data: ConfirmationData): void {
    const { subject, body } = this.generateEmailContent(data);
    const emailUrl = `mailto:${data.usuario.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim())}`;
    
    // Open email client
    window.open(emailUrl);
  }

  /**
   * Generate appointment reminder for calendar
   */
  generateCalendarEvent(data: ConfirmationData): string {
    const { consulta, usuario } = data;
    const startDate = new Date(`${consulta.data}T${consulta.hora}:00`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Consulta Veracare - ${consulta.tipo}`)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`
Consulta agendada na Veracare

Serviço: ${consulta.tipo}
Paciente: ${usuario.nome}
Observações: ${consulta.observacoes || 'Nenhuma'}

Endereço: Rua Dias de Oliveira, 83 – Casa Verde
Telefone: (11) 96738-1029

ID do Agendamento: ${consulta.id}
    `.trim())}&location=${encodeURIComponent('Rua Dias de Oliveira, 83, Casa Verde, São Paulo, SP')}`;

    return calendarUrl;
  }

  /**
   * Show confirmation options to user
   */
  showConfirmationOptions(data: ConfirmationData): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      ">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
          <h2 style="color: #16a34a; margin: 0;">Agendamento Confirmado!</h2>
          <p style="color: #666; margin: 10px 0;">Escolha como deseja receber a confirmação:</p>
        </div>
        
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 15px 0; background: #f9fafb;">
          <strong>📅 ${new Date(data.consulta.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong><br>
          <strong>⏰ ${data.consulta.hora}</strong><br>
          <strong>🩺 ${data.consulta.tipo}</strong>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 10px; margin: 20px 0;">
          <button id="whatsapp-btn" style="
            background: #25d366;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          ">
            💬 Enviar por WhatsApp
          </button>
          
          <button id="calendar-btn" style="
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          ">
            📅 Adicionar ao Calendário
          </button>
          
          <button id="close-btn" style="
            background: #6b7280;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 20px;
            font-size: 14px;
            cursor: pointer;
          ">
            Fechar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('#whatsapp-btn')?.addEventListener('click', () => {
      this.sendWhatsAppConfirmation(data);
      document.body.removeChild(modal);
    });

    modal.querySelector('#calendar-btn')?.addEventListener('click', () => {
      const calendarUrl = this.generateCalendarEvent(data);
      window.open(calendarUrl, '_blank');
      document.body.removeChild(modal);
    });

    modal.querySelector('#close-btn')?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  /**
   * Process automatic confirmation after successful booking
   */
  processAutomaticConfirmation(data: ConfirmationData): void {
    // Show confirmation options modal
    setTimeout(() => {
      this.showConfirmationOptions(data);
    }, 1000);

    // Log confirmation for tracking
    console.log('🤖 Automatic confirmation processed:', {
      appointmentId: data.consulta.id,
      patient: data.usuario.nome,
      date: data.consulta.data,
      time: data.consulta.hora,
      service: data.consulta.tipo
    });
  }
}

// Export singleton instance
export const confirmationService = new ConfirmationService();