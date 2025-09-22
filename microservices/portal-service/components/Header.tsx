import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-600">Veracare</div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm">
            <span className="font-semibold">Ligue Agora:</span> (11) 96738-1029
          </div>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-blue-600">Início</Link>
            <Link href="/quem-somos" className="hover:text-blue-600">Quem Somos</Link>
            <Link href="/servicos" className="hover:text-blue-600">Serviços</Link>
            <Link href="/agenda" className="hover:text-blue-600">Agendar</Link>
            <Link href="/agendamento-avancado" className="hover:text-blue-600">Agendamento Avançado</Link>
            <Link href="/contato" className="hover:text-blue-600">Contato</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
