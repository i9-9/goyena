'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
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
    <section id="hero" className={`relative w-full ${isMobile ? 'h-screen' : 'h-[calc(100vh-6.25rem)]'} flex items-center justify-center bg-[#D7DBD6]`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={isMobile ? "/images/hero/mobile_hero.jpg" : "/images/hero/desktop.jpg"}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <motion.div 
        className={`relative z-10 flex flex-col items-center ${isMobile ? 'mt-[-50vh]' : ''} justify-center gap-[1.5rem] text-[#2C3424] w-full px-4`}
        initial={{ opacity: 0, y: "1.25rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span 
          className="font-goudy-regular text-sm md:text-base tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CABALLITO
        </motion.span>
        <motion.h1 
          className="font-seasons-bold text-[4.375rem] md:text-[10rem] leading-none uppercase mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          GOYENA
        </motion.h1>
        <motion.h2 
          className="font-seasons-bold text-[1.25rem] md:text-[2.5rem] uppercase mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          CASAS URBANAS
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default Hero; 