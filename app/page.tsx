'use client';

import Link from 'next/link'
import { Header } from '../src/components/ui/Header'
import { Footer } from '../src/components/ui/Footer'
import WhatsAppPopup from '../src/components/ui/WhatsAppPopup'
import ProfessionalImage from '../src/components/ui/ProfessionalImage'
import AnimatedText from '../src/components/animations/AnimatedText'
import FadeInOnScroll from '../src/components/animations/FadeInOnScroll'
import HeroBanner from '../src/components/ui/HeroBanner'

const WHATS = 'https://wa.me/5511967381029?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento'

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      <main>
        <section className="py-16 bg-gray-50">
          <div className="container">
            <FadeInOnScroll>
              <AnimatedText 
                text="Por que escolher a Veracare?"
                className="text-3xl font-bold text-center mb-12 text-gradient-blue"
                type="fadeIn"
              />
            </FadeInOnScroll>
            <div className="grid md:grid-cols-3 gap-8">
              <FadeInOnScroll delay={200} direction="left">
                <div className="text-center bg-white p-8 rounded-lg shadow-md hover-scale smooth-transition">
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                      alt="Profissional cuidando dos pés" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Qualidade Garantida</h3>
                  <p>Somos especialistas em cuidar dos seus pés com tratamentos eficazes e seguros, utilizando técnicas modernas e equipamentos de ponta.</p>
                </div>
              </FadeInOnScroll>
              <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                    alt="Atendimento rápido e eficiente" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Agilidade no Atendimento</h3>
                <p>Aqui você encontra agilidade no seu agendamento para agilizar a sua consulta, com horários flexíveis e atendimento pontual.</p>
              </div>
              <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                    alt="Cuidado personalizado" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">Cuidado Personalizado</h3>
                <p>Cada paciente é único. Oferecemos atendimento humanizado e focado nas necessidades individuais de cada pessoa.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Cuidando da saúde dos seus pés com excelência!</h2>
                <p className="text-lg mb-6">
                  Na Veracare, nossa missão é proporcionar saúde, bem-estar e conforto aos seus pés através de tratamentos preventivos e curativos,
                  sempre com profissionalismo e dedicação.
                </p>
                <p className="text-gray-600 mb-8">
                  Nossa equipe especializada utiliza as melhores técnicas e produtos para garantir que você tenha pés saudáveis e bonitos.
                </p>
                <Link className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-blue-700" href="/servicos">
                  Conheça Nossos Serviços
                </Link>
              </div>
              <div className="order-first md:order-last">
                <div className="relative">
                  <ProfessionalImage 
                    size="large"
                    className="object-cover rounded-lg shadow-lg"
                    alt="Veralucia Trindade Santos - Podóloga Especialista"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">Veralucia Trindade Santos</h3>
                    <p className="text-sm text-gray-600">Podóloga Especialista</p>
                    <p className="text-xs text-gray-500 mt-1">Ampla experiência em cuidados podológicos especializados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção da Profissional */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-8">Conheça Nossa Especialista</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <div className="relative">
                      <ProfessionalImage 
                        size="medium"
                        className="mx-auto object-cover rounded-full border-4 border-blue-200 shadow-lg"
                        alt="Veralucia Trindade Santos - Podóloga"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Veralucia Trindade Santos</h3>
                    <p className="text-blue-600 font-semibold mb-4">Podóloga Especialista</p>
                    <p className="text-gray-600 mb-4">
                      "Dedicada aos cuidados podológicos, minha missão é proporcionar saúde, 
                      bem-estar e conforto aos meus pacientes através de tratamentos personalizados e técnicas modernas."
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">✨ Ampla experiência</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">🎓 Especialista certificada</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">💯 Atendimento humanizado</span>
                    </div>
                    <Link 
                      href="/quem-somos" 
                      className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Saiba mais sobre mim
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Cases de Sucesso */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cases de Sucesso Reais</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja os resultados excepcionais de nossos tratamentos especializados em podologia
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Case 1 - Unhas Encravadas */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/cases/unha-encravada-procedimento.jpg" 
                    alt="Tratamento de Unha Encravada - Espicolectomia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    ✓ Curado
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Espicolectomia
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Unhas Encravadas Severas</h3>
                  <p className="text-gray-600 mb-4">Correção definitiva com fenolização</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>• Taxa de sucesso: 95%</p>
                    <p>• Recuperação: 48h</p>
                  </div>
                  <Link 
                    href="/cases-de-sucesso#case-1"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </div>

              {/* Case 2 - Micose */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/cases/onicomicose-tratamento.jpg" 
                    alt="Tratamento de Onicomicose - Eliminação de Fungos"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    ✓ Recuperado
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Onicomicose
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Onicomicose Severa</h3>
                  <p className="text-gray-600 mb-4">Eliminação completa de fungos</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>• Unha 100% regenerada</p>
                    <p>• Sem recidiva</p>
                  </div>
                  <Link 
                    href="/cases-de-sucesso#case-2"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </div>

              {/* Case 3 - Calosidades */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/cases/calosidades-procedimento.jpg" 
                    alt="Remoção de Calosidades e Hiperqueratoses"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    ✓ Restaurado
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Calosidades
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Remoção de Calosidades</h3>
                  <p className="text-gray-600 mb-4">Debridamento seguro e eficaz</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>• Alívio imediato da dor</p>
                    <p>• Pele restaurada</p>
                  </div>
                  <Link 
                    href="/cases-de-sucesso#case-4"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/cases-de-sucesso"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver Todos os Cases de Sucesso
              </Link>
            </div>
          </div>
        </section>

        {/* Seção do Consultório e Equipamentos */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nosso Consultório Moderno</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ambiente profissional equipado com tecnologia de ponta para oferecer o melhor atendimento podológico
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Equipamentos Modernos & Ambiente Higienizado</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Equipamentos Esterilizados</h4>
                      <p className="text-gray-600">Todos os instrumentos passam por rigoroso processo de esterilização</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tecnologia Avançada</h4>
                      <p className="text-gray-600">Utilizamos equipamentos modernos para tratamentos mais eficazes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Ambiente Acolhedor</h4>
                      <p className="text-gray-600">Espaço limpo, organizado e confortável para seu bem-estar</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href={WHATS}
                    className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                    </svg>
                    Agendar Visita ao Consultório
                  </Link>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                    <ProfessionalImage 
                      size="large"
                      className="w-full h-96 object-cover rounded-xl"
                      alt="Consultório Veracare - Ambiente moderno com equipamentos profissionais de podologia"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                      <h4 className="font-bold text-gray-800 mb-1">Consultório Veracare</h4>
                      <p className="text-sm text-gray-600">Ambiente moderno e profissional</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          ⭐⭐⭐⭐⭐
                        </div>
                        <span className="text-xs text-gray-500 ml-2">Equipamentos de última geração</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-center">Se Inscreva na Newsletter</h3>
              <p className="text-center mb-6">Receba dicas de cuidados com os pés e novidades da Veracare.</p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppPopup />
      <Footer />
    </>
  )
}
