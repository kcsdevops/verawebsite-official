'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  precoOriginal?: number;
  descricao: string;
  categoria: string;
  imagem: string;
  promocao?: string;
  parcelamento: string;
  disponivel: boolean;
  destaque?: boolean;
}

const produtos: Produto[] = [
  {
    id: 'homeomag-30g',
    nome: 'HomeoMag - 30g',
    preco: 72.70,
    descricao: 'Hidratante com magnésio para pés ressecados e rachados. Fórmula exclusiva com ação terapêutica que proporciona hidratação profunda e regeneração da pele.',
    categoria: 'Hidratantes',
    imagem: '/images/homeomag-30g.jpg',
    parcelamento: '4x de R$18,18 sem juros',
    disponivel: true,
    destaque: true
  },
  {
    id: 'kit-homeomag-2x',
    nome: 'Kit com 2 HomeoMag - 30g',
    preco: 138.10,
    precoOriginal: 145.40,
    descricao: 'Kit promocional com 2 unidades do HomeoMag. Economize comprando o kit! Ideal para tratamentos prolongados.',
    categoria: 'Hidratantes',
    imagem: '/images/kit-homeomag-2x.jpg',
    promocao: '5% OFF + FRETE GRÁTIS',
    parcelamento: '4x de R$34,53 sem juros',
    disponivel: true,
    destaque: true
  },
  {
    id: 'homeocreme-120g',
    nome: 'HomeoCreme - 120g',
    preco: 57.99,
    descricao: 'Creme hidratante para pés e mãos. Textura cremosa que absorve rapidamente sem deixar oleosidade. Formulado com ingredientes naturais.',
    categoria: 'Hidratantes',
    imagem: '/images/homeocreme-120g.jpg',
    promocao: '5% OFF comprando 2 ou mais!',
    parcelamento: '4x de R$14,50 sem juros',
    disponivel: true
  },
  {
    id: 'homeofree-30ml',
    nome: 'HomeoFree - 30ml',
    preco: 60.30,
    descricao: 'Solução antifúngica para unhas. Tratamento eficaz e natural contra fungos nas unhas dos pés e mãos. Aplicação prática com aplicador.',
    categoria: 'Unhas',
    imagem: '/images/homeofree-30ml.jpg',
    parcelamento: '4x de R$15,08 sem juros',
    disponivel: true
  },
  {
    id: 'espuma-cremosa-120ml',
    nome: 'Espuma Cremosa de Limpeza - 120ml',
    preco: 52.80,
    descricao: 'Espuma cremosa para limpeza suave dos pés. Remove impurezas e prepara a pele para tratamentos. pH balanceado.',
    categoria: 'Higienização/Limpeza da pele',
    imagem: '/images/espuma-cremosa.jpg',
    promocao: '5% OFF comprando 2 ou mais!',
    parcelamento: '4x de R$13,20 sem juros',
    disponivel: true
  },
  {
    id: 'calmavie-gel',
    nome: 'CALMAVIE gel creme massageador',
    preco: 49.99,
    precoOriginal: 52.90,
    descricao: 'Gel creme massageador com ação calmante e relaxante para pés cansados. Proporciona alívio imediato e bem-estar.',
    categoria: 'Emoliente',
    imagem: '/images/calmavie-gel.jpg',
    promocao: '6% OFF',
    parcelamento: '4x de R$12,50 sem juros',
    disponivel: true
  },
  {
    id: 'blend-oleos-analgesia',
    nome: 'Blend de Óleos | Analgesia',
    preco: 60.00,
    descricao: 'Blend de óleos essenciais com propriedades analgésicas naturais. Alívio natural para dores e tensões. Uso profissional.',
    categoria: 'Blend de óleos | Analgesia',
    imagem: '/images/blend-oleos.jpg',
    parcelamento: '4x de R$15,00 sem juros',
    disponivel: true
  },
  {
    id: 'kit-homeomag-calcanheira',
    nome: 'Kit HomeoMag + calcanheira protetora',
    preco: 108.70,
    descricao: 'Kit completo com HomeoMag e calcanheira protetora preta para hidratação. Solução completa para cuidados dos pés.',
    categoria: 'Meia/calcanheira',
    imagem: '/images/kit-calcanheira.jpg',
    parcelamento: '4x de R$27,18 sem juros',
    disponivel: false
  },
  {
    id: 'kit-homeocreme-3x',
    nome: 'Kit com 3 HomeoCreme - 120g',
    preco: 165.25,
    precoOriginal: 173.97,
    descricao: 'Kit econômico com 3 unidades do HomeoCreme. Máxima economia para uso familiar ou profissional!',
    categoria: 'Hidratantes',
    imagem: '/images/kit-homeocreme-3x.jpg',
    promocao: '5% OFF + FRETE GRÁTIS',
    parcelamento: '4x de R$41,31 sem juros',
    disponivel: true
  },
  {
    id: 'display-homeofree-6x',
    nome: 'Display com 6: HomeoFree - 30ml',
    preco: 325.60,
    precoOriginal: 361.80,
    descricao: 'Display profissional com 6 unidades do HomeoFree. Ideal para podólogos e profissionais da área.',
    categoria: 'Unhas',
    imagem: '/images/display-homeofree.jpg',
    promocao: '10% OFF + FRETE GRÁTIS',
    parcelamento: '4x de R$81,40 sem juros',
    disponivel: true
  }
];

const categorias = [
  'Todas',
  'Hidratantes',
  'Unhas',
  'Emoliente',
  'Esfoliação',
  'Higienização/Limpeza da pele',
  'Desodorante para os pés',
  'Meia/calcanheira',
  'Blend de óleos | Analgesia'
];

export default function ProdutosPage() {
  const router = useRouter();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [carrinho, setCarrinho] = useState<{[key: string]: number}>({});

  // Carregar carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('veracare_carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('veracare_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produtoId: string) => {
    setCarrinho(prev => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1
    }));
  };

  const finalizarCompra = () => {
    if (totalItensCarrinho === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }

    // Verificar se usuário está logado
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      if (confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login agora?')) {
        router.push('/login?redirect=/checkout?loja=nobrevie');
      }
      return;
    }

    // Redirecionar para checkout
    router.push('/checkout?loja=nobrevie');
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho(prev => {
      const novo = { ...prev };
      if (novo[produtoId] && novo[produtoId] > 1) {
        novo[produtoId]--;
      } else {
        delete novo[produtoId];
      }
      return novo;
    });
  };

  const totalItensCarrinho = Object.values(carrinho).reduce((total, qtd) => total + qtd, 0);
  const valorTotalCarrinho = Object.entries(carrinho).reduce((total, [id, qtd]) => {
    const produto = produtos.find(p => p.id === id);
    return total + (produto ? produto.preco * qtd : 0);
  }, 0);

  const produtosFiltrados = produtos.filter(produto => 
    categoriaFiltro === 'Todas' || produto.categoria === categoriaFiltro
  );

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'preco-asc':
        return a.preco - b.preco;
      case 'preco-desc':
        return b.preco - a.preco;
      case 'nome':
      default:
        return a.nome.localeCompare(b.nome);
    }
  });

  const produtosDestaque = produtos.filter(p => p.destaque);

  return (
    <>
      <Header />
      
      {/* Widget do Carrinho Fixo */}
      {totalItensCarrinho > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-blue-600 text-white rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">🛒</span>
              <div className="text-sm flex-1">
                <div className="font-bold">{totalItensCarrinho} {totalItensCarrinho === 1 ? 'item' : 'itens'}</div>
                <div className="text-lg font-bold">R$ {valorTotalCarrinho.toFixed(2)}</div>
              </div>
            </div>
            
            {valorTotalCarrinho >= 199 ? (
              <div className="text-xs bg-green-500 bg-opacity-20 text-green-100 px-2 py-1 rounded mb-3">
                🚚 Frete Grátis!
              </div>
            ) : (
              <div className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-100 px-2 py-1 rounded mb-3">
                Faltam R$ {(199 - valorTotalCarrinho).toFixed(2)} para frete grátis
              </div>
            )}
            
            <button
              onClick={finalizarCompra}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              <span>💳</span>
              Finalizar Compra
            </button>
            
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalItensCarrinho}
            </div>
          </div>
        </div>
      )}

      {/* Banner de Frete Grátis */}
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        <span className="font-semibold">🚚 FRETE GRÁTIS</span> a partir de R$ 199,00 | 
        <span className="ml-2">💳 Parcele em até 4x sem juros</span>
      </div>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Produtos Veracare</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Linha completa de produtos para cuidados podológicos e dermatológicos. 
              Qualidade profissional para o seu bem-estar.
            </p>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              🌟 Produtos em Destaque
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {produtosDestaque.map(produto => (
                <div key={produto.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 relative">
                  {produto.promocao && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      {produto.promocao}
                    </div>
                  )}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 100 100" className="text-blue-400">
                      <rect x="25" y="20" width="50" height="60" rx="8" fill="currentColor" opacity="0.3"/>
                      <rect x="30" y="25" width="40" height="50" rx="5" fill="currentColor" opacity="0.6"/>
                      <circle cx="50" cy="15" r="8" fill="currentColor"/>
                      <text x="50" y="52" textAnchor="middle" className="text-xs" fill="white">NobreVie</text>
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{produto.nome}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produto.descricao}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {produto.precoOriginal && (
                          <span className="text-gray-400 line-through text-sm">
                            R$ {produto.precoOriginal.toFixed(2)}
                          </span>
                        )}
                        <div className="text-2xl font-bold text-blue-600">
                          R$ {produto.preco.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">{produto.parcelamento}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {carrinho[produto.id] ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removerDoCarrinho(produto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-medium transition-colors"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-bold text-lg">
                            {carrinho[produto.id]} no carrinho
                          </span>
                          <button
                            onClick={() => adicionarAoCarrinho(produto.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded font-medium transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => adicionarAoCarrinho(produto.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
                          disabled={!produto.disponivel}
                        >
                          <span>🛒</span>
                          {produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtros e Produtos */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Todos os Produtos
              </h2>
              
              {/* Filtros */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  {categorias.map(categoria => (
                    <button
                      key={categoria}
                      onClick={() => setCategoriaFiltro(categoria)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        categoriaFiltro === categoria
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenação */}
              <div className="flex justify-center mb-8">
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                  aria-label="Ordenar produtos"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="nome">Ordenar por Nome</option>
                  <option value="preco-asc">Menor Preço</option>
                  <option value="preco-desc">Maior Preço</option>
                </select>
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosOrdenados.map(produto => (
                <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                  {produto.promocao && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                      {produto.promocao}
                    </div>
                  )}
                  {!produto.disponivel && (
                    <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                      ESGOTADO
                    </div>
                  )}
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="text-gray-400">
                      <rect x="25" y="20" width="50" height="60" rx="8" fill="currentColor" opacity="0.4"/>
                      <rect x="30" y="25" width="40" height="50" rx="5" fill="currentColor" opacity="0.7"/>
                      <circle cx="50" cy="15" r="8" fill="currentColor"/>
                      <text x="50" y="52" textAnchor="middle" className="text-xs" fill="white">NV</text>
                    </svg>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-medium">{produto.categoria}</span>
                    <h3 className="font-semibold text-sm mb-2 text-gray-800 line-clamp-2">{produto.nome}</h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{produto.descricao}</p>
                    <div className="mb-3">
                      {produto.precoOriginal && (
                        <span className="text-gray-400 line-through text-xs">
                          R$ {produto.precoOriginal.toFixed(2)}
                        </span>
                      )}
                      <div className="text-lg font-bold text-blue-600">
                        R$ {produto.preco.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">{produto.parcelamento}</div>
                    </div>
                    <div className="flex gap-2">
                      {carrinho[produto.id] ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => removerDoCarrinho(produto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded">
                            {carrinho[produto.id]}
                          </span>
                          <button
                            onClick={() => adicionarAoCarrinho(produto.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-1 rounded text-xs"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => adicionarAoCarrinho(produto.id)}
                          className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                            produto.disponivel
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!produto.disponivel}
                        >
                          <span>🛒</span>
                          {produto.disponivel ? 'Adicionar' : 'Indisponível'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {produtosOrdenados.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl opacity-30 mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500">
                  Tente selecionar uma categoria diferente ou verificar todos os produtos.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="font-bold text-lg mb-2">Frete Grátis</h3>
                <p className="text-gray-600">
                  Frete grátis a partir de R$ 199,00 para todo o Brasil
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="font-bold text-lg mb-2">Parcelamento</h3>
                <p className="text-gray-600">
                  Parcele em até 4x sem juros no cartão de crédito
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-bold text-lg mb-2">Qualidade</h3>
                <p className="text-gray-600">
                  Produtos desenvolvidos especialmente para profissionais
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Precisa de Ajuda na Escolha?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para te auxiliar na escolha dos melhores produtos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5511944744029"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>💬</span>
                WhatsApp
              </a>
              <a
                href="mailto:atendimento@nobrevie.com.br"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>📧</span>
                E-mail
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}