import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/400-italic.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'

export const metadata: Metadata = {
  title: 'Cortes — Referencia de Tribunales Chilenos',
  description: 'Referencia visual de la estructura de los tribunales del sistema judicial chileno.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
