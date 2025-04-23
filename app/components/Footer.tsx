'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCallback } from 'react';

const Footer = () => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const logoAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
  };

  const linkAnimation = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hover: { x: 3, transition: { duration: 0.2 } }
  };

  const handleWhatsAppClick = useCallback(() => {
    // Format for WhatsApp API: country code (54) + area code (11) + number without spaces
    const phoneNumber = '5491124955734';
    const message = 'Hola, me interesa obtener más información sobre el proyecto Goyena.';
    // Create the WhatsApp URL with encodeURIComponent for the message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    // Open in a new tab with specific options to ensure it works properly
    window.open(whatsappUrl, '_blank');
  }, []);

  return (
    <footer className="bg-[#21261B] text-white py-10 md:py-14">
      <motion.div
        className="container mx-auto px-6 md:px-10 max-w-[1400px] relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* Mobile Layout - Visible solo en móvil */}
        <div className="md:hidden flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div 
            layoutId="logo" 
            variants={logoAnimation}
            className="mb-8"
          >
            <Link href="/" className="inline-block">
              <Image 
                src="/logo/logo.svg" 
                alt="Goyena" 
                width={400} 
                height={130} 
                className="h-auto"
                priority
              />
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="flex flex-col items-center space-y-4 mb-10"
            variants={staggerChildren}
          >
            <motion.div variants={linkAnimation} whileHover="hover">
              <Link href="#ubicacion" className="text-base text-white font-acumin-light uppercase tracking-wider">
                UBICACIÓN
              </Link>
            </motion.div>
            <motion.div variants={linkAnimation} whileHover="hover">
              <Link href="#proyecto" className="text-base text-white font-acumin-light uppercase tracking-wider">
                PROYECTO
              </Link>
            </motion.div>
            <motion.div variants={linkAnimation} whileHover="hover">
              <Link href="#contacto" className="text-base text-white font-acumin-light uppercase tracking-wider">
                CONTACTO
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="w-28 h-[1px] bg-[#E5DED3] mb-10"></div>
          
          {/* Portland Section */}
          <motion.div 
            className="flex flex-col items-center mb-10"
            variants={fadeIn}
          >
            <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">DESARROLLA Y CONSTRUYE</p>
            <motion.a 
              href="https://grupoportland.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mb-10"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image 
                src="/logo/portland_logo.svg" 
                alt="Portland" 
                width={160}
                height={35}
                className="h-auto" 
                priority
              />
            </motion.a>
            
            <p className="text-white/80 uppercase text-xs font-acumin-regular mb-6">
              <motion.a 
                href="https://grupoportland.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ color: '#ffffff' }}
              >
                GRUPOPORTLAND.COM
              </motion.a>
            </p>
            
            {/* Social Icons */}
            <motion.div 
              className="flex justify-center space-x-6 mb-12"
              variants={staggerChildren}
            >
              <motion.a 
                href="https://www.tiktok.com/@grupo.portland" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/rrss/tiktok.svg" 
                  alt="TikTok" 
                  width={24} 
                  height={24} 
                  className="h-auto" 
                />
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/GrupoPortlandDevelopers/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/rrss/facebook.svg" 
                  alt="Facebook" 
                  width={24} 
                  height={24} 
                  className="h-auto" 
                />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/grupoportland/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/rrss/instagram.svg" 
                  alt="Instagram" 
                  width={24} 
                  height={24} 
                  className="h-auto" 
                />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/company/grupo-portland-intl/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/rrss/linkedin.svg" 
                  alt="LinkedIn" 
                  width={24} 
                  height={24} 
                  className="h-auto" 
                />
              </motion.a>
              <motion.button 
                onClick={handleWhatsAppClick}
                aria-label="WhatsApp"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleWhatsAppClick()}
              >
                <Image 
                  src="/rrss/whatsapp.svg" 
                  alt="WhatsApp" 
                  width={24} 
                  height={24} 
                  className="h-auto" 
                />
              </motion.button>
            </motion.div>
            
            <div className="w-28 h-[1px] bg-[#E5DED3] mb-10"></div>
            
            {/* Archmonkey Section */}
            <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">PROYECTO</p>
            <motion.a 
              href="https://archmonkey.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image 
                src="/logo/archmonkey_logo.svg" 
                alt="Archmonkey" 
                width={180}
                height={38}
                className="h-auto" 
                priority
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Desktop Layout - Visible solo en desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4">
            {/* First column - Logo and navigation links */}
            <motion.div 
              className="grid grid-cols-2 items-center col-span-1"
              variants={fadeIn}
            >
              {/* Logo section */}
              <div className="flex flex-col items-center justify-center">
                <motion.div 
                  layoutId="logo" 
                  variants={logoAnimation}
                >
                  <Link href="/" className="inline-block">
                    <Image 
                      src="/logo/logo.svg" 
                      alt="Goyena" 
                      width={400} 
                      height={130} 
                      className="h-auto" 
                      priority
                    />
                  </Link>
                </motion.div>
              </div>
              
              {/* Navigation links section */}
              <div className="flex items-center justify-center h-full relative">
                <motion.div 
                  className="flex flex-col items-start space-y-[6px]"
                  variants={staggerChildren}
                >
                  <motion.div variants={linkAnimation} whileHover="hover">
                    <Link href="#ubicacion" className="text-sm text-white/80 font-acumin-light uppercase hover:text-white transition-colors leading-none">
                      UBICACIÓN
                    </Link>
                  </motion.div>
                  <motion.div variants={linkAnimation} whileHover="hover">
                    <Link href="#proyecto" className="text-sm text-white/80 font-acumin-light uppercase hover:text-white transition-colors leading-none">
                      PROYECTO
                    </Link>
                  </motion.div>
                  <motion.div variants={linkAnimation} whileHover="hover">
                    <Link href="#contacto" className="text-sm text-white/80 font-acumin-light uppercase hover:text-white transition-colors leading-none">
                      CONTACTO
                    </Link>
                  </motion.div>
                </motion.div>
                <div className="w-[2px] h-28 bg-[#E5DED3] absolute right-0 top-1/2 transform -translate-y-1/2"></div>
              </div>
            </motion.div>
            
            {/* Second column - Portland section */}
            <motion.div
              className="grid grid-cols-2 items-center relative col-span-1 pr-10"
              variants={fadeIn}
            >
              {/* Portland Logo Section */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">DESARROLLA Y CONSTRUYE</p>
                <motion.a 
                  href="https://grupoportland.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src="/logo/portland_logo.svg" 
                    alt="Portland" 
                    width={170}
                    height={35}
                    className="h-auto" 
                    priority
                  />
                </motion.a>
              </div>
              
              {/* Portland Social Links Section */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-5">
                  <motion.a 
                    href="https://grupoportland.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                    whileHover={{ color: '#ffffff' }}
                  >
                    GRUPOPORTLAND.COM
                  </motion.a>
                </p>
                
                <motion.div 
                  className="flex flex-row items-center space-x-3"
                  variants={staggerChildren}
                >
                  <motion.a 
                    href="https://www.tiktok.com/@grupo.portland" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="TikTok"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/rrss/tiktok.svg" 
                      alt="TikTok" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity" 
                    />
                  </motion.a>
                  <motion.a 
                    href="https://www.facebook.com/GrupoPortlandDevelopers/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/rrss/facebook.svg" 
                      alt="Facebook" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/grupoportland/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/rrss/instagram.svg" 
                      alt="Instagram" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/company/grupo-portland-intl/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/rrss/linkedin.svg" 
                      alt="LinkedIn" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                  <motion.button 
                    onClick={handleWhatsAppClick}
                    aria-label="WhatsApp"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleWhatsAppClick()}
                  >
                    <Image 
                      src="/rrss/whatsapp.svg" 
                      alt="WhatsApp" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </motion.button>
                </motion.div>
              </div>
              <div className="w-[2px] h-28 bg-[#E5DED3] absolute right-0 top-1/2 transform -translate-y-1/2"></div>
            </motion.div>

            {/* Third column - Archmonkey section */}
            <motion.div 
              className="flex items-start justify-start col-span-1 pl-10"
              variants={fadeIn}
            >
              <div className="flex flex-col items-start space-y-3 justify-start">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">PROYECTO</p>
                <motion.a 
                  href="https://archmonkey.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/logo/archmonkey_logo.svg" 
                    alt="Archmonkey" 
                    width={180}
                    height={38}
                    className="h-auto"
                    priority
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 