'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

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
  const [isExistingPatient, setIsExistingPatient] = useState<boolean | null>(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleExistingPatient = () => {
    setIsExistingPatient(true);
  };

  const handleNewPatient = () => {
    setIsExistingPatient(false);
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For existing patients, proceed to form or redirect to WhatsApp
    alert('Redirecionando para WhatsApp para confirmação.');
    window.open('https://wa.me/5511967381029?text=Olá, sou paciente existente e gostaria de agendar.', '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setError('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          service: '',
          message: '',
        });
      } else {
        const data = await res.json();
        setError(data.error || 'Erro ao agendar. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao agendar. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 flex flex-col lg:flex-row">
        <main className="flex-1 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Agendamento de Consulta</h1>

          {isExistingPatient === null && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Já é nosso paciente?</h2>
              <p className="mb-4">Para prosseguir com seu agendamento, precisamos confirmar se você já é nosso cliente.</p>
              <div className="space-x-4">
                <button
                  onClick={handleExistingPatient}
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
                >
                  Sim, já sou paciente
                </button>
                <button
                  onClick={handleNewPatient}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                  Não, primeiro agendamento
                </button>
              </div>
            </div>
          )}

          {isExistingPatient === true && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Confirme seu WhatsApp</h2>
              <form onSubmit={handleWhatsappSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número do WhatsApp (com DDD)</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-600"
                >
                  Prosseguir
                </button>
              </form>
            </div>
          )}

          {isExistingPatient === false && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Primeiro Agendamento</h2>
              <p className="mb-4">Preencha o formulário abaixo para agendar sua consulta.</p>

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Consulta agendada com sucesso! Entraremos em contato em breve.
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu nome completo"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Preferida</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    title="Selecione a data preferida"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Horário Preferido</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    title="Selecione o horário preferido"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Serviço</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    title="Selecione o serviço desejado"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mensagem (opcional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Adicione qualquer informação adicional"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sky-500 text-white px-5 py-3 rounded-md hover:bg-sky-600 disabled:opacity-50"
                >
                  {loading ? 'Agendando...' : 'Agendar Consulta'}
                </button>
              </form>
            </div>
          )}
        </main>

        <aside className="lg:w-1/3 px-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li><Link href="/quem-somos" className="text-sky-600 hover:underline">Quem Somos</Link></li>
              <li><Link href="/servicos" className="text-sky-600 hover:underline">Nossos Serviços</Link></li>
              <li><Link href="/contato" className="text-sky-600 hover:underline">Fale Conosco</Link></li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Nossos Horários</h3>
            <p>Segunda a Sexta: 08:00 às 18:00</p>
            <p>Sábados: 08:00 às 16:00</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <p>Endereço: Rua Dias de Oliveira, 83 – Próximo ao terminal Casa Verde</p>
            <p>Telefone: (11) 96738-1029</p>
            <div className="mt-4">
              <a href="https://wa.me/5511967381029" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}
