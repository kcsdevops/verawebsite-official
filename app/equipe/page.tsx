'use client';

import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';

interface TeamMember {
  name: string;
  role: string;
  email: string;
  description: string;
  responsibilities: string[];
  icon: string;
  color: string;
}

export default function EquipePage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Equipe Comercial",
      role: "Vendas de Produtos",
      email: "comercial@veracare.com.br",
      description: "Especializada na venda de produtos podológicos e equipamentos profissionais.",
      responsibilities: [
        "Vendas de produtos podológicos",
        "Consultoria em equipamentos",
        "Orçamentos personalizados",
        "Catálogo de produtos",
        "Suporte pós-venda"
      ],
      icon: "🛍️",
      color: "blue"
    },
    {
      name: "Equipe Atendimento",
      role: "Recepção e Agendamento",
      email: "atendimento@veracare.com.br",
      description: "Responsável pelo atendimento telefônico e agendamento de consultas.",
      responsibilities: [
        "Agendamento por telefone",
        "Recepção de pacientes",
        "Informações sobre consultas",
        "Reagendamento de horários",
        "Suporte geral aos pacientes"
      ],
      icon: "📞",
      color: "green"
    },
    {
      name: "Equipe Vendas",
      role: "Revenda e Parcerias",
      email: "vendas@veracare.com.br",
      description: "Focada em parcerias comerciais, revendas e relacionamento B2B.",
      responsibilities: [
        "Parcerias estratégicas",
        "Programas de revenda",
        "Vendas corporativas",
        "Contratos especiais",
        "Relacionamento B2B"
      ],
      icon: "🤝",
      color: "purple"
    },
    {
      name: "Equipe SAC",
      role: "Atendimento ao Cliente",
      email: "sac@veracare.com.br",
      description: "Dedicada ao atendimento de reclamações, sugestões e melhorias.",
      responsibilities: [
        "Reclamações e dúvidas",
        "Sugestões de melhoria",
        "Resolução de problemas",
        "Feedback dos clientes",
        "Qualidade do atendimento"
      ],
      icon: "🎧",
      color: "orange"
    },
    {
      name: "Equipe Financeiro",
      role: "Contas e Pagamentos",
      email: "financeiro@veracare.com.br",
      description: "Responsável pela gestão financeira, contas e processamento de pagamentos.",
      responsibilities: [
        "Processamento de pagamentos",
        "Controle de contas",
        "Faturamento",
        "Negociação de débitos",
        "Relatórios financeiros"
      ],
      icon: "💰",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 border-gray-200 text-gray-800";
  };

  const getButtonColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-500 hover:bg-blue-600",
      green: "bg-green-500 hover:bg-green-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      orange: "bg-orange-500 hover:bg-orange-600",
      indigo: "bg-indigo-500 hover:bg-indigo-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-500 hover:bg-gray-600";
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">👥 Nossa Equipe Especializada</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossos times dedicados e os canais de comunicação específicos para cada tipo de atendimento. 
              Cada equipe é especializada para oferecer o melhor suporte em sua área.
            </p>
          </div>

          {/* Informações Gerais */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-12 border">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">📧 Contatos Especializados</h2>
              <p className="text-gray-700 mb-6">
                Para um atendimento mais eficiente, entre em contato diretamente com a equipe responsável pela sua necessidade:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>🛍️ Produtos:</strong><br />
                  comercial@veracare.com.br
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>📞 Agendamento:</strong><br />
                  atendimento@veracare.com.br
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>🤝 Parcerias:</strong><br />
                  vendas@veracare.com.br
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>🎧 Suporte:</strong><br />
                  sac@veracare.com.br
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>💰 Financeiro:</strong><br />
                  financeiro@veracare.com.br
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong>📱 WhatsApp:</strong><br />
                  (11) 96738-1029
                </div>
              </div>
            </div>
          </div>

          {/* Cards das Equipes */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className={`rounded-lg p-6 border-2 ${getColorClasses(member.color)}`}>
                <div className="flex items-start mb-4">
                  <div className="text-4xl mr-4">{member.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="font-medium mb-2">{member.role}</p>
                    <p className="text-sm mb-3">{member.description}</p>
                    
                    <div className="bg-white/70 rounded-lg p-3 mb-4">
                      <strong className="text-sm">📧 Email:</strong>
                      <br />
                      <a 
                        href={`mailto:${member.email}`}
                        className="font-mono text-sm hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Responsabilidades:</h4>
                  <ul className="text-sm space-y-1">
                    {member.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-xs mr-2">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${member.email}`}
                    className={`text-white px-4 py-2 rounded-md font-medium transition-colors text-sm ${getButtonColorClasses(member.color)}`}
                  >
                    📧 Enviar Email
                  </a>
                  <a
                    href={`https://wa.me/5511967381029?text=Olá, gostaria de falar com a ${member.name} sobre ${member.role.toLowerCase()}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors text-sm"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Horários de Atendimento */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🕒 Horários de Atendimento</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📞</span>
                  Atendimento Telefônico
                </h3>
                <div className="space-y-2 text-sm">
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
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📧</span>
                  Resposta por Email
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tempo de resposta:</span>
                    <span className="font-medium">até 24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgências:</span>
                    <span className="font-medium">WhatsApp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finais de semana:</span>
                    <span className="text-gray-500">48h úteis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">🎯 Atendimento Especializado</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Cada canal foi criado para oferecer o melhor atendimento na sua área específica. 
              Escolha o contato certo e tenha uma experiência mais eficiente!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contato"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                📞 Ver Todos os Contatos
              </a>
              <a
                href="https://wa.me/5511967381029?text=Olá, gostaria de mais informações sobre os serviços da Veracare."
                target="_blank"
                rel="noopener noreferrer"
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
  );
}
