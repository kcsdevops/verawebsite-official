'use client';

interface LocationMapProps {
  showTitle?: boolean;
  height?: string;
  showDetails?: boolean;
}

export function LocationMap({ showTitle = true, height = "400px", showDetails = true }: LocationMapProps) {
  const address = "Rua Dias de Oliveira, 83, Casa Verde, São Paulo - SP";
  const coordinates = "-23.509,-46.646"; // Aproximadamente Casa Verde, Zona Norte SP
  
  // URLs para diferentes mapas
  const googleMapsUrl = `https://www.google.com/maps/place/Rua+Dias+de+Oliveira,+83+-+Casa+Verde,+São+Paulo+-+SP/@-23.509,-46.646,17z`;
  const wazeUrl = `https://www.waze.com/ul?ll=-23.509,-46.646&navigate=yes`;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {showTitle && (
        <div className="p-6 pb-0">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nossa Localização
          </h3>
          <p className="text-gray-600 mb-4">
            📍 <strong>Zona Norte de São Paulo - Casa Verde</strong>
          </p>
        </div>
      )}

      {/* Mapa Embed do Google */}
      <div className={`relative ${height === "400px" ? "h-96" : height === "300px" ? "h-72" : "h-80"}`}>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.123456789!2d-46.646!3d-23.509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20Dias%20de%20Oliveira%2C%2083%20-%20Casa%20Verde%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890`}
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Veracare - Casa Verde, São Paulo"
        />
        
        {/* Overlay com informações rápidas */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="text-sm">
            <div className="font-semibold text-gray-800">🏥 VERACARE</div>
            <div className="text-gray-600 text-xs mt-1">
              Rua Dias de Oliveira, 83<br />
              Casa Verde - Zona Norte SP
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="p-6">
          {/* Detalhes da Localização */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">📍</span>
                Endereço Completo
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Rua:</strong> Dias de Oliveira, 83</p>
                <p><strong>Bairro:</strong> Casa Verde</p>
                <p><strong>Região:</strong> Zona Norte</p>
                <p><strong>Cidade:</strong> São Paulo - SP</p>
                <p><strong>CEP:</strong> 02519-200</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🚇</span>
                Como Chegar
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Metrô:</strong> Linha 1-Azul - Estação Santana</p>
                <p><strong>Ônibus:</strong> Várias linhas passam pela região</p>
                <p><strong>Carro:</strong> Próximo à Av. Casa Verde</p>
                <p><strong>Referência:</strong> Próximo ao Shopping Casa Verde</p>
              </div>
            </div>
          </div>

          {/* Pontos de Referência */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3 text-blue-800">🗺️ Pontos de Referência Próximos</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-1 text-blue-700">
                <li>• Shopping Casa Verde (500m)</li>
                <li>• Hospital Santa Casa (1,2km)</li>
                <li>• Parque da Juventude (2km)</li>
              </ul>
              <ul className="space-y-1 text-blue-700">
                <li>• Estação Santana (1,5km)</li>
                <li>• Avenida Casa Verde (300m)</li>
                <li>• Terminal Santana (1,8km)</li>
              </ul>
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="flex flex-wrap gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Abrir no Google Maps
            </a>
            
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-500 transition-colors inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              Abrir no Waze
            </a>

            <a
              href={`https://wa.me/5511967381029?text=Olá, gostaria de saber como chegar à clínica na ${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Pedir Direções
            </a>
          </div>

          {/* Dica de Estacionamento */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>🚗 Dica:</strong> Estacionamento gratuito disponível na rua. 
              Chegue com alguns minutos de antecedência para encontrar vaga facilmente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationMap;