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

  const handleWhatsAppClick = () => {
    // Format for WhatsApp API: country code (54) + area code (11) + number without spaces
    const phoneNumber = '5491124955734';
    const message = 'Hola, me interesa obtener más información sobre el proyecto Goyena.';
    // Create the WhatsApp URL with encodeURIComponent for the message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    // Open in a new tab with specific options to ensure it works properly
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed right-[1.5rem] bottom-[1.5rem] z-50 flex flex-col gap-[0.2rem]">
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            className="w-[4.8rem] md:w-[6rem] h-[1.8rem] md:h-[2.2rem] flex items-center justify-center"
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
              className="w-[3.2rem] h-[3.2rem] md:w-16 md:h-16"
            />
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.button
        className="w-[4.8rem] md:w-[6rem] h-[4.8rem] md:h-[6rem] flex items-center justify-center"
        onClick={handleWhatsAppClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -1.5 }}
        transition={{ duration: 0.4 }}
        aria-label="Contactar por WhatsApp"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleWhatsAppClick()}
      >
        <Image 
          src="/images/buttons/whatsapp.svg"
          alt="WhatsApp"
          width={64}
          height={64}
          className="w-[3.2rem] h-[3.2rem] md:w-16 md:h-16"
        />
      </motion.button>
    </div>
  );
};

export default FloatingButtons; 