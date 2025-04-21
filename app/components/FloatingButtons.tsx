'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FloatingButtons = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Mostrar el botón cuando se haya desplazado 300px
      setShowScrollButton(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5491112345678?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20Goyena', '_blank');
  };

  return (
    <div className="fixed right-[1.5rem] bottom-[1.5rem] z-50 flex flex-col gap-[0.2rem]">
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            className="w-[6rem] h-[2.2rem] flex items-center justify-center"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ y: -1.5 }}
            transition={{ duration: 0.4 }}
            aria-label="Volver arriba"
          >
            <Image 
              src="/images/buttons/scroll.svg"
              alt="Scroll to top"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.button
        className="w-[6rem] h-[6rem] flex items-center justify-center"
        onClick={openWhatsApp}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -1.5 }}
        transition={{ duration: 0.4 }}
        aria-label="Contactar por WhatsApp"
      >
        <Image 
          src="/images/buttons/whatsapp.svg"
          alt="WhatsApp"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </motion.button>
    </div>
  );
};

export default FloatingButtons; 