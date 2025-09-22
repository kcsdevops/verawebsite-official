export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Veracare</h3>
            <p className="text-sm">
              Há mais de 10 anos cuidando da saúde dos seus pés com dedicação e expertise.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400">Início</a></li>
              <li><a href="/quem-somos" className="hover:text-blue-400">Quem Somos</a></li>
              <li><a href="/servicos" className="hover:text-blue-400">Serviços</a></li>
              <li><a href="/agenda" className="hover:text-blue-400">Agendar</a></li>
              <li><a href="/contato" className="hover:text-blue-400">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-sm">Endereço: Rua Dias de Oliveira, 83 – Próximo ao terminal Casa Verde</p>
            <p className="text-sm">Telefone: (11) 96738-1029</p>
            <p className="text-sm">Email: contato@veracare.com.br</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Horários</h3>
            <p className="text-sm">Segunda a Sexta: 08:00 às 18:00</p>
            <p className="text-sm">Sábados: 08:00 às 16:00</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Veracare. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
