'use client';

interface SecuritySealsProps {
  showTitle?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
  size?: 'small' | 'medium' | 'large';
}

export function SecuritySeals({ showTitle = true, layout = 'grid', size = 'medium' }: SecuritySealsProps) {
  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-16 w-auto'
  };

  const layoutClasses = {
    horizontal: 'flex flex-wrap justify-center items-center gap-4',
    vertical: 'flex flex-col items-center gap-4',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center'
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      {showTitle && (
        <h3 className="text-lg font-semibold text-center mb-6 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.012-3a8.997 8.997 0 01-4.012 7.738A8.996 8.996 0 1112 3c2.933 0 5.683 1.44 7.323 3.847z" />
          </svg>
          Selos de Segurança e Confiança
        </h3>
      )}

      <div className={layoutClasses[layout]}>
        {/* Reclame Aqui - Sem Reclamações */}
        <div className="text-center group">
          <a
            href="https://www.reclameaqui.com.br/empresa/veracare/"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:scale-105 transition-transform"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-md">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-bold text-sm">RECLAME AQUI</div>
              <div className="text-xs mt-1">SEM RECLAMAÇÕES</div>
              <div className="text-xs bg-green-500 rounded-full px-2 py-1 mt-2">✓ VERIFICADO</div>
            </div>
          </a>
          <p className="text-xs text-gray-600 mt-2 group-hover:text-blue-600">
            Clique para verificar
          </p>
        </div>

        {/* SSL Seguro */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-md">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-bold text-sm">SSL SEGURO</div>
            <div className="text-xs mt-1">CONEXÃO PROTEGIDA</div>
            <div className="text-xs bg-green-700 rounded-full px-2 py-1 mt-2">✓ ATIVO</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Dados protegidos
          </p>
        </div>

        {/* Empresa Verificada */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold text-sm">EMPRESA</div>
            <div className="text-xs mt-1">VERIFICADA</div>
            <div className="text-xs bg-purple-700 rounded-full px-2 py-1 mt-2">✓ CNPJ ATIVO</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Registro válido
          </p>
        </div>

        {/* Atendimento 5 Estrelas */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-md">
            <div className="text-2xl mb-2">⭐</div>
            <div className="font-bold text-sm">5 ESTRELAS</div>
            <div className="text-xs mt-1">ATENDIMENTO</div>
            <div className="text-xs bg-orange-600 rounded-full px-2 py-1 mt-2">★★★★★</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Qualidade garantida
          </p>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            <strong>✓ Empresa confiável</strong> - Atuando na Zona Norte de São Paulo há anos
          </p>
          <p className="text-xs text-gray-500">
            Nosso compromisso é com a transparência e qualidade no atendimento. 
            Todos os dados são protegidos e nossa empresa está devidamente regularizada.
          </p>
        </div>
        
        <div className="flex justify-center mt-4">
          <a
            href="https://www.reclameaqui.com.br/reclamar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            🔍 Verificar empresa no Reclame Aqui
          </a>
        </div>
      </div>
    </div>
  );
}

export default SecuritySeals;