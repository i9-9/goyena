import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goyena",
  description: "Goyena - Tu aplicación",
  other: {
    'typekit': 'rnd6fyv',
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
