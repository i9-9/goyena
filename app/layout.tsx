import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goyena | Casas Urbanas y Departamentos en Caballito",
  description: "Goyena es un proyecto residencial moderno que promueve la vida comunitaria y el contacto con la naturaleza en el corazón de Caballito. Descubra casas urbanas de 2, 3, 4 y 5 ambientes con amplios espacios verdes.",
  keywords: ["casas urbanas", "departamentos", "Caballito", "Buenos Aires", "naturaleza", "espacios verdes", "proyecto inmobiliario", "lujo", "comfort", "arquitectura moderna"],
  authors: [
  { name: "Grupo Portland", url: "https://www.grupoportland.com.ar" },
  { name: "Ivan Nevares", url: "https://inevares.com", }
],
  category: "Real Estate",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.goyena.com.ar",
    siteName: "Goyena | Casas Urbanas y Departamentos en Caballito",
    title: "Goyena | Casas Urbanas y Departamentos en Caballito",
    description: "Proyecto residencial moderno con 68 casas urbanas y 43 departamentos con amplios espacios verdes en el corazón de Caballito, Buenos Aires.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Goyena - Proyecto residencial en Caballito"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Goyena | Casas Urbanas y Departamentos en Caballito",
    description: "Proyecto residencial moderno con 68 casas urbanas y 43 departamentos con amplios espacios verdes en Caballito.",
    images: ["/images/og-image.jpg"],
    creator: "@grupoportland"
  },
  other: {
    'typekit': 'rnd6fyv',
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://www.goyena.com.ar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rnd6fyv.css" />
        <meta name="theme-color" content="#2C3424" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
