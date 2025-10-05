'use client';

import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';
import { SEOOptimizedHead } from '../../src/components/ui/SEOOptimizedHead';
import Link from 'next/link';
import { useState } from 'react';

interface CaseSuccess {
  id: number;
  title: string;
  description: string;
  technique: string;
  images: string[];
  details: string[];
  benefits: string[];
  duration: string;
  difficulty: 'Baixa' | 'Média' | 'Alta';
}

export default function CasesDeSuccesso() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases: CaseSuccess[] = [
    {
      id: 1,
      title: "Correção de Unhas Encravadas Severas",
      description: "Tratamento de unhas encravadas com inflamação e tecido de granulação",
      technique: "Onicotomia Parcial + Fenolização",
      images: ["/images/cases/unha-encravada-1.jpg", "/images/cases/unha-encravada-2.jpg"],
      details: [
        "Anestesia local para conforto do paciente",
        "Remoção da porção encravada da unha",
        "Cauterização química com fenol para prevenir recidiva",
        "Remoção do tecido de granulação excessivo",
        "Curativo especializado para cicatrização"
      ],
      benefits: [
        "Eliminação permanente da área encravada",
        "Alívio completo da dor e inflamação",
        "Taxa de recidiva menor que 5%",
        "Retorno às atividades em 48h"
      ],
      duration: "45-60 minutos",
      difficulty: "Alta"
    },
    {
      id: 2,
      title: "Tratamento de Onicomicose Severa",
      description: "Eliminação completa de fungos em unhas com espessamento e deformação",
      technique: "Debridamento Profundo + Terapia Antifúngica",
      images: ["/images/cases/micose-1.jpg", "/images/cases/micose-2.jpg"],
      details: [
        "Debridamento mecânico completo da unha infectada",
        "Remoção de todo material queratótico infectado",
        "Aplicação de antifúngico de amplo espectro",
        "Protocolo sistêmico quando necessário",
        "Acompanhamento mensal até cura completa"
      ],
      benefits: [
        "Eliminação definitiva do fungo",
        "Regeneração de unha saudável",
        "Melhora significativa da aparência",
        "Prevenção de disseminação para outras unhas"
      ],
      duration: "60-90 minutos",
      difficulty: "Alta"
    },
    {
      id: 3,
      title: "Reconstrução de Unha Traumatizada",
      description: "Restauração completa de unha perdida por trauma ou avulsão",
      technique: "Prótese Ungueal Funcional + Órtese",
      images: ["/images/cases/reconstrucao-1.jpg", "/images/cases/reconstrucao-2.jpg"],
      details: [
        "Preparação cuidadosa do leito ungueal",
        "Confecção de molde personalizado",
        "Aplicação de prótese em resina biocompatível",
        "Modelagem anatômica respeitando curvatura natural",
        "Ajustes progressivos durante crescimento"
      ],
      benefits: [
        "Proteção total do leito ungueal sensível",
        "Restauração da função e estética",
        "Prevenção de traumas secundários",
        "Melhora da autoconfiança"
      ],
      duration: "90-120 minutos",
      difficulty: "Alta"
    },
    {
      id: 4,
      title: "Remoção de Hiperqueratoses Severas",
      description: "Tratamento de calosidades espessas em áreas de pressão",
      technique: "Debridamento Mecânico + Hidratação Profunda",
      images: ["/images/cases/calosidade-1.jpg", "/images/cases/calosidade-2.jpg"],
      details: [
        "Avaliação da distribuição de pressão plantar",
        "Hidratação prévia para amolecimento",
        "Debridamento progressivo com lâminas estéreis",
        "Aplicação de ácidos queratolíticos",
        "Orientações para cuidados domiciliares"
      ],
      benefits: [
        "Eliminação completa da dor ao caminhar",
        "Restauração da sensibilidade normal",
        "Melhora significativa da mobilidade",
        "Prevenção de úlceras e fissuras"
      ],
      duration: "45-60 minutos",
      difficulty: "Média"
    },
    {
      id: 5,
      title: "Cuidados Especializados para Diabéticos",
      description: "Prevenção e tratamento de complicações podológicas em pacientes diabéticos",
      technique: "Protocolo de Cuidados Diabéticos + Monitoramento",
      images: ["/images/cases/diabetico-1.jpg", "/images/cases/diabetico-2.jpg"],
      details: [
        "Avaliação vascular e neurológica completa",
        "Debridamento cuidadoso de calosidades",
        "Tratamento preventivo de áreas de risco",
        "Educação sobre cuidados domiciliares",
        "Acompanhamento regular para prevenção"
      ],
      benefits: [
        "Prevenção de úlceras diabéticas",
        "Manutenção da sensibilidade",
        "Redução do risco de amputação",
        "Melhora da qualidade de vida"
      ],
      duration: "60-75 minutos",
      difficulty: "Alta"
    },
    {
      id: 6,
      title: "Tratamento de Verrugas Plantares Múltiplas",
      description: "Eliminação de verrugas plantares resistentes com técnicas avançadas",
      technique: "Crioterapia + Imunoterapia Tópica",
      images: ["/images/cases/verruga-1.jpg", "/images/cases/verruga-2.jpg"],
      details: [
        "Debridamento inicial da camada córnea",
        "Aplicação de nitrogênio líquido controlada",
        "Uso de imunomoduladores tópicos",
        "Acompanhamento quinzenal até resolução",
        "Prevenção de disseminação viral"
      ],
      benefits: [
        "Eliminação definitiva das verrugas",
        "Ativação da resposta imunológica",
        "Prevenção de novas lesões",
        "Recuperação da pele normal"
      ],
      duration: "30-45 minutos",
      difficulty: "Média"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Baixa': return 'text-green-600 bg-green-100';
      case 'Média': return 'text-yellow-600 bg-yellow-100';
      case 'Alta': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOOptimizedHead 
        title="Cases de Sucesso - VeraCare Podologia"
        description="Conheça nossos cases de sucesso em podologia. Tratamentos eficazes para unhas encravadas, micoses, calosidades e muito mais."
      />
      <Header />
      
      <main className="container mx-auto py-10 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Cases de Sucesso
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos nossos tratamentos mais eficazes e os resultados excepcionais 
            alcançados com nossas técnicas especializadas em podologia.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600">Pacientes Atendidos</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-green-600">95%</h3>
            <p className="text-gray-600">Taxa de Sucesso</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-purple-600">10+</h3>
            <p className="text-gray-600">Anos de Experiência</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-orange-600">15+</h3>
            <p className="text-gray-600">Técnicas Especializadas</p>
          </div>
        </div>

        {/* Grid de Cases */}
        <div className="grid lg:grid-cols-2 gap-8">
          {cases.map((case_) => (
            <div 
              key={case_.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedCase === case_.id ? 'border-blue-500 shadow-xl' : 'border-gray-200'
              }`}
              onClick={() => setSelectedCase(selectedCase === case_.id ? null : case_.id)}
            >
              {/* Header do Card */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{case_.title}</h3>
                    <p className="text-blue-100 mb-3">{case_.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {case_.technique}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(case_.difficulty)}`}>
                        {case_.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Duração</p>
                    <p className="font-semibold">{case_.duration}</p>
                  </div>
                </div>
              </div>

              {/* Galeria de Imagens */}
              <div className="grid grid-cols-2 gap-1">
                {case_.id === 1 ? (
                  <>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/unha-encravada-procedimento.jpg" 
                        alt="Espicolectomia - Procedimento para unha encravada"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Procedimento
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/onicotomia-procedimento.jpg" 
                        alt="Onicotomia - Corte das lâminas"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Resultado
                      </div>
                    </div>
                  </>
                ) : case_.id === 2 ? (
                  <>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/onicomicose-tratamento.jpg" 
                        alt="Tratamento de Onicomicose"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Tratamento
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/onicogrifose-lamina.jpg" 
                        alt="Lâmina com Onicogrifose"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Caso Clínico
                      </div>
                    </div>
                  </>
                ) : case_.id === 4 ? (
                  <>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/calosidades-procedimento.jpg" 
                        alt="Remoção de Calosidades"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Procedimento
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/calosidade-remocao-nucleo.jpg" 
                        alt="Remoção de Calo com Núcleo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Resultado
                      </div>
                    </div>
                  </>
                ) : case_.id === 5 ? (
                  <>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <img 
                        src="/images/cases/profilaxia-preventivo.jpg" 
                        alt="Tratamento Preventivo - Profilaxia"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Prevenção
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                        <div className="text-center text-gray-600">
                          <div className="text-4xl mb-2">👨‍⚕️</div>
                          <p className="text-sm">Cuidados Especializados</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Acompanhamento
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">🦶</div>
                          <p className="text-sm font-medium">Antes</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-gradient-to-br from-green-100 to-green-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">✨</div>
                          <p className="text-sm font-medium">Depois</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Detalhes Expandidos */}
              {selectedCase === case_.id && (
                <div className="p-6 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Procedimento */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-blue-500 mr-2">🔬</span>
                        Procedimento Realizado
                      </h4>
                      <ul className="space-y-2">
                        {case_.details.map((detail, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefícios */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-green-500 mr-2">✅</span>
                        Benefícios Alcançados
                      </h4>
                      <ul className="space-y-2">
                        {case_.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Botão de Agendamento */}
                  <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <a
                      href={`https://wa.me/5511967381029?text=Olá, gostaria de saber mais sobre o tratamento: ${case_.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
                    >
                      <span className="mr-2">💬</span>
                      Agendar Consulta para este Tratamento
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Transformar a Saúde dos Seus Pés?
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Agende sua consulta e descubra como nossos tratamentos especializados podem ajudar você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511967381029?text=Olá, gostaria de agendar uma consulta para avaliação podológica."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center"
            >
              <span className="mr-2">💬</span>
              Agendar pelo WhatsApp
            </a>
            <a
              href="/agenda"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              <span className="mr-2">📅</span>
              Formulário Online
            </a>
          </div>
        </div>

        {/* Informações Importantes */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
            <span className="mr-2">⚠️</span>
            Informações Importantes
          </h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Todos os procedimentos são realizados por profissionais especializados em podologia</li>
            <li>• Os resultados podem variar de acordo com cada caso individual</li>
            <li>• É necessária avaliação prévia para determinar o tratamento adequado</li>
            <li>• Seguimos rigorosos protocolos de biossegurança e esterilização</li>
            <li>• Oferecemos acompanhamento pós-tratamento e orientações preventivas</li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
