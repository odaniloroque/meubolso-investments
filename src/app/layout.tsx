import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MeuBolso - Controle de Investimentos',
  description: 'Sistema completo de controle de investimentos - B3, Criptomoedas e mais',
  keywords: ['investimentos', 'B3', 'cripto', 'bitcoin', 'ethereum', 'solana', 'controle financeiro'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
