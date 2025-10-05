'use client';

import { useState, useEffect } from 'react';
import AnimatedText from '../animations/AnimatedText';
import '../../styles/hero-banner.css';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      title: 'Cuidados Especializados',
      subtitle: 'Podologia profissional com técnicas avançadas',
      image: '/images/hero-1.jpg'
    },
    {
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      title: 'Sua Saúde em Primeiro Lugar',
      subtitle: 'Tratamentos personalizados para seus pés',
      image: '/images/hero-2.jpg'
    },
    {
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      title: 'Tecnologia e Experiência',
      subtitle: 'Equipamentos modernos e profissionais qualificados',
      image: '/images/hero-3.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          } hero-slide-bg-${index + 1}`}
        >
          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute inset-0 hero-gradient-overlay"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute hero-floating-element-1"></div>
            <div className="absolute hero-floating-element-2"></div>
            <div className="absolute hero-floating-element-3"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl">
          {/* Animated Title */}
          <div className="mb-6">
            <AnimatedText
              text={slides[currentSlide].title}
              type="fadeIn"
              className="text-6xl md:text-8xl font-bold text-white leading-tight"
              delay={200}
            />
          </div>

          {/* Animated Subtitle */}
          <div className="mb-8">
            <AnimatedText
              text={slides[currentSlide].subtitle}
              type="slideUp"
              className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl"
              delay={400}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="group relative px-8 py-4 bg-white text-gray-800 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">Agendar Consulta</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            
            <button className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-gray-800 hover:scale-105">
              Nossos Serviços
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: '🦶', title: 'Podologia Avançada', desc: 'Tratamentos especializados' },
              { icon: '⚕️', title: 'Profissionais', desc: 'Equipe qualificada' },
              { icon: '✨', title: 'Resultados', desc: 'Cases de sucesso' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Slide ${index + 1}`}
            title={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-30">
        <button 
          className="group w-16 h-16 hero-fab-gradient rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-bounce"
          aria-label="Abrir chat"
          title="Fale conosco"
        >
          <span className="block text-white text-2xl group-hover:scale-125 transition-transform">💬</span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Role para baixo</span>
          <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
  );
}