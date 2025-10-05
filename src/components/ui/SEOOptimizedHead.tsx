import Head from 'next/head';

interface SEOOptimizedHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  page?: string;
}

export function SEOOptimizedHead({
  title = "Veracare - Podologia Especializada na Zona Norte de São Paulo",
  description = "Clínica de podologia especializada na Zona Norte SP, Casa Verde. Tratamento de unhas encravadas, micoses, calos, verrugas plantares. Agende sua consulta: (11) 96738-1029",
  keywords = "podologia zona norte sp, podologia casa verde, unha encravada são paulo, tratamento micose pé, podologo zona norte, clínica podológica casa verde, calos pés, verrugas plantares, reflexologia podal, podologia preventiva",
  canonicalUrl = "https://veracare.com.br",
  ogImage = "/images/veracare-og-image.jpg",
  structuredData,
  page = "home"
}: SEOOptimizedHeadProps) {

  // Palavras-chave específicas por página
  const pageKeywords = {
    home: "podologia zona norte sp, podologo casa verde são paulo, clínica podológica zona norte, tratamento pés são paulo",
    agendamento: "agendar consulta podologia zona norte, agendamento podologo casa verde, consulta podológica são paulo",
    contato: "contato podologia zona norte, telefone podologo casa verde, endereço clínica podológica são paulo",
    servicos: "serviços podologia zona norte, tratamentos podológicos casa verde, unha encravada micose calos",
    equipe: "equipe podologia zona norte, profissionais podológicos casa verde, especialistas pés são paulo"
  };

  const finalKeywords = `${keywords}, ${pageKeywords[page as keyof typeof pageKeywords] || pageKeywords.home}`;

  // Dados estruturados para SEO (JSON-LD)
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Veracare - Clínica de Podologia",
    "description": description,
    "url": canonicalUrl,
    "logo": `${canonicalUrl}/images/logo-veracare.png`,
    "image": `${canonicalUrl}${ogImage}`,
    "telephone": "+55-11-96738-1029",
    "email": "contato@veracare.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Dias de Oliveira, 83",
      "addressLocality": "Casa Verde",
      "addressRegion": "São Paulo",
      "postalCode": "02519-200",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.509",
      "longitude": "-46.646"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 08:00-12:00"
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "Place",
      "name": "Zona Norte de São Paulo"
    },
    "medicalSpecialty": "Podologia",
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Tratamento de Unha Encravada"
      },
      {
        "@type": "MedicalProcedure", 
        "name": "Tratamento de Micose"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Remoção de Calos e Calosidades"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Reflexologia Podal"
      }
    ],
    "hasMap": "https://www.google.com/maps/place/Rua+Dias+de+Oliveira,+83+-+Casa+Verde,+São+Paulo+-+SP",
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Reclame Aqui"
      },
      "reviewBody": "Empresa sem reclamações registradas"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Meta Tags Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Veracare Podologia" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="pt-BR" />
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Casa Verde, São Paulo" />
      <meta name="geo.position" content="-23.509;-46.646" />
      <meta name="ICBM" content="-23.509, -46.646" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${canonicalUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Veracare Podologia" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${canonicalUrl}${ogImage}`} />

      {/* Dados Estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />

      {/* Meta Tags Locais */}
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content="Veracare" />
      <meta name="DC.subject" content="Podologia, Saúde dos Pés, Zona Norte São Paulo" />
      <meta name="DC.coverage" content="São Paulo, Brasil" />

      {/* Verificação de Propriedade (adicionar quando configurar) */}
      {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
      {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}

      {/* Links de Recursos */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect para Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />

      {/* Meta Tags de Negócio Local */}
      <meta name="contact" content="contato@veracare.com.br" />
      <meta name="reply-to" content="contato@veracare.com.br" />
      <meta name="owner" content="Veracare Podologia" />
      <meta name="url" content={canonicalUrl} />
      <meta name="identifier-URL" content={canonicalUrl} />
      <meta name="directory" content="submission" />
      <meta name="category" content="Saúde, Podologia, Cuidados com os Pés" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      {/* Hreflang para SEO Internacional (se necessário) */}
      <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />
    </Head>
  );
}

export default SEOOptimizedHead;