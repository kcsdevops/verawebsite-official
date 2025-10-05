'use client';

import { useState } from 'react';
import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';

const services = [
  'Tratamento de onicomicose (micose)',
  'Onicotomia (corte e manutenção das unhas)',
  'Tratamento de fissuras (rachaduras nos pés)',
  'Onicocriptose (unha encravada)',
  'Remoção e tratamento de verruga plantar (olho de peixe)',
  'Remoção de calos e calosidades',
  'Reflexologia Podal',
  'Podoprofilaxia (Podologia Preventiva)',
];

export default function AgendaPage() {
  const [selectedService, setSelectedService] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isExistingPatient, setIsExistingPatient] = useState<boolean | null>(null);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleExistingPatient = () => {
    setIsExistingPatient(true);
  };

  const handleNewPatient = () => {
    setIsExistingPatient(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      alert('Por favor, selecione um serviço.');
      return;
    }

    // Gerar mensagem para WhatsApp
    const dataFormatada = preferredDate ? 
      new Date(preferredDate).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'A combinar';

    const tipoCliente = isExistingPatient ? 'Paciente Existente' : 'Novo Paciente';

    const mensagem = `🏥 *VERACARE - Agendamento*

Olá! Gostaria de agendar uma consulta:

👤 *Tipo:* ${tipoCliente}
🩺 *Serviço:* ${selectedService}
📅 *Data Preferida:* ${dataFormatada}
⏰ *Horário Preferido:* ${preferredTime || 'A combinar'}

${observacoes ? `📝 *Observações:* ${observacoes}` : ''}

Por favor, confirme a disponibilidade e finalize o agendamento.

Obrigado!`;

    const whatsappUrl = `https://wa.me/5511967381029?text=${encodeURIComponent(mensagem)}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">📅 Agendamento de Consulta</h1>
            <p className="text-gray-600">
              Preencha os dados abaixo e finalize seu agendamento pelo WhatsApp.
            </p>
          </div>

          {/* Seleção de Tipo de Paciente */}
          {isExistingPatient === null && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Já é nosso paciente?</h2>
                <p className="text-gray-600 mb-6">
                  Para prosseguir com seu agendamento, informe se você já é nosso cliente.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleExistingPatient}
                    className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
                  >
                    ✅ Sim, já sou paciente
                  </button>
                  <button
                    onClick={handleNewPatient}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    👤 Não, sou novo paciente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Formulário */}
          {isExistingPatient !== null && (
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Status do Paciente */}
              <div className="bg-gray-50 rounded-lg p-4 border mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Status do Paciente
                </h3>
                <p className="text-gray-700">
                  {isExistingPatient ? '✅ Paciente Existente' : '👤 Novo Paciente'}
                </p>
                <button
                  onClick={() => setIsExistingPatient(null)}
                  className="text-blue-500 text-sm underline mt-2"
                >
                  Alterar
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Tipo de Serviço */}
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Tipo de Serviço *
                  </label>
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

                {/* Data e Hora Preferidas */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Data Preferida
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      title="Selecione sua data preferida"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Deixe em branco se quiser combinar pelo WhatsApp</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Horário Preferido
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      title="Selecione seu horário preferido"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione um horário</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Deixe em branco se quiser combinar pelo WhatsApp</p>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Observações e Sintomas
                  </label>
                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Descreva seus sintomas, dores ou informações que possam ajudar no atendimento..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                {/* Info do WhatsApp */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-green-800">Finalização pelo WhatsApp</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Ao clicar em "Continuar pelo WhatsApp", você será redirecionado para nosso WhatsApp com uma mensagem pré-preenchida. 
                        Nossa equipe confirmará a disponibilidade e finalizará seu agendamento.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão de Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Continuar pelo WhatsApp
                  </button>
                </div>

                {/* Informações de Contato */}
                <div className="border-t pt-6 mt-6">
                  <div className="text-center text-gray-600">
                    <h4 className="font-semibold mb-2">📞 Informações de Contato</h4>
                    <p className="text-sm">
                      <strong>Telefone:</strong> (11) 96738-1029<br />
                      <strong>Endereço:</strong> Rua Dias de Oliveira, 83 – Casa Verde
                    </p>
                  </div>
                </div>

              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

