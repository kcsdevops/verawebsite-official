'use client';

import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function CatalogoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">Catálogo de Produtos Veracare</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Escolha entre nossas parcerias exclusivas com as melhores marcas do mercado 
              podológico e dermatológico.
            </p>
          </div>
        </section>

        {/* Lojas Parceiras */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Nossos Parceiros Comerciais
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Nobrevie */}
              <Link href="/produtos" className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🧴</div>
                      <h3 className="text-2xl font-bold text-blue-800">NobreVie</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Produtos Nobrevie</h3>
                    <p className="text-gray-600 mb-4">
                      Linha completa de produtos para cuidados podológicos com fórmulas exclusivas 
                      e ingredientes naturais de alta qualidade.
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div>✅ <strong>10 produtos</strong> disponíveis</div>
                      <div>✅ <strong>Frete grátis</strong> a partir de R$ 199</div>
                      <div>✅ <strong>Parcelamento</strong> em até 4x sem juros</div>
                      <div>✅ <strong>Ingredientes naturais</strong></div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm text-blue-800 font-medium">Destaques:</div>
                      <div className="text-xs text-blue-600">
                        HomeoMag • HomeoCreme • HomeoFree • Kit Promocionais
                      </div>
                    </div>
                    <div className="mt-4 bg-blue-600 text-white text-center py-2 rounded-lg font-medium group-hover:bg-blue-700 transition-colors">
                      Ver Produtos Nobrevie →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Podal Nano Cosméticos */}
              <Link href="/produtos-podal" className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🧬</div>
                      <h3 className="text-2xl font-bold text-purple-800">Podal Nano</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Podal Nano Cosméticos</h3>
                    <p className="text-gray-600 mb-4">
                      A evolução da podologia com nanotecnologia. Produtos desenvolvidos 
                      especificamente para profissionais e tratamentos avançados.
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div>✅ <strong>15 produtos</strong> disponíveis</div>
                      <div>✅ <strong>Nanotecnologia</strong> avançada</div>
                      <div>✅ <strong>Uso profissional</strong></div>
                      <div>✅ <strong>5% desconto</strong> no PIX</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-sm text-purple-800 font-medium">Destaques:</div>
                      <div className="text-xs text-purple-600">
                        Fungi Mai • Mille Series • Tratare • Bio-Traty • SOS Nail
                      </div>
                    </div>
                    <div className="mt-4 bg-purple-600 text-white text-center py-2 rounded-lg font-medium group-hover:bg-purple-700 transition-colors">
                      Ver Produtos Podal →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Comparativo */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Compare Nossas Linhas de Produtos
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Característica</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 uppercase">Nobrevie</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-purple-600 uppercase">Podal Nano</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Tecnologia</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">Ingredientes Naturais</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">Nanotecnologia</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Público-Alvo</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">Uso Doméstico</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">Profissional</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Quantidade de Produtos</td>
                    <td className="px-6 py-4 text-sm text-center text-blue-600 font-medium">10 produtos</td>
                    <td className="px-6 py-4 text-sm text-center text-purple-600 font-medium">15 produtos</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Frete Grátis</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">A partir de R$ 199</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">Consultar</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Parcelamento</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">4x sem juros</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">12x sem juros</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Faixa de Preço</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">R$ 49 - R$ 325</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">R$ 72 - R$ 175</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Por que Escolher a Veracare?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Parcerias Exclusivas</h3>
                <p className="text-gray-600">
                  Trabalhamos apenas com marcas reconhecidas e de qualidade comprovada no mercado podológico.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Atendimento Especializado</h3>
                <p className="text-gray-600">
                  Nossa equipe conhece profundamente cada produto e pode orientar a melhor escolha para suas necessidades.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Entrega Garantida</h3>
                <p className="text-gray-600">
                  Produtos originais com garantia de qualidade e entrega rápida para todo o Brasil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Precisa de Ajuda para Escolher?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para orientar você na escolha dos melhores produtos 
              para suas necessidades específicas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5511967381029"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>💬</span>
                WhatsApp Veracare
              </a>
              <Link
                href="/agendamento"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>📅</span>
                Agendar Consulta
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}