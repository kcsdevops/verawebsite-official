import { EmailNotificationService } from './emailNotificationService';

export interface ConsultaCancelamento {
  id: string;
  data: string;
  hora: string;
  tipo: string;
  observacoes?: string;
  status: 'agendada' | 'cancelada' | 'realizada';
  dataCancelamento?: string;
}

export interface UsuarioCancelamento {
  nome: string;
  email: string;
  telefone: string;
}

export class CancellationService {
  // Verificar se o cancelamento pode ser feito (24h antes)
  static canCancel(dataConsulta: string, horaConsulta: string): {
    canCancel: boolean;
    reason: string;
    timeRemaining?: string;
  } {
    try {
      // Criar data/hora da consulta
      const [dia, mes, ano] = dataConsulta.split('/');
      const [hora, minuto] = horaConsulta.split(':');
      
      const consultaDateTime = new Date(
        parseInt(ano),
        parseInt(mes) - 1, // Mês é 0-indexed
        parseInt(dia),
        parseInt(hora),
        parseInt(minuto)
      );

      const agora = new Date();
      const limiteParaCancelar = new Date(consultaDateTime.getTime() - (24 * 60 * 60 * 1000)); // 24h antes

      if (agora > consultaDateTime) {
        return {
          canCancel: false,
          reason: 'A consulta já passou da data/horário marcado.'
        };
      }

      if (agora > limiteParaCancelar) {
        const horasRestantes = Math.floor((consultaDateTime.getTime() - agora.getTime()) / (1000 * 60 * 60));
        const minutosRestantes = Math.floor(((consultaDateTime.getTime() - agora.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
          canCancel: false,
          reason: `Cancelamento não permitido. Faltam apenas ${horasRestantes}h${minutosRestantes}min para a consulta.`,
          timeRemaining: `${horasRestantes}h${minutosRestantes}min`
        };
      }

      // Calcular tempo restante para o limite
      const tempoRestante = limiteParaCancelar.getTime() - agora.getTime();
      const diasRestantes = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
      const horasRestantes = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      let timeRemainingText = '';
      if (diasRestantes > 0) {
        timeRemainingText = `${diasRestantes} dia(s) e ${horasRestantes} hora(s)`;
      } else {
        timeRemainingText = `${horasRestantes} hora(s)`;
      }

      return {
        canCancel: true,
        reason: `Cancelamento permitido até ${limiteParaCancelar.toLocaleString('pt-BR')}.`,
        timeRemaining: timeRemainingText
      };

    } catch (error) {
      console.error('Erro ao verificar possibilidade de cancelamento:', error);
      return {
        canCancel: false,
        reason: 'Erro ao processar data/hora da consulta.'
      };
    }
  }

  // Cancelar consulta
  static async cancelAppointment(
    consultaId: string, 
    motivo?: string
  ): Promise<{
    success: boolean;
    message: string;
    emailSent?: boolean;
  }> {
    try {
      // Buscar dados do localStorage
      const usuariosString = localStorage.getItem('veracare_usuarios');
      if (!usuariosString) {
        return {
          success: false,
          message: 'Dados de usuários não encontrados.'
        };
      }

      const usuarios = JSON.parse(usuariosString);
      let consultaEncontrada: ConsultaCancelamento | null = null;
      let usuarioEncontrado: UsuarioCancelamento | null = null;
      let usuarioIndex = -1;
      let consultaIndex = -1;

      // Encontrar a consulta
      for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.consultas && Array.isArray(usuario.consultas)) {
          for (let j = 0; j < usuario.consultas.length; j++) {
            const consulta = usuario.consultas[j];
            if (consulta.id === consultaId) {
              consultaEncontrada = consulta;
              usuarioEncontrado = {
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone
              };
              usuarioIndex = i;
              consultaIndex = j;
              break;
            }
          }
          if (consultaEncontrada) break;
        }
      }

      if (!consultaEncontrada || !usuarioEncontrado) {
        return {
          success: false,
          message: 'Consulta não encontrada.'
        };
      }

      // Verificar se já está cancelada
      if (consultaEncontrada.status === 'cancelada') {
        return {
          success: false,
          message: 'Esta consulta já foi cancelada.'
        };
      }

      // Verificar se pode cancelar (24h antes)
      const cancelCheck = this.canCancel(consultaEncontrada.data, consultaEncontrada.hora);
      if (!cancelCheck.canCancel) {
        return {
          success: false,
          message: cancelCheck.reason
        };
      }

      // Realizar cancelamento
      usuarios[usuarioIndex].consultas[consultaIndex] = {
        ...consultaEncontrada,
        status: 'cancelada',
        dataCancelamento: new Date().toISOString(),
        motivoCancelamento: motivo || 'Cancelado pelo paciente'
      };

      // Salvar no localStorage
      localStorage.setItem('veracare_usuarios', JSON.stringify(usuarios));

      // Enviar email de cancelamento
      let emailSent = false;
      try {
        emailSent = await EmailNotificationService.sendCancellationEmail(
          {
            id: consultaEncontrada.id,
            data: consultaEncontrada.data,
            hora: consultaEncontrada.hora,
            tipo: consultaEncontrada.tipo,
            observacoes: consultaEncontrada.observacoes
          },
          usuarioEncontrado
        );
      } catch (error) {
        console.error('Erro ao enviar email de cancelamento:', error);
      }

      return {
        success: true,
        message: 'Consulta cancelada com sucesso!',
        emailSent
      };

    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      return {
        success: false,
        message: 'Erro interno. Tente novamente.'
      };
    }
  }

  // Buscar consultas do usuário logado
  static getUserAppointments(): ConsultaCancelamento[] {
    try {
      const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
      if (!usuarioLogado) return [];

      const emailLogado = JSON.parse(usuarioLogado).email;
      const usuariosString = localStorage.getItem('veracare_usuarios');
      if (!usuariosString) return [];

      const usuarios = JSON.parse(usuariosString);
      const usuario = usuarios.find((u: any) => u.email === emailLogado);
      
      if (!usuario || !usuario.consultas) return [];

      return usuario.consultas.map((consulta: any) => ({
        ...consulta,
        status: consulta.status || 'agendada'
      }));

    } catch (error) {
      console.error('Erro ao buscar consultas do usuário:', error);
      return [];
    }
  }

  // Mostrar modal de confirmação de cancelamento
  static showCancellationModal(
    consultaId: string,
    dataConsulta: string,
    horaConsulta: string,
    tipoConsulta: string,
    onConfirm: () => void
  ): void {
    const cancelCheck = this.canCancel(dataConsulta, horaConsulta);
    
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
          width: 90%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <h2 style="color: #dc2626; margin-bottom: 20px; text-align: center;">
            🚫 Cancelar Consulta
          </h2>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Data:</strong> ${dataConsulta}</p>
            <p><strong>Horário:</strong> ${horaConsulta}</p>
            <p><strong>Tipo:</strong> ${tipoConsulta}</p>
          </div>

          ${cancelCheck.canCancel ? `
            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; color: #92400e;">
                <strong>⚠️ Atenção:</strong> O cancelamento é definitivo e não pode ser desfeito.
              </p>
              <p style="margin: 10px 0 0 0; color: #92400e;">
                Você pode cancelar até: ${cancelCheck.timeRemaining} restantes
              </p>
            </div>

            <label for="motivo-cancelamento" style="display: block; margin-bottom: 10px; font-weight: bold;">
              Motivo do cancelamento (opcional):
            </label>
            <textarea 
              id="motivo-cancelamento" 
              placeholder="Ex: Conflito de agenda, emergência, etc."
              style="
                width: 100%; 
                padding: 10px; 
                border: 1px solid #d1d5db; 
                border-radius: 5px; 
                margin-bottom: 20px;
                resize: vertical;
                min-height: 80px;
                box-sizing: border-box;
              "
            ></textarea>

            <div style="text-align: center;">
              <button onclick="this.closest('div').style.display='none'" style="
                background: #6b7280; 
                color: white; 
                border: none; 
                padding: 12px 25px; 
                border-radius: 5px; 
                cursor: pointer;
                margin-right: 10px;
                font-weight: bold;
              ">
                Manter Consulta
              </button>
              <button id="confirm-cancel-btn" style="
                background: #dc2626; 
                color: white; 
                border: none; 
                padding: 12px 25px; 
                border-radius: 5px; 
                cursor: pointer;
                font-weight: bold;
              ">
                Confirmar Cancelamento
              </button>
            </div>
          ` : `
            <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; color: #991b1b;">
                <strong>❌ Cancelamento não permitido</strong>
              </p>
              <p style="margin: 10px 0 0 0; color: #991b1b;">
                ${cancelCheck.reason}
              </p>
            </div>

            <div style="text-align: center;">
              <button onclick="this.closest('div').style.display='none'" style="
                background: #2563eb; 
                color: white; 
                border: none; 
                padding: 12px 25px; 
                border-radius: 5px; 
                cursor: pointer;
                font-weight: bold;
              ">
                Entendi
              </button>
            </div>
          `}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);

    if (cancelCheck.canCancel) {
      const confirmBtn = modal.querySelector('#confirm-cancel-btn');
      confirmBtn?.addEventListener('click', async () => {
        const motivoTextarea = modal.querySelector('#motivo-cancelamento') as HTMLTextAreaElement;
        const motivo = motivoTextarea?.value || undefined;

        // Mostrar loading
        confirmBtn.textContent = 'Cancelando...';
        (confirmBtn as HTMLButtonElement).disabled = true;

        try {
          const result = await this.cancelAppointment(consultaId, motivo);
          
          if (result.success) {
            // Fechar modal
            document.body.removeChild(modal);
            
            // Mostrar sucesso
            this.showSuccessMessage(result.message, result.emailSent);
            
            // Chamar callback
            onConfirm();
          } else {
            // Mostrar erro
            alert('❌ ' + result.message);
            
            // Restaurar botão
            confirmBtn.textContent = 'Confirmar Cancelamento';
            (confirmBtn as HTMLButtonElement).disabled = false;
          }
        } catch (error) {
          console.error('Erro ao cancelar:', error);
          alert('❌ Erro interno. Tente novamente.');
          
          // Restaurar botão
          confirmBtn.textContent = 'Confirmar Cancelamento';
          (confirmBtn as HTMLButtonElement).disabled = false;
        }
      });
    }
  }

  // Mostrar mensagem de sucesso
  private static showSuccessMessage(message: string, emailSent?: boolean): void {
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
          max-width: 400px; 
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <h2 style="color: #059669; margin-bottom: 20px;">✅ Sucesso!</h2>
          <p style="margin-bottom: 15px;">${message}</p>
          ${emailSent ? `
            <p style="color: #059669; font-size: 14px; margin-bottom: 20px;">
              📧 Email de confirmação enviado!
            </p>
          ` : ''}
          <button onclick="this.closest('div').style.display='none'" style="
            background: #059669; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer;
            font-weight: bold;
          ">
            OK
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
}