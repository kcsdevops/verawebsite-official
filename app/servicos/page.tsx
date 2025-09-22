'use client'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useState } from 'react'

interface ServicoItem {
  id: string
  titulo: string
  descricao: string
  imagem: string
  videoId: string
  beneficios: string[]
  duracao: string
  preco?: string
}

const servicosData: ServicoItem[] = [
  {
    id: 'onicomicose',
    titulo: 'Tratamento de Onicomicose (Micose)',
    descricao: 'Tratamento especializado para micose nas unhas dos pés, utilizando técnicas modernas e produtos antifúngicos eficazes.',
    imagem: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ', // Placeholder - substitua por vídeos reais
    beneficios: ['Eliminação completa da micose', 'Prevenção de reinfecções', 'Melhora da aparência das unhas'],
    duracao: '45 min',
    preco: 'R$ 80,00'
  },
  {
    id: 'onicotomia',
    titulo: 'Onicotomia (Corte e Manutenção das Unhas)',
    descricao: 'Corte técnico e manutenção profissional das unhas dos pés, prevenindo problemas futuros e mantendo a saúde podal.',
    imagem: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Corte técnico adequado', 'Prevenção de unhas encravadas', 'Manutenção da saúde das unhas'],
    duracao: '30 min',
    preco: 'R$ 50,00'
  },
  {
    id: 'fissuras',
    titulo: 'Tratamento de Fissuras (Rachaduras nos Pés)',
    descricao: 'Tratamento especializado para fissuras e rachaduras nos pés, promovendo cicatrização e hidratação profunda.',
    imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Cicatrização acelerada', 'Hidratação profunda', 'Prevenção de novas fissuras'],
    duracao: '40 min',
    preco: 'R$ 70,00'
  },
  {
    id: 'onicocriptose',
    titulo: 'Onicocriptose (Unha Encravada)',
    descricao: 'Tratamento profissional para unhas encravadas, aliviando a dor e prevenindo infecções.',
    imagem: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Alívio imediato da dor', 'Prevenção de infecções', 'Correção definitiva'],
    duracao: '50 min',
    preco: 'R$ 90,00'
  },
  {
    id: 'verruga-plantar',
    titulo: 'Remoção e Tratamento de Verruga Plantar (Olho de Peixe)',
    descricao: 'Remoção segura e eficaz de verrugas plantares utilizando técnicas modernas e indolores.',
    imagem: 'https://images.unsplash.com/photo-1594824720383-985a9e15071b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Remoção completa', 'Procedimento indolor', 'Prevenção de novas verrugas'],
    duracao: '60 min',
    preco: 'R$ 100,00'
  },
  {
    id: 'calos',
    titulo: 'Remoção de Calos e Calosidades',
    descricao: 'Remoção profissional de calos e calosidades, devolvendo maciez e conforto aos seus pés.',
    imagem: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Remoção completa', 'Alívio imediato', 'Pés mais macios'],
    duracao: '35 min',
    preco: 'R$ 60,00'
  }
]

const especialidadesData: ServicoItem[] = [
  {
    id: 'reflexologia',
    titulo: 'Reflexologia Podal',
    descricao: 'Técnica terapêutica que estimula pontos específicos dos pés para promover bem-estar e equilíbrio do corpo.',
    imagem: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Relaxamento profundo', 'Melhora da circulação', 'Equilíbrio energético'],
    duracao: '60 min',
    preco: 'R$ 120,00'
  },
  {
    id: 'podoprofilaxia',
    titulo: 'Podoprofilaxia (Podologia Preventiva)',
    descricao: 'Cuidados preventivos para manter a saúde dos pés, evitando problemas futuros através de técnicas especializadas.',
    imagem: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    beneficios: ['Prevenção de problemas', 'Manutenção da saúde podal', 'Orientações personalizadas'],
    duracao: '45 min',
    preco: 'R$ 85,00'
  }
]

export default function ServicosPage() {
  const [videoAtivo, setVideoAtivo] = useState<string | null>(null)

  const abrirVideo = (videoId: string) => {
    setVideoAtivo(videoId)
  }

  const fecharVideo = () => {
    setVideoAtivo(null)
  }

  const ServiceCard = ({ servico }: { servico: ServicoItem }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img 
          src={servico.imagem} 
          alt={servico.titulo}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {servico.duracao}
        </div>
        <button
          onClick={() => abrirVideo(servico.videoId)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white rounded-full p-4 transform hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{servico.titulo}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{servico.descricao}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Benefícios:</h4>
          <ul className="space-y-1">
            {servico.beneficios.map((beneficio, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {servico.preco && (
            <div className="text-left">
              <span className="text-2xl font-bold text-blue-600">A partir de {servico.preco}</span>
              <p className="text-xs text-gray-500 mt-1">*Sujeito a alteração conforme necessidades</p>
            </div>
          )}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Agendar
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Tratamentos especializados em podologia com técnicas modernas e equipamentos de última geração
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-xl mx-auto">
              <p className="text-sm opacity-90">
                📋 <strong>Preços personalizados:</strong> Cada atendimento é único e os valores podem variar conforme o tipo de cliente e suas necessidades específicas
              </p>
            </div>
          </div>
        </section>

        {/* Serviços Principais */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Serviços Oferecidos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicosData.map((servico) => (
                <ServiceCard key={servico.id} servico={servico} />
              ))}
            </div>
          </div>
        </section>

        {/* Especialidades */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Atendimento Especializado</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Com formação em biomedicina, oferecemos tratamentos especializados que vão além da podologia tradicional
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {especialidadesData.map((especialidade) => (
                <ServiceCard key={especialidade.id} servico={especialidade} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Pronto para cuidar dos seus pés?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Agende sua consulta e descubra como nossos tratamentos podem melhorar sua qualidade de vida
            </p>
            <div className="space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Agendar Consulta
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200">
                WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Vídeo */}
      {videoAtivo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={fecharVideo}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Vídeo Explicativo</h3>
              <button 
                onClick={fecharVideo} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar vídeo"
                title="Fechar vídeo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoAtivo}?autoplay=1`}
                title="Vídeo explicativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
