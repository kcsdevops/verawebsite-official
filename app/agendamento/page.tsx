'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Calendar } from '../../components/Calendar';
import { schedulingEngine } from '../../utils/schedulingEngine';
import { confirmationService, ConfirmationData } from '../../utils/confirmationService';
import { EmailNotificationService } from '../../utils/emailNotificationService';

interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface Consulta {
  id: string;
  data: string;
  hora: string;
  tipo: string;
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
  usuarioId: string;
}

export default function AgendamentoPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  const services = [
    'Consulta Geral Podológica',
    'Tratamento de Onicomicose (Micose)',
    'Onicotomia (Corte e Manutenção das Unhas)',
    'Tratamento de Fissuras nos Pés',
    'Onicocriptose (Unha Encravada)',
    'Remoção de Verrugas Plantares',
    'Remoção de Calos e Calosidades',
    'Reflexologia Podal',
    'Podoprofilaxia Preventiva',
  ];

  useEffect(() => {
    // Verificar se usuário está logado
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      router.push('/login');
      return;
    }

    try {
      const dadosUsuario = JSON.parse(usuarioLogado);
      setUsuario(dadosUsuario);
      loadAvailabilityData();
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const loadAvailabilityData = () => {
    const existingAppointments = getAllExistingAppointments();
    const summary = schedulingEngine.getAvailabilitySummary(30, existingAppointments);
    setAvailabilityData(summary);
  };

  const getAllExistingAppointments = (): Consulta[] => {
    try {
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const allConsultas: Consulta[] = [];
      
      usuarios.forEach((user: any) => {
        if (user.prontuario && user.prontuario.consultas) {
          const consultasDoUsuario = user.prontuario.consultas.filter((consulta: Consulta) => 
            consulta.status === 'agendada'
          );
          allConsultas.push(...consultasDoUsuario);
        }
      });
      
      return allConsultas;
    } catch (error) {
      console.error('Erro ao buscar agendamentos existentes:', error);
      return [];
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setSuggestions([]);
    
    // Load available slots for the selected date
    const existingAppointments = getAllExistingAppointments();
    const slots = schedulingEngine.generateSlotsForDate(date, existingAppointments);
    setAvailableSlots(slots);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService || !usuario) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Verificar se horário ainda está disponível
      const existingAppointments = getAllExistingAppointments();
      const isStillAvailable = schedulingEngine.isSlotAvailable(selectedDate, selectedTime, existingAppointments);
      
      if (!isStillAvailable) {
        // Offer alternatives
        const alternatives = schedulingEngine.getSuggestedAlternatives(
          selectedDate, 
          selectedTime, 
          existingAppointments, 
          3
        );
        setSuggestions(alternatives);
        alert('Este horário não está mais disponível. Veja as sugestões abaixo.');
        setIsSubmitting(false);
        return;
      }

      // Buscar dados completos do usuário
      const usuarios = JSON.parse(localStorage.getItem('veracare_usuarios') || '[]');
      const usuarioIndex = usuarios.findIndex((u: any) => u.id === usuario.id);
      
      if (usuarioIndex === -1) {
        throw new Error('Usuário não encontrado');
      }

      // Criar nova consulta
      const novaConsulta: Consulta = {
        id: Date.now().toString(),
        data: selectedDate,
        hora: selectedTime,
        tipo: selectedService,
        observacoes: observacoes,
        status: 'agendada',
        usuarioId: usuario.id
      };

      // Adicionar consulta ao prontuário do usuário
      if (!usuarios[usuarioIndex].prontuario) {
        usuarios[usuarioIndex].prontuario = { historico: [], exames: [], consultas: [] };
      }
      
      usuarios[usuarioIndex].prontuario.consultas.push(novaConsulta);
      
      // Salvar no localStorage
      localStorage.setItem('veracare_usuarios', JSON.stringify(usuarios));

      // Buscar dados completos do usuário para confirmação
      const usuarioCompleto = usuarios[usuarioIndex];

      // Preparar dados para confirmação automática
      const confirmationData: ConfirmationData = {
        consulta: {
          id: novaConsulta.id,
          data: novaConsulta.data,
          hora: novaConsulta.hora,
          tipo: novaConsulta.tipo,
          observacoes: novaConsulta.observacoes
        },
        usuario: {
          nome: usuarioCompleto.nome,
          email: usuarioCompleto.email,
          telefone: usuarioCompleto.telefone
        }
      };

      // Processar confirmação automática
      confirmationService.processAutomaticConfirmation(confirmationData);

      // Enviar email de confirmação de agendamento
      try {
        await EmailNotificationService.sendAppointmentConfirmation(
          {
            id: novaConsulta.id,
            data: novaConsulta.data,
            hora: novaConsulta.hora,
            tipo: novaConsulta.tipo,
            observacoes: novaConsulta.observacoes
          },
          {
            nome: usuarioCompleto.nome,
            email: usuarioCompleto.email,
            telefone: usuarioCompleto.telefone
          }
        );
      } catch (error) {
        console.error('Erro ao enviar email de confirmação:', error);
        // Não interromper o fluxo por erro de email
      }

      // Mostrar sucesso
      setSuccess(true);
      
      // Limpar formulário
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService('');
      setObservacoes('');
      setAvailableSlots([]);
      
      // Recarregar dados de disponibilidade
      loadAvailabilityData();

      // Scroll para o topo para mostrar mensagem de sucesso
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Auto redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      alert('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    setSelectedDate(suggestion.date);
    setSelectedTime(suggestion.time);
    setSuggestions([]);
    
    // Load slots for the suggested date
    const existingAppointments = getAllExistingAppointments();
    const slots = schedulingEngine.generateSlotsForDate(suggestion.date, existingAppointments);
    setAvailableSlots(slots);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando sistema de agendamento...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Agendamento Inteligente</h1>
            <p className="text-gray-600">
              Olá, <strong>{usuario?.nome}</strong>! Use nosso sistema automatizado para agendar sua consulta.
            </p>
          </div>

          {/* Mensagem de Sucesso */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold">Consulta Agendada Automaticamente!</h3>
                  <p className="text-sm">
                    Seu agendamento foi confirmado. Redirecionando para o painel em 3 segundos...
                    <br />
                    <a href="/dashboard" className="underline font-medium">Clique aqui para ir agora</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sugestões de Horários Alternativos */}
          {suggestions.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-4">Horário Indisponível - Sugestões Automáticas:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="bg-white border border-yellow-300 rounded-lg p-4 text-left hover:bg-yellow-50 transition-colors"
                  >
                    <div className="font-medium text-yellow-800">
                      {new Date(suggestion.date).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'short'
                      })}
                    </div>
                    <div className="text-yellow-700">{suggestion.time}</div>
                    <div className="text-sm text-yellow-600 mt-1">{suggestion.reason}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calendar - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Calendário Inteligente
                </h3>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availabilityData={availabilityData}
                  minDate={new Date().toISOString().split('T')[0]}
                  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Horários - 1 column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horários Disponíveis
              </h3>
              
              {!selectedDate ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">Selecione uma data no calendário</p>
                </div>
              ) : availableSlots.filter(slot => slot.available).length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-500 font-medium">Sem horários disponíveis</p>
                  <p className="text-gray-500 text-sm mt-2">Tente outra data</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <div className="text-sm text-gray-600 mb-3">
                    Data selecionada: <strong>{new Date(selectedDate).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      day: 'numeric',
                      month: 'long'
                    })}</strong>
                  </div>
                  {availableSlots.filter(slot => slot.available).map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={`w-full p-3 text-left rounded-md border transition-colors ${
                        selectedTime === slot.time
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{slot.time}</span>
                        {selectedTime === slot.time && (
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Formulário - 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Detalhes da Consulta
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Serviço *</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    title="Selecione o tipo de serviço desejado"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Observações e Sintomas</label>
                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Descreva seus sintomas, dores ou informações que possam ajudar no atendimento..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                {/* Resumo */}
                {selectedDate && selectedTime && selectedService && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Resumo do Agendamento:
                    </h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Data:</span>
                        <span>{new Date(selectedDate).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Horário:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Serviço:</span>
                        <span className="text-right">{selectedService}</span>
                      </div>
                      <div className="pt-2 border-t border-blue-200">
                        <span className="font-medium">Status:</span> Será confirmado automaticamente
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !selectedService || isSubmitting}
                  className={`w-full py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center ${
                    selectedDate && selectedTime && selectedService && !isSubmitting
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Agendando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Confirmar Agendamento Automático
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Informações do Sistema */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">🤖 Sistema de Agendamento Inteligente</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-blue-700 mb-2">Recursos Automáticos:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• Detecção automática de horários disponíveis</li>
                  <li>• Verificação de conflitos em tempo real</li>
                  <li>• Sugestões inteligentes de alternatives</li>
                  <li>• Controle de feriados e pausas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-700 mb-2">Horários de Funcionamento:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Segunda a Sexta: 08:00 às 18:00</li>
                  <li>• Pausa para almoço: 12:00 às 13:00</li>
                  <li>• Sábados: 08:00 às 16:00</li>
                  <li>• Domingos: Fechado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-700 mb-2">Orientações:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• Agendamento confirmado automaticamente</li>
                  <li>• Chegue 10 minutos antes</li>
                  <li>• Cancelamentos com 24h de antecedência</li>
                  <li>• Documento com foto obrigatório</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}