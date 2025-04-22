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
import JsonLd from './components/shared/JsonLd';
import { motion } from 'framer-motion';
import useMediaQuery from './hooks/useMediaQuery';
import ContentfulProvider from './ContentfulProvider';

// Datos estructurados para SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Goyena",
  "url": "https://www.goyena.com.ar",
  "logo": "https://www.goyena.com.ar/logo/logo.svg",
  "image": "https://www.goyena.com.ar/images/og-image.jpg",
  "description": "Proyecto residencial moderno con casas urbanas y departamentos con amplios espacios verdes en Caballito.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Argentina",
    "addressRegion": "CABA",
    "addressLocality": "Caballito",
    "streetAddress": "Pedro Goyena",
    "postalCode": "1424"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-34.6220",
    "longitude": "-58.4383"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+541112345678",
    "contactType": "sales",
    "email": "info@goyena.com.ar",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": [
    "https://www.instagram.com/goyena_urbanhouses/",
    "https://www.facebook.com/goyenaprojects",
    "https://www.linkedin.com/company/grupo-portland/"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Residence",
      "name": "Casas Urbanas y Departamentos Goyena",
      "description": "Proyecto residencial moderno con 68 casas urbanas y 43 departamentos con amplios espacios verdes en Caballito.",
      "numberOfRooms": "2-5",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Espacios verdes",
          "value": "1000 m²"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Unidades",
          "value": "111 unidades (68 casas urbanas y 43 departamentos)"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Ambientes",
          "value": "2, 3, 4 y 5 ambientes"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Áreas comunes",
          "value": "Jardín, espacios de coworking y esparcimiento"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Estacionamiento",
          "value": "Disponible"
        }
      ],
      "floorSize": {
        "@type": "QuantitativeValue",
        "minValue": "45",
        "maxValue": "150",
        "unitCode": "MTK"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Buenos Aires"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD"
    }
  }
};

export default function Home() {
  // Use our custom media query hook instead of window.innerWidth
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <ContentfulProvider>
      <JsonLd data={structuredData} id="schema-structured-data" />
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
    </ContentfulProvider>
  );
}
