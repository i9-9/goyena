'use client';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import ProjectLocation from './components/ProjectLocation';
import FloatingButtons from './components/FloatingButtons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    <motion.main 
      className="relative w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      {!isMobile && <Navbar />}
      <ProjectLocation />
      {isMobile && <MobileMenu />}
      <FloatingButtons />
    </motion.main>
  );
}
