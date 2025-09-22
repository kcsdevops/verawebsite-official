'use client';

import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface ProdutoPodal {
  id: string;
  nome: string;
  preco: number;
  precoOriginal?:  const finalizarCompra = () => {
    if (totalItensCarrinho === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }

    // Verificar se usuário está logado
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado');
    if (!usuarioLogado) {
      if (confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login agora?')) {
        router.push('/login?redirect=/checkout?loja=podal');
      }
      return;
    }

    // Redirecionar para checkout
    router.push('/checkout?loja=podal');
  };r;
  descricao: string;
  categoria: string;
  imagem: string;
  desconto: string;
  parcelamento: string;
  disponivel: boolean;
  destaque?: boolean;
  linha: string;
}

const produtosPodal: ProdutoPodal[] = [
  {
    id: 'tratare-emoliente',
    nome: 'Emoliente para Áreas Sensíveis - Tratare',
    preco: 77.90,
    precoOriginal: 82.00,
    descricao: 'Emoliente especial para tratamento de áreas sensíveis. Ideal para onicófose e calosidades.',
    categoria: 'Para Unhas',
    imagem: '/images/tratare-emoliente.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    destaque: true,
    linha: 'Tratare'
  },
  {
    id: 'fungi-mai-reparador',
    nome: 'Fungi Mai - Reparador de Unhas',
    preco: 82.46,
    precoOriginal: 86.80,
    descricao: 'Reparador de unhas com ação antifúngica. Tratamento eficaz para onicomicose e fortalecimento das unhas.',
    categoria: 'Para Unhas',
    imagem: '/images/fungi-mai.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    destaque: true,
    linha: 'Fungi Mai'
  },
  {
    id: 'kit-unhas-saudaveis',
    nome: 'Kit Unhas Saudáveis - Fungi Mai e SOS Nail',
    preco: 132.05,
    precoOriginal: 139.00,
    descricao: 'Kit completo para unhas saudáveis. Combina o poder reparador do Fungi Mai com o fortalecimento do SOS Nail.',
    categoria: 'Kits',
    imagem: '/images/kit-unhas-saudaveis.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    destaque: true,
    linha: 'Kit'
  },
  {
    id: 'mille-extreme',
    nome: 'Pomada para Rachaduras nos Pés - Mille Extreme 60g',
    preco: 86.45,
    precoOriginal: 91.00,
    descricao: 'Pomada intensiva para tratamento de rachaduras nos pés. Ação reparadora e hidratante profunda.',
    categoria: 'Para os Pés',
    imagem: '/images/mille-extreme.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'sos-nail-base',
    nome: 'Base Fortalecedora - SOS Nail 7ml',
    preco: 77.52,
    precoOriginal: 81.60,
    descricao: 'Base fortalecedora para unhas fracas e quebradiças. Estimula o crescimento saudável das unhas.',
    categoria: 'Para Unhas',
    imagem: '/images/sos-nail.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'SOS Nail'
  },
  {
    id: 'mille-liz-queratolitic',
    nome: 'Creme Queratolítico - Mille Liz 90g',
    preco: 85.41,
    precoOriginal: 89.90,
    descricao: 'Creme queratolítico para tratamento de queratose e hiperqueratose. Remove calosidades e asperezas.',
    categoria: 'Para a Pele',
    imagem: '/images/mille-liz.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'mille-daily-probioticos',
    nome: 'Creme de Hidratação Profunda com Probióticos - Mille Daily',
    preco: 84.36,
    precoOriginal: 88.80,
    descricao: 'Hidratante com probióticos para uso diário. Mantém a pele saudável e protegida contra microorganismos.',
    categoria: 'Para a Pele',
    imagem: '/images/mille-daily.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'pied-clean',
    nome: 'Emoliente e Higienizante Profissional - Pied Clean',
    preco: 72.77,
    precoOriginal: 76.60,
    descricao: 'Emoliente e higienizante para uso profissional. Prepara a pele para procedimentos podológicos.',
    categoria: 'Para Profissionais',
    imagem: '/images/pied-clean.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Pied Clean'
  },
  {
    id: 'mille-plus-400g',
    nome: 'Creme de Hidratação Profunda - Mille+ (400g)',
    preco: 161.31,
    precoOriginal: 169.80,
    descricao: 'Hidratante profissional em embalagem econômica. Ideal para uso em clínicas e consultórios.',
    categoria: 'Para Profissionais',
    imagem: '/images/mille-plus.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'kit-pe-atleta',
    nome: 'Kit Pé de Atleta Nunca Mais - Fungi Mai e Tratare',
    preco: 147.54,
    precoOriginal: 155.30,
    descricao: 'Kit especializado no tratamento de pé de atleta. Combina ação antifúngica e emoliente.',
    categoria: 'Kits',
    imagem: '/images/kit-pe-atleta.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Kit'
  },
  {
    id: 'bio-traty-verrugas',
    nome: 'Auxiliar no Tratamento de Verrugas e Cicatrização - Bio-Traty',
    preco: 82.27,
    precoOriginal: 86.60,
    descricao: 'Auxiliar no tratamento de verrugas e cicatrização. Acelera o processo de regeneração da pele.',
    categoria: 'Para a Pele',
    imagem: '/images/bio-traty.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Bio-Traty'
  },
  {
    id: 'dermo-traty-higienizante',
    nome: 'Higienizante para Áreas Sensíveis - Dermo Traty (60ml)',
    preco: 81.89,
    precoOriginal: 86.20,
    descricao: 'Higienizante especial para áreas sensíveis. Com PHMB para máxima segurança antimicrobiana.',
    categoria: 'Para a Pele',
    imagem: '/images/dermo-traty.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Dermo Traty'
  },
  {
    id: 'mille-care-esfoliante',
    nome: 'Esfoliante Natural - Mille Care 110g',
    preco: 101.84,
    precoOriginal: 107.20,
    descricao: 'Esfoliante natural com cúrcuma biodegradável. Remove células mortas e renova a pele.',
    categoria: 'Para a Pele',
    imagem: '/images/mille-care.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'mille-relax-dores',
    nome: 'Mille Relax - Creme para Dores nas Pernas (90g)',
    preco: 81.32,
    precoOriginal: 85.60,
    descricao: 'Creme para alívio de dores nas pernas. Com extratos de arnica e castanha da índia.',
    categoria: 'Para a Pele',
    imagem: '/images/mille-relax.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Mille'
  },
  {
    id: 'kit-curativo',
    nome: 'Kit Curativo - Bio Traty e Dermo Traty',
    preco: 175.18,
    precoOriginal: 184.40,
    descricao: 'Kit completo para curativos. Combina tratamento de verrugas com higienização.',
    categoria: 'Kits',
    imagem: '/images/kit-curativo.jpg',
    desconto: '5% à vista',
    parcelamento: 'até 12x sem juros',
    disponivel: true,
    linha: 'Kit'
  }
];

