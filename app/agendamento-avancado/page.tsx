'use client';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function AgendamentoAvancadoPage() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] container py-10">
        <h1 className="text-3xl font-bold mb-6">Agendamento Avançado</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg mb-6">
            Sistema de agendamento em desenvolvimento. Em breve você poderá agendar consultas
            de forma mais detalhada e personalizada.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">📞 Telefone:</span>
              <span>(11) 96738-1029</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">📍 Endereço:</span>
              <span>Rua Dias de Oliveira, 83 – Casa Verde</span>
            </div>
            <div className="mt-6">
              <a 
                href="https://wa.me/5511967381029?text=Olá, gostaria de agendar uma consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600"
              >
                Agendar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
