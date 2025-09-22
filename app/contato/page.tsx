import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const WHATS = 'https://wa.me/5511967381029?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento'

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Contato</h1>
        <p>Endereço: Rua Dias de Oliveira, 83 – Próximo ao terminal Casa Verde</p>
        <p>Agende seu horário: (11) 96738-1029</p>
        <div className="mt-6">
          <a className="inline-block bg-sky-500 text-white px-5 py-3 rounded-md mr-4" href="/agenda">
            Agendar Consulta
          </a>
          <a className="inline-block bg-green-500 text-white px-5 py-3 rounded-md" href={WHATS} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
