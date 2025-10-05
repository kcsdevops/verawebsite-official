import { Header } from '../../src/components/ui/Header';
import { Footer } from '../../src/components/ui/Footer';
import WhatsAppPopup from '../../src/components/ui/WhatsAppPopup';
import ProfessionalImage from '../../src/components/ui/ProfessionalImage';

export default function QuemSomosPage() {
  return (
    <>
      <Header />
      <main className="container py-10 pt-32">
        <h1 className="text-3xl font-bold mb-6 text-center">Quem Somos</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <ProfessionalImage 
              size="large"
              className="h-auto rounded-lg shadow-md object-cover"
              alt="Veralucia Trindade Santos - Podóloga"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-2xl font-semibold mb-4">Veralucia Trindade Santos</h2>
            <p className="text-lg mb-4">
              Sou Veralucia Trindade Santos, podóloga especializada em cuidados com os pés com ampla experiência.
              Minha missão é proporcionar saúde, bem-estar e conforto aos meus pacientes, tratando desde problemas
              simples como calos e unhas encravadas até condições mais complexas como micose e fissuras.
            </p>
            <p className="text-lg mb-4">
              Com formação em Podologia e cursos de atualização constantes, utilizo técnicas modernas e equipamentos
              de ponta para oferecer tratamentos eficazes e seguros. Acredito que pés saudáveis são essenciais para
              uma vida plena e ativa.
            </p>
            <p className="text-lg">
              Na Veracare, meu compromisso é com a prevenção, o tratamento personalizado e o acompanhamento contínuo
              para garantir que você se sinta confiante e confortável em cada passo.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Nossa Clínica</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Ambiente da clínica Veracare"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <p className="text-lg mb-4">
                Nossa clínica foi pensada para oferecer o máximo de conforto e segurança aos nossos pacientes.
                Contamos com equipamentos modernos e um ambiente acolhedor.
              </p>
              <p className="text-gray-600">
                Cada detalhe foi cuidadosamente planejado para proporcionar uma experiência única e relaxante durante o seu tratamento.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
          <p className="text-base">
            Oferecer serviços de podologia de alta qualidade, com foco na saúde preventiva e no bem-estar dos nossos
            pacientes. Buscamos sempre inovar e educar sobre a importância dos cuidados com os pés.
          </p>
        </div>

        {/* Galeria de imagens dos serviços */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-6">Nossos Serviços em Ação</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Tratamento profissional de pés"
                className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <h4 className="font-semibold">Tratamentos Especializados</h4>
              <p className="text-sm text-gray-600">Cuidados profissionais para a saúde dos seus pés</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Equipamentos modernos"
                className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <h4 className="font-semibold">Tecnologia Avançada</h4>
              <p className="text-sm text-gray-600">Equipamentos de última geração para melhores resultados</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Atendimento personalizado"
                className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <h4 className="font-semibold">Atendimento Humanizado</h4>
              <p className="text-sm text-gray-600">Cada paciente recebe cuidado individual e personalizado</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
          <p className="text-base">
            Ser referência em podologia em Casa Verde, reconhecida pela excelência no atendimento e pelos resultados
            positivos na saúde dos pés dos nossos pacientes.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Nossos Valores</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Compromisso com a saúde e segurança dos pacientes</li>
            <li>Atendimento personalizado e humanizado</li>
            <li>Ética profissional e transparência</li>
            <li>Inovação e atualização constante</li>
            <li>Respeito e empatia</li>
          </ul>
        </div>
      </main>
      <WhatsAppPopup />
      <Footer />
    </>
  );
}

