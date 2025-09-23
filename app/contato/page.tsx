import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { LocationMap } from '../../components/LocationMap'
import { SecuritySeals } from '../../components/SecuritySeals'

const WHATS = 'https://wa.me/5511967381029?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento'

export default function ContatoPage() {
  const teamContacts = [
    {
      department: "Comercial - Vendas de Produtos",
      email: "comercial@veracare.com.br",
      description: "Catálogo de produtos, equipamentos profissionais e orçamentos",
      icon: "🛍️",
      color: "blue"
    },
    {
      department: "Atendimento - Recepção e Agendamento",
      email: "atendimento@veracare.com.br", 
      description: "Agendamento telefônico, informações sobre consultas",
      icon: "📞",
      color: "green"
    },
    {
      department: "Vendas - Revenda e Parcerias",
      email: "vendas@veracare.com.br",
      description: "Parcerias comerciais, revendas e contratos especiais",
      icon: "🤝", 
      color: "purple"
    },
    {
      department: "SAC - Atendimento ao Cliente",
      email: "sac@veracare.com.br",
      description: "Reclamações, sugestões e resolução de problemas",
      icon: "🎧",
      color: "orange"
    },
    {
      department: "Financeiro - Contas e Pagamentos",
      email: "financeiro@veracare.com.br",
      description: "Pagamentos, faturamento e questões financeiras",
      icon: "💰",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-700"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">📞 Entre em Contato</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos localizados na Zona Norte de São Paulo, no bairro Casa Verde. 
              Entre em contato conosco através dos canais especializados para um atendimento mais eficiente.
            </p>
          </div>

          {/* Informações Principais */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            
            {/* Contato Principal */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">📱</span>
                Contato Principal
              </h3>
              <div className="space-y-3">
                <div>
                  <strong>Telefone/WhatsApp:</strong><br />
                  <a href="tel:+5511967381029" className="text-blue-600 hover:underline">
                    (11) 96738-1029
                  </a>
                </div>
                <div>
                  <strong>Email Geral:</strong><br />
                  <a href="mailto:contato@veracare.com.br" className="text-blue-600 hover:underline">
                    contato@veracare.com.br
                  </a>
                </div>
                <div className="pt-3">
                  <a 
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors inline-flex items-center justify-center" 
                    href={WHATS} 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    💬 Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">📍</span>
                Nosso Endereço
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Rua Dias de Oliveira, 83</strong></p>
                <p>Casa Verde - Zona Norte</p>
                <p>São Paulo - SP</p>
                <p>CEP: 02519-200</p>
                <p className="text-sm text-gray-600 pt-2">
                  🚇 Próximo à Estação Santana (Linha 1-Azul)<br />
                  🛍️ Próximo ao Shopping Casa Verde
                </p>
              </div>
            </div>

            {/* Horários */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">🕒</span>
                Horários de Atendimento
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="font-medium">8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-medium">8h às 12h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-gray-500">Fechado</span>
                </div>
                <div className="pt-2 text-sm text-green-600">
                  <strong>📱 WhatsApp 24h</strong> para urgências
                </div>
              </div>
            </div>
          </div>

          {/* Contatos Especializados */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">📧 Contatos Especializados</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Para um atendimento mais rápido e eficiente, entre em contato diretamente com a equipe responsável pela sua necessidade:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamContacts.map((contact, index) => (
                <div key={index} className={`p-6 rounded-lg border-2 ${getColorClasses(contact.color)}`}>
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{contact.icon}</div>
                    <h3 className="font-bold text-sm">{contact.department}</h3>
                  </div>
                  
                  <div className="text-center mb-4">
                    <a 
                      href={`mailto:${contact.email}`}
                      className="font-mono text-sm hover:underline block mb-2"
                    >
                      {contact.email}
                    </a>
                    <p className="text-xs">{contact.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex-1 bg-white text-gray-700 px-3 py-2 rounded text-center text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      📧 Email
                    </a>
                    <a
                      href={`https://wa.me/5511967381029?text=Olá, gostaria de falar sobre ${contact.department.toLowerCase()}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-center text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão para Página da Equipe */}
          <div className="text-center mb-12">
            <a
              href="/equipe"
              className="bg-blue-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors inline-flex items-center"
            >
              👥 Conheça Nossa Equipe Completa
            </a>
          </div>

          {/* Mapa */}
          <div className="mb-12">
            <LocationMap />
          </div>

          {/* Selos de Segurança */}
          <div className="mb-12">
            <SecuritySeals />
          </div>

          {/* Call to Action Final */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">🎯 Pronto para Agendar?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para atendê-lo! Escolha a forma mais conveniente de entrar em contato.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/agendamento"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                📅 Agendar Online
              </a>
              <a
                href="tel:+5511967381029"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                📞 Ligar Agora
              </a>
              <a
                href={WHATS}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp Direto
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
