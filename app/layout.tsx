import './globals.css'
import '../styles/header.css'
import type { Metadata } from 'next'
import { FloatingButtons } from '../components/FloatingButtons'

export const metadata: Metadata = {
  title: 'Veracare | Podologia em Casa Verde',
  description: 'Cuide da saúde e bem-estar dos seus pés com a Veracare. Prevenção, tratamento e conforto em cada atendimento.',
  openGraph: {
    title: 'Veracare | Podologia em Casa Verde',
    description: 'Cuide da saúde e bem-estar dos seus pés com a Veracare. Prevenção, tratamento e conforto em cada atendimento.',
    url: 'https://veracare.example',
    siteName: 'Veracare',
    locale: 'pt_BR',
    type: 'website'
  },
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <FloatingButtons />
      </body>
    </html>
  )
}
