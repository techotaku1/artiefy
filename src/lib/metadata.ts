import type { Metadata } from 'next';

export const globalMetadata: Metadata = {
  title: 'Artiefy',
  description: 'Artiefy es la plataforma de aprendizaje más innovadora para estudiantes y profesores.',
  keywords: ['cursos', 'aprendizaje', 'educación', 'profesores', 'estudiantes'],
  applicationName: 'Artiefy',
  authors: [{ name: 'Equipo Artiefy', url: 'https://artiefy.vercel.app' }],
  creator: 'Equipo Artiefy',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://artiefy.vercel.app',
    title: 'Artiefy - Aprende y Crea',
    description: 'Artiefy es la plataforma de aprendizaje más innovadora.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artiefy - Aprende y Crea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@artiefy',
    creator: '@artiefy',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/artiefy-icon.png', // Ruta al favicon estático
    apple: '/artiefy-icon.png', // Ícono para Apple Touch
  },
};