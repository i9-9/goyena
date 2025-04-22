import type { Metadata, Viewport } from 'next';

// This file exists solely to define metadata for the not-found page
// We're separating it from _not-found.tsx because that file needs 'use client'
// directive for using Framer Motion components, which conflicts with metadata exports

export const metadata: Metadata = {
  title: "Página no encontrada | Goyena",
  description: "Lo sentimos, la página que estás buscando no existe. Vuelve a la página principal del proyecto Goyena.",
};

export const viewport: Viewport = {
  themeColor: '#2C3424',
  width: 'device-width',
  initialScale: 1,
}; 