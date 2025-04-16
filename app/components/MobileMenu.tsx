'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Lista de items de navegación
const NAV_ITEMS = [
  { label: 'UBICACIÓN', href: '/ubicacion' },
  { label: 'EL PROYECTO', href: '/proyecto' },
  { label: 'GOYENA', href: '/' },
  { label: 'DEPARTAMENTOS', href: '/unidades' },
  { label: 'CONTACTO', href: '/contacto' },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Variantes para las animaciones
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: "1.25rem" },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <motion.button
        className="fixed top-[1.5rem] left-[1.5rem] z-50 w-[2.5rem] h-[2.5rem] flex flex-col justify-center items-center md:hidden"
        onClick={toggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative w-[1.5rem] h-[1.5rem] flex items-center justify-center">
          <span 
            className={`absolute block w-[1.5rem] h-[0.125rem] ${isOpen ? 'bg-[#768064]' : 'bg-[#2C3424]'} transition-all duration-300 ${isOpen ? 'rotate-45' : 'translate-y-[-0.375rem]'}`}
          ></span>
          <span 
            className={`absolute block w-[1.5rem] h-[0.125rem] ${isOpen ? 'bg-[#768064] opacity-0' : 'bg-[#2C3424] opacity-100'} transition-all duration-300`}
          ></span>
          <span 
            className={`absolute block w-[1.5rem] h-[0.125rem] ${isOpen ? 'bg-[#768064]' : 'bg-[#2C3424]'} transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-[0.375rem]'}`}
          ></span>
        </div>
      </motion.button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-[#2C3424] z-40 flex items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.ul className="flex flex-col items-center justify-center gap-[3.5rem]">
              {NAV_ITEMS.map((item, index) => (
                <motion.li 
                  key={item.href}
                  variants={itemVariants}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + (index * 0.1) 
                  }}
                >
                  <Link 
                    href={item.href} 
                    className="font-arizona-light text-[1.5rem] text-[#768064] tracking-[0.2em] uppercase leading-none"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu; 