'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useContentful } from '../ContentfulProvider';

// Definición del tipo para el campo RichText de Contentful
interface RichTextContent {
  content: Array<{
    value: string;
    nodeType?: string;
  }>;
  nodeType?: string;
}

interface RichTextField {
  content: RichTextContent[];
  nodeType: string;
}

const FloatingButtons = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [whatsappIconUrl, setWhatsappIconUrl] = useState("/images/buttons/whatsapp.svg");
  const [scrollTopIconUrl, setScrollTopIconUrl] = useState("/images/buttons/scroll.svg");
  const { logos } = useContentful();

  // Process logos from Contentful
  useEffect(() => {
    console.log('FloatingButtons: Processing logos from ContentfulProvider, count:', logos.length);
    
    if (logos && logos.length > 0) {
      logos.forEach(logo => {
        // Check if logo has the necessary fields
        if (!logo || !logo.logo || !logo.logo.fields || !logo.logo.fields.file) {
          return;
        }
        
        // Get type value - could be string or RichText
        let typeValue = "";
        if (typeof logo.type === 'string') {
          // Type is a simple string
          typeValue = logo.type;
          console.log('FloatingButtons: Logo has string type:', typeValue);
        } else if (logo.type && typeof logo.type === 'object') {
          // Type might be RichText
          try {
            const richTextField = logo.type as unknown as RichTextField;
            // Extract text from RichText if possible
            if (richTextField && richTextField.content && richTextField.content.length > 0) {
              const typeContent = richTextField.content[0];
              if (typeContent.content && typeContent.content.length > 0) {
                typeValue = typeContent.content[0]?.value || "";
                console.log('FloatingButtons: Logo has RichText type:', typeValue);
              }
            }
          } catch (error) {
            console.error('FloatingButtons: Error extracting type from RichText:', error);
          }
        }
        
        // Get the URL
        const url = logo.logo.fields.file.url;
        const fullUrl = url.startsWith('//') ? `https:${url}` : url;
        
        // Assign to the appropriate state based on type
        if (typeValue === 'social-whatsapp-float') {
          console.log('FloatingButtons: Found WhatsApp float icon:', fullUrl);
          setWhatsappIconUrl(fullUrl);
        } else if (typeValue === 'ui-scrolltop') {
          console.log('FloatingButtons: Found ScrollTop icon:', fullUrl);
          setScrollTopIconUrl(fullUrl);
        }
      });
    } else {
      console.log('FloatingButtons: No logos found in ContentfulProvider');
    }
  }, [logos]);

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
              src={scrollTopIconUrl}
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
          src={whatsappIconUrl}
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