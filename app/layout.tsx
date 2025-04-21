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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#2C3424'
      }
    ]
  },
  manifest: '/site.webmanifest',
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
  applicationName: 'Goyena',
  themeColor: '#2C3424',
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