const categoriasPodal = [
  'Todas',
  'Para Unhas',
  'Para a Pele', 
  'Para os Pés',
  'Para Profissionais',
  'Kits'
];

const linhasPodal = [
  'Todas',
  'Mille',
  'Fungi Mai',
  'SOS Nail',
  'Tratare',
  'Bio-Traty',
  'Dermo Traty',
  'Pied Clean',
  'Kit'
];

export default function ProdutosPodal() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [linhaFiltro, setLinhaFiltro] = useState('Todas');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [carrinhoPodal, setCarrinhoPodal] = useState<{[key: string]: number}>({});

  const adicionarAoCarrinho = (produtoId: string) => {
    setCarrinhoPodal(prev => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1
    }));
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinhoPodal(prev => {
      const novo = { ...prev };
      if (novo[produtoId] && novo[produtoId] > 1) {
        novo[produtoId]--;
      } else {
        delete novo[produtoId];
      }
      return novo;
    });
  };

  const produtosFiltrados = produtosPodal.filter(produto => {
    const filtroCategoria = categoriaFiltro === 'Todas' || produto.categoria === categoriaFiltro;
    const filtroLinha = linhaFiltro === 'Todas' || produto.linha === linhaFiltro;
    return filtroCategoria && filtroLinha;
  });

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

  const produtosDestaque = produtosPodal.filter(p => p.destaque);
  const totalItensCarrinho = Object.values(carrinhoPodal).reduce((total, qtd) => total + qtd, 0);
  const valorTotalCarrinho = Object.entries(carrinhoPodal).reduce((total, [id, qtd]) => {
    const produto = produtosPodal.find(p => p.id === id);
    return total + (produto ? produto.preco * qtd : 0);
  }, 0);

  return (
    <>
      <Header />
      
      {/* Widget do Carrinho Fixo */}
      {totalItensCarrinho > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-purple-600 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-purple-700 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <div className="text-sm">
                <div className="font-bold">{totalItensCarrinho} {totalItensCarrinho === 1 ? 'item' : 'itens'}</div>
                <div>R$ {valorTotalCarrinho.toFixed(2)}</div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {totalItensCarrinho}
            </div>
          </div>
        </div>
      )}

      {/* Banner Promocional */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-2 text-sm">
        <span className="font-semibold">💊 NANOTECNOLOGIA</span> em produtos podológicos | 
        <span className="ml-2">🎯 5% DESCONTO</span> no PIX e Boleto
      </div>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Podal Nano Cosméticos</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              A evolução da podologia com nanotecnologia. Produtos desenvolvidos 
              especificamente para profissionais e tratamentos avançados.
            </p>
            <div className="mt-6 flex justify-center gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                🧬 Nanotecnologia
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                🏥 Uso Profissional
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                🔬 Cientificamente Testado
              </div>
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              ⭐ Produtos em Destaque da Semana
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {produtosDestaque.map(produto => (
                <div key={produto.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    {produto.desconto}
                  </div>
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 100 100" className="text-purple-400">
                      <circle cx="50" cy="35" r="25" fill="currentColor" opacity="0.3"/>
                      <rect x="35" y="45" width="30" height="40" rx="5" fill="currentColor" opacity="0.6"/>
                      <circle cx="50" cy="25" r="12" fill="currentColor"/>
                      <text x="50" y="68" textAnchor="middle" className="text-xs" fill="white">PODAL</text>
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-purple-600 font-medium mb-1">{produto.linha}</div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{produto.nome}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produto.descricao}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {produto.precoOriginal && (
                          <span className="text-gray-400 line-through text-sm">
                            R$ {produto.precoOriginal.toFixed(2)}
                          </span>
                        )}
                        <div className="text-2xl font-bold text-purple-600">
                          R$ {produto.preco.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">{produto.parcelamento}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => adicionarAoCarrinho(produto.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>🛒</span>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Informações sobre Nanotecnologia */}
        <section className="py-12 bg-purple-50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🧬 O Poder da Nanotecnologia
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                A Podal Nano Cosméticos utiliza nanotecnologia para garantir maior penetração e eficácia dos ativos, 
                proporcionando resultados superiores no tratamento podológico.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-lg mb-2">Ação Rápida</h3>
                <p className="text-gray-600">
                  Nanopartículas permitem absorção mais rápida e eficiente dos ativos
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2">Penetração Profunda</h3>
                <p className="text-gray-600">
                  Atinge camadas mais profundas da pele para tratamentos eficazes
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="font-bold text-lg mb-2">Resultados Comprovados</h3>
                <p className="text-gray-600">
                  Tecnologia testada e aprovada por profissionais da podologia
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros e Produtos */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Catálogo Completo
              </h2>
              
              {/* Filtros por Categoria */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categorias:</h3>
                <div className="flex flex-wrap gap-2">
                  {categoriasPodal.map(categoria => (
                    <button
                      key={categoria}
                      onClick={() => setCategoriaFiltro(categoria)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        categoriaFiltro === categoria
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros por Linha */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Linhas de Produtos:</h3>
                <div className="flex flex-wrap gap-2">
                  {linhasPodal.map(linha => (
                    <button
                      key={linha}
                      onClick={() => setLinhaFiltro(linha)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        linhaFiltro === linha
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {linha}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenação */}
              <div className="flex justify-center mb-8">
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                  aria-label="Ordenar produtos Podal"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                    {produto.desconto}
                  </div>
                  <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="text-purple-400">
                      <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.3"/>
                      <rect x="35" y="45" width="30" height="35" rx="4" fill="currentColor" opacity="0.7"/>
                      <circle cx="50" cy="25" r="10" fill="currentColor"/>
                      <text x="50" y="68" textAnchor="middle" className="text-xs" fill="white">P</text>
                    </svg>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-purple-600 font-medium">{produto.linha}</span>
                    <h3 className="font-semibold text-sm mb-2 text-gray-800 line-clamp-2">{produto.nome}</h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{produto.descricao}</p>
                    <div className="mb-3">
                      {produto.precoOriginal && (
                        <span className="text-gray-400 line-through text-xs">
                          R$ {produto.precoOriginal.toFixed(2)}
                        </span>
                      )}
                      <div className="text-lg font-bold text-purple-600">
                        R$ {produto.preco.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">{produto.parcelamento}</div>
                    </div>
                    <div className="flex gap-2">
                      {carrinhoPodal[produto.id] ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => removerDoCarrinho(produto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded">
                            {carrinhoPodal[produto.id]}
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
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🛒</span>
                          Adicionar
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
                  Tente ajustar os filtros para encontrar o produto desejado.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Evolua sua Prática Profissional
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Utilize a nanotecnologia em seus tratamentos e ofereça resultados superiores aos seus pacientes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5511919141480?text=Olá! Quero viver a evolução da podologia com a Podal Nano Cosméticos!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>💬</span>
                WhatsApp: (11) 91914-1480
              </a>
              <a
                href="mailto:contato@podalnanocosmeticos.com.br"
                className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>📧</span>
                contato@podalnanocosmeticos.com.br
              </a>
              <a
                href="tel:+551123111471"
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>📞</span>
                (11) 2311-1471
              </a>
            </div>
          </div>
        </section>

        {/* Informações da Empresa */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl mb-4">🧬</div>
                <h3 className="font-bold text-lg mb-2">Nanotecnologia</h3>
                <p className="text-gray-600">
                  Produtos com tecnologia de nanopartículas para maior eficácia
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="font-bold text-lg mb-2">Uso Profissional</h3>
                <p className="text-gray-600">
                  Desenvolvidos especialmente para podólogos e profissionais da área
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="font-bold text-lg mb-2">Testado Cientificamente</h3>
                <p className="text-gray-600">
                  Resultados comprovados em estudos e testes clínicos
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