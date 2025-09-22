'use client';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Política de Privacidade e Segurança</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Sua privacidade e a segurança dos seus dados são nossas prioridades. 
              Conheça como protegemos e utilizamos suas informações.
            </p>
            <div className="mt-6 text-sm opacity-80">
              Última atualização: 21 de setembro de 2025
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              
              {/* Introdução */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">🛡️</span>
                  Compromisso com a Privacidade
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  A Veracare está comprometida com a proteção da privacidade e dados pessoais de nossos usuários, 
                  pacientes e clientes, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) 
                  e demais regulamentações aplicáveis.
                </p>
              </div>

              {/* Dados Coletados */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">📊</span>
                  Dados Que Coletamos
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Dados de Identificação:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nome completo</li>
                      <li>• E-mail</li>
                      <li>• Telefone/WhatsApp</li>
                      <li>• Data de nascimento</li>
                      <li>• Endereço completo</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Dados de Saúde (quando aplicável):</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Histórico médico podológico</li>
                      <li>• Alergias e restrições</li>
                      <li>• Tratamentos realizados</li>
                      <li>• Prescrições e recomendações</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Dados de Navegação:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Endereço IP</li>
                      <li>• Dados do dispositivo</li>
                      <li>• Histórico de navegação no site</li>
                      <li>• Preferências de produtos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finalidades */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-purple-600 mr-2">🎯</span>
                  Como Utilizamos Seus Dados
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Atendimento Médico:</h3>
                    <p className="text-sm text-blue-700">
                      Agendamento de consultas, histórico médico, 
                      acompanhamento de tratamentos e comunicação com pacientes.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Vendas de Produtos:</h3>
                    <p className="text-sm text-green-700">
                      Processamento de pedidos, entrega de produtos, 
                      comunicação sobre compras e suporte ao cliente.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Comunicação:</h3>
                    <p className="text-sm text-purple-700">
                      Envio de confirmações, lembretes de consulta, 
                      novidades sobre produtos e serviços.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Melhorias:</h3>
                    <p className="text-sm text-orange-700">
                      Análise de uso do site, personalização da experiência 
                      e desenvolvimento de novos serviços.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compartilhamento */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-red-600 mr-2">🤝</span>
                  Compartilhamento de Dados
                </h2>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-red-800 font-medium mb-2">
                    ⚠️ Nunca vendemos ou alugamos seus dados pessoais para terceiros.
                  </p>
                  <p className="text-red-700 text-sm">
                    Compartilhamos dados apenas quando necessário para:
                  </p>
                  <ul className="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Processamento de pagamentos (instituições financeiras)</li>
                    <li>• Entrega de produtos (transportadoras)</li>
                    <li>• Cumprimento de obrigações legais</li>
                    <li>• Proteção de direitos e segurança</li>
                  </ul>
                </div>
              </div>

              {/* Segurança */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-indigo-600 mr-2">🔒</span>
                  Segurança da Informação
                </h2>
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h3 className="font-semibold text-indigo-800 mb-2">Medidas Técnicas:</h3>
                    <ul className="text-sm text-indigo-700 space-y-1">
                      <li>• Criptografia SSL/TLS para transmissão de dados</li>
                      <li>• Armazenamento seguro com backup regular</li>
                      <li>• Controle de acesso baseado em funções</li>
                      <li>• Monitoramento contínuo de segurança</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h3 className="font-semibold text-indigo-800 mb-2">Medidas Organizacionais:</h3>
                    <ul className="text-sm text-indigo-700 space-y-1">
                      <li>• Treinamento regular da equipe em proteção de dados</li>
                      <li>• Políticas internas de segurança</li>
                      <li>• Auditoria periódica dos processos</li>
                      <li>• Plano de resposta a incidentes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Direitos dos Usuários */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-yellow-600 mr-2">⚖️</span>
                  Seus Direitos
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <p className="text-yellow-800 font-medium mb-4">
                    Conforme a LGPD, você tem os seguintes direitos:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Direitos de Acesso:</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• Confirmação de tratamento de dados</li>
                        <li>• Acesso aos dados pessoais</li>
                        <li>• Correção de dados incompletos</li>
                        <li>• Anonimização ou eliminação</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Direitos de Controle:</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• Portabilidade dos dados</li>
                        <li>• Informação sobre compartilhamento</li>
                        <li>• Revogação do consentimento</li>
                        <li>• Revisão de decisões automatizadas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retenção */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-teal-600 mr-2">⏰</span>
                  Retenção de Dados
                </h2>
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <p className="text-teal-800 mb-3">
                    Mantemos seus dados apenas pelo tempo necessário para:
                  </p>
                  <div className="space-y-2 text-sm text-teal-700">
                    <div>• <strong>Dados médicos:</strong> 20 anos (conforme resolução CFM)</div>
                    <div>• <strong>Dados comerciais:</strong> 5 anos (prazo legal)</div>
                    <div>• <strong>Dados de navegação:</strong> 12 meses</div>
                    <div>• <strong>Comunicações:</strong> até revogação do consentimento</div>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-orange-600 mr-2">🍪</span>
                  Política de Cookies
                </h2>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-orange-800 mb-3">
                    Utilizamos cookies para melhorar sua experiência:
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <div>• <strong>Cookies essenciais:</strong> Funcionamento básico do site</div>
                    <div>• <strong>Cookies de preferência:</strong> Lembrança de configurações</div>
                    <div>• <strong>Cookies analíticos:</strong> Estatísticas de uso</div>
                    <div>• <strong>Cookies de marketing:</strong> Personalização de conteúdo</div>
                  </div>
                  <p className="text-orange-800 text-sm mt-3">
                    Você pode gerenciar suas preferências de cookies nas configurações do navegador.
                  </p>
                </div>
              </div>

              {/* Contato DPO */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">📞</span>
                  Contato para Questões de Privacidade
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-800 mb-2">Encarregado de Proteção de Dados (DPO)</h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div>📧 Email: dpo@veracare.com.br</div>
                      <div>📱 WhatsApp: (11) 96738-1029</div>
                      <div>📍 Endereço: Rua da Privacidade, 123 - São Paulo/SP</div>
                    </div>
                    <p className="text-blue-800 text-sm mt-4">
                      Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, 
                      entre em contato conosco. Responderemos em até 15 dias úteis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alterações */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-gray-600 mr-2">📝</span>
                  Alterações nesta Política
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    Esta política pode ser atualizada periodicamente. Alterações significativas serão 
                    comunicadas por email e através de aviso em nosso site. A versão atualizada 
                    entrará em vigor após 30 dias da publicação.
                  </p>
                </div>
              </div>

              {/* Consentimento */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3">Consentimento</h3>
                <p className="text-sm opacity-90">
                  Ao utilizar nossos serviços, você declara ter lido, compreendido e concordado 
                  com esta Política de Privacidade e com o tratamento de seus dados pessoais 
                  conforme descrito.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}