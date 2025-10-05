'use client';

import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';

export default function AgendamentoAvancadoPage() {
  const handleWhatsAppRedirect = () => {
    const mensagem = `🏥 *VERACARE - Agendamento Avançado*

Olá! Gostaria de agendar uma consulta com opções avançadas:

📋 *Tipo:* Agendamento Avançado
📍 *Local:* Rua Dias de Oliveira, 83 – Casa Verde
📞 *Telefone:* (11) 96738-1029

Por favor, me ajude com as opções de agendamento avançado disponíveis.

Obrigado!`;

    const whatsappUrl = `https://wa.me/5511967381029?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />
      <main className="min-h-[80vh] container py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">⚡ Agendamento Avançado</h1>
            <p className="text-gray-600">
              Opções avançadas de agendamento com funcionalidades especiais e atendimento personalizado.
            </p>
          </div>

          {/* Card Principal */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            
            {/* Features do Agendamento Avançado */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recursos Avançados
                </h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Agendamento prioritário</li>
                  <li>• Consultas especializadas</li>
                  <li>• Horários flexíveis</li>
                  <li>• Atendimento personalizado</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Disponibilidade
                </h3>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• Segunda a Sexta: 8h às 18h</li>
                  <li>• Sábado: 8h às 12h</li>
                  <li>• Urgências: WhatsApp</li>
                  <li>• Remarcações facilitadas</li>
                </ul>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Informações de Contato
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">📞 Telefone:</span>
                  <span>(11) 96738-1029</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">📍 Endereço:</span>
                  <span>Rua Dias de Oliveira, 83 – Casa Verde</span>
                </div>
              </div>
            </div>

            {/* Aviso sobre Sistema em Desenvolvimento */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-yellow-800">Sistema em Desenvolvimento</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    O sistema de agendamento avançado está sendo aprimorado. No momento, utilize o WhatsApp 
                    para agendar consultas com recursos especiais e atendimento personalizado.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão WhatsApp */}
            <div className="text-center">
              <button 
                onClick={handleWhatsAppRedirect}
                className="bg-green-500 text-white px-8 py-4 rounded-md font-semibold hover:bg-green-600 transition-colors inline-flex items-center text-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Agendar pelo WhatsApp
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              Nossa equipe especializada responderá rapidamente para configurar seu agendamento avançado.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

