'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  return (
    <footer className="bg-[#21261B] text-white py-10 md:py-14">
      {isMobile ? (
        // Mobile Footer Layout
        <motion.div 
          className="container mx-auto px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <motion.div variants={logoAnimation}>
              <Link href="/" className="inline-block mb-12">
                <Image 
                  src="/logo/logo.svg" 
                  alt="Goyena" 
                  width={280} 
                  height={90} 
                  className="h-auto" 
                />
              </Link>
            </motion.div>
            
            {/* Navigation Links */}
            <motion.div 
              className="flex flex-col items-center space-y-2 mb-12"
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
            
            {/* Portland Section */}
            <motion.div 
              className="flex flex-col items-center mb-10"
              variants={fadeIn}
            >
              <p className="text-white/80 uppercase text-xs font-acumin-regular mb-3">DESARROLLA Y CONSTRUYE</p>
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
                />
              </motion.a>
              
              <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">
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
                className="flex justify-center space-x-5 mb-10"
                variants={staggerChildren}
              >
                <motion.a 
                  href="#" 
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
                    className="h-auto" 
                  />
                </motion.a>
                <motion.a 
                  href="#" 
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
                    className="h-auto" 
                  />
                </motion.a>
                <motion.a 
                  href="#" 
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
                    className="h-auto" 
                  />
                </motion.a>
                <motion.a 
                  href="#" 
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
                    className="h-auto" 
                  />
                </motion.a>
                <motion.a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src="/rrss/whatsapp.svg" 
                    alt="WhatsApp" 
                    width={22} 
                    height={22} 
                    className="h-auto" 
                  />
                </motion.a>
              </motion.div>
              
              {/* Archmonkey Section */}
              <p className="text-white/80 uppercase text-xs font-acumin-regular mb-2">PROYECTO</p>
              <motion.a 
                href="https://archmonkey.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-acumin-regular text-3xl uppercase tracking-wide">ARCHMONKEY</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Desktop Footer Layout
        <motion.div 
          className="container mx-auto px-6 md:px-10 max-w-[1400px] relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex justify-between items-start">
            {/* First column - Logo and navigation links */}
            <motion.div 
              className="w-1/4 flex flex-col items-start"
              variants={fadeIn}
            >
              {/* Goyena logo and navigation in a horizontal layout */}
              <div className="flex items-center">
                <motion.div variants={logoAnimation} className="mr-8">
                  <Link href="/" className="inline-block">
                    <Image 
                      src="/logo/logo.svg" 
                      alt="Goyena" 
                      width={350} 
                      height={110} 
                      className="h-auto" 
                    />
                  </Link>
                </motion.div>
                
                {/* Line and Navigation links vertical stack */}
                <div className="flex items-center h-full">
                  <motion.div 
                    className="flex flex-col items-start space-y-[2px]"
                    variants={staggerChildren}
                  >
                    <motion.div variants={linkAnimation} whileHover="hover">
                      <Link href="#ubicacion" className="text-sm text-white/80 font-acumin-light uppercase tracking-wider hover:text-white transition-colors leading-none">
                        UBICACIÓN
                      </Link>
                    </motion.div>
                    <motion.div variants={linkAnimation} whileHover="hover">
                      <Link href="#proyecto" className="text-sm text-white/80 font-acumin-light uppercase tracking-wider hover:text-white transition-colors leading-none">
                        PROYECTO
                      </Link>
                    </motion.div>
                    <motion.div variants={linkAnimation} whileHover="hover">
                      <Link href="#contacto" className="text-sm text-white/80 font-acumin-light uppercase tracking-wider hover:text-white transition-colors leading-none">
                        CONTACTO
                      </Link>
                    </motion.div>
                  </motion.div>
                  <div className="w-[2px] h-24 bg-[#E5DED3] self-stretch ml-8"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Second column - Portland section */}
            <motion.div 
              className="w-2/5 flex flex-row justify-center gap-8"
              variants={fadeIn}
            >
              {/* Portland Logo Section */}
              <div className="flex flex-col items-center">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-3">DESARROLLA Y CONSTRUYE</p>
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
                  />
                </motion.a>
              </div>
              
              {/* Portland Social Links Section */}
              <div className="flex flex-col items-start">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-4">
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
                  className="flex flex-row items-center space-x-4"
                  variants={staggerChildren}
                >
                  <motion.a 
                    href="#" 
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
                    href="#" 
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
                    href="#" 
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
                    href="#" 
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
                  <motion.a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="WhatsApp"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/rrss/whatsapp.svg" 
                      alt="WhatsApp" 
                      width={22}
                      height={22} 
                      className="h-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Third column - Archmonkey section */}
            <motion.div 
              className="w-1/4 flex items-start"
              variants={fadeIn}
            >
              <div className="w-[2px] h-24 bg-[#E5DED3] self-stretch ml-20 mr-8"></div>
              <div className="text-left">
                <p className="text-white/80 uppercase text-xs font-acumin-regular mb-3">PROYECTO</p>
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
                    width={230}
                    height={48}
                    className="h-auto" 
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </footer>
  );
};

export default Footer; 