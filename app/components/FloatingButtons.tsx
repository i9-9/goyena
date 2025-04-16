'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="fixed right-[1.5rem] bottom-[1.5rem] z-50 flex flex-col gap-[1rem]">
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            className="w-[4.5rem] h-[4.5rem] bg-[#2C3424] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            aria-label="Volver arriba"
          >
            <img 
              src="/images/buttons/scroll.svg"
              alt="Scroll to top"
              className="w-12 h-12"
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.button
        className="w-[4.5rem] h-[4.5rem] bg-[#2C3424] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all"
        onClick={openWhatsApp}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -3 }}
        aria-label="Contactar por WhatsApp"
      >
        <img 
          src="/images/buttons/whatsapp.svg"
          alt="WhatsApp"
          className="w-12 h-12"
        />
      </motion.button>
    </div>
  );
};

export default FloatingButtons; 