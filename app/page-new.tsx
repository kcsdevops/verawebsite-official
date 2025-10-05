'use client';

import Link from 'next/link';
import AnimatedText from '../src/components/animations/AnimatedText';
import FadeInOnScroll from '../src/components/animations/FadeInOnScroll';
import FloatingElement from '../src/components/animations/FloatingElement';
import { useIntersectionObserver, useCountUp } from '../src/hooks/useAnimations';
import { Header } from '../src/components/ui/Header';
import { Footer } from '../src/components/ui/Footer';
import WhatsAppPopup from '../src/components/ui/WhatsAppPopup';
import ProfessionalImage from '../src/components/ui/ProfessionalImage';
import { useEffect } from 'react';

const WHATS = 'https://wa.me/5511967381029?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento';

export default function HomePage() {
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.5 });
  const { count: patientsCount, startAnimation: startPatientsCount } = useCountUp(500, 0, 2000);
  const { count: experienceCount, startAnimation: startExperienceCount } = useCountUp(100, 0, 2000, 300);
  const { count: satisfactionCount, startAnimation: startSatisfactionCount } = useCountUp(98, 0, 2000, 600);

  useEffect(() => {
    if (statsVisible) {
      startPatientsCount();
      startExperienceCount();
      startSatisfactionCount();
    }
  }, [statsVisible, startPatientsCount, startExperienceCount, startSatisfactionCount]);

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Hero Section com animações melhoradas */}
        <section className="bg-gradient-veracare text-white py-20 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float-circular"></div>
            <div className="absolute top-32 right-20 w-20 h-20 bg-white rounded-full animate-bounce-gentle delay-500"></div>
            <div className="absolute bottom-20 left-32 w-24 h-24 bg-white rounded-full animate-float-vertical delay-1000"></div>
          </div>
          
          <div className="container text-center relative z-10">
            <AnimatedText 
              text="Os seus pés em boas mãos!" 
              className="text-4xl md:text-6xl font-bold mb-4 text-gradient-veracare"
              type="fadeIn"
              delay={200}
            />
            
            <FadeInOnScroll delay={600} direction="up">
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Veracare, cuidando da saúde dos seus pés com dedicação, experiência e expertise.
              </p>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={1000} direction="up">
              <div className="space-x-4">
                <Link className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 hover-lift smooth-transition" href="/agenda">
                  Agende Sua Consulta
                </Link>
                <Link className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 smooth-transition" href="/quem-somos">
                  Sobre Nós
                </Link>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Estatísticas animadas */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 text-center" ref={statsRef as any}>
              <FadeInOnScroll delay={200}>
                <div className="bg-white p-6 rounded-lg shadow-md hover-glow">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{patientsCount}+</div>
                  <div className="text-gray-600">Pacientes Atendidos</div>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={400}>
                <div className="bg-white p-6 rounded-lg shadow-md hover-glow">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{experienceCount}%</div>
                  <div className="text-gray-600">Procedimentos Bem-sucedidos</div>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={600}>
                <div className="bg-white p-6 rounded-lg shadow-md hover-glow">
                  <div className="text-4xl font-bold text-green-600 mb-2">{satisfactionCount}%</div>
                  <div className="text-gray-600">Satisfação dos Clientes</div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Por que escolher seção com animações */}
        <section className="py-16 bg-white">
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
                <FloatingElement intensity="light">
                  <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md hover-scale smooth-transition">
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
                </FloatingElement>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={400} direction="up">
                <FloatingElement intensity="light" direction="vertical">
                  <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md hover-scale smooth-transition">
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
                </FloatingElement>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={600} direction="right">
                <FloatingElement intensity="light">
                  <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md hover-scale smooth-transition">
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
                </FloatingElement>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Seção da Profissional com animações */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left">
                <div>
                  <AnimatedText 
                    text="Cuidando da saúde dos seus pés com excelência!"
                    className="text-3xl font-bold mb-6 text-gradient-veracare"
                    type="fadeIn"
                  />
                  
                  <FadeInOnScroll delay={400}>
                    <p className="text-lg mb-6">
                      Na Veracare, nossa missão é proporcionar saúde, bem-estar e conforto aos seus pés através de tratamentos preventivos e curativos,
                      sempre com profissionalismo e dedicação.
                    </p>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll delay={600}>
                    <p className="text-gray-600 mb-8">
                      Nossa equipe especializada utiliza as melhores técnicas e produtos para garantir que você tenha pés saudáveis e bonitos.
                    </p>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll delay={800}>
                    <Link className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-blue-700 hover-lift smooth-transition" href="/servicos">
                      Conheça Nossos Serviços
                    </Link>
                  </FadeInOnScroll>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={300} direction="right">
                <div className="relative">
                  <FloatingElement intensity="light">
                    <ProfessionalImage 
                      size="large"
                      className="object-cover rounded-lg shadow-lg hover-glow"
                      alt="Veralucia Trindade Santos - Podóloga Especialista"
                    />
                  </FloatingElement>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg animate-fade-up delay-1000">
                    <h3 className="font-semibold text-gray-800">Veralucia Trindade Santos</h3>
                    <p className="text-sm text-gray-600">Podóloga Especialista</p>
                    <p className="text-xs text-gray-500 mt-1">Ampla experiência em cuidados podológicos especializados</p>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Seção CTA final */}
        <FadeInOnScroll>
          <section className="py-16 bg-gradient-veracare text-white text-center">
            <div className="container">
              <AnimatedText 
                text="Pronto para cuidar dos seus pés?"
                className="text-3xl font-bold mb-6"
                type="fadeIn"
              />
              
              <FadeInOnScroll delay={400}>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Agende sua consulta hoje mesmo e dê o primeiro passo para ter pés mais saudáveis e bonitos.
                </p>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={600}>
                <div className="space-x-4">
                  <Link 
                    href="/agenda" 
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 hover-lift smooth-transition"
                  >
                    Agendar Consulta
                  </Link>
                  <Link 
                    href="/cases-de-sucesso" 
                    className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-blue-600 smooth-transition"
                  >
                    Ver Cases de Sucesso
                  </Link>
                </div>
              </FadeInOnScroll>
            </div>
          </section>
        </FadeInOnScroll>
      </main>
      
      <Footer />
      <WhatsAppPopup />
    </>
  );
}