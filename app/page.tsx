'use client';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import ProjectLocation from './components/ProjectLocation';
import Lista from './components/Lista';
import Carousel from './components/Carousel';
import ConstructionProgress from './components/ConstructionProgress';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Script from 'next/script';

// Datos estructurados para SEO
const structuredDataString = `{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Goyena",
  "url": "https://www.goyena.com.ar",
  "logo": "https://www.goyena.com.ar/logo/logo.svg",
  "description": "Proyecto residencial moderno con casas urbanas y departamentos con amplios espacios verdes en Caballito.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Argentina",
    "addressRegion": "CABA",
    "addressLocality": "Caballito",
    "streetAddress": "Pedro Goyena"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+541112345678",
    "contactType": "sales"
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Residence",
      "name": "Casas Urbanas y Departamentos Goyena",
      "description": "Proyecto residencial moderno con 68 casas urbanas y 43 departamentos con amplios espacios verdes en Caballito.",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Espacios verdes",
          "value": "1000 m²"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Unidades",
          "value": "Casas urbanas y departamentos"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Ambientes",
          "value": "2, 3, 4 y 5 ambientes"
        }
      ]
    }
  }
}`;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al cargar
    checkIfMobile();
    
    // Verificar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <>
      <Script 
        id="schema-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
      <motion.main 
        className="relative w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        {!isMobile && <Navbar />}
        <ProjectLocation />
        <Lista />
        <Carousel />
        <ConstructionProgress />
        <ContactForm />
        <Footer />
        {isMobile && <MobileMenu />}
        <FloatingButtons />
      </motion.main>
    </>
  );
}
