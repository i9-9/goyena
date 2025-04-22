'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// We need to use client for Framer Motion, but metadata won't be used in this case
// Since Next.js applies the viewport from layout.tsx, we don't need to export it again here

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/" className="inline-block">
            <Image 
              src="/logo/logo.svg" 
              alt="Goyena" 
              width={250}
              height={80}
              className="h-auto"
              priority
            />
          </Link>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-seasons-regular text-[#2C3424] mb-6"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-seasons-regular text-[#2C3424] mb-4"
        >
          Página no encontrada
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-[#2C3424]/80 mb-10 font-arizona"
        >
          Lo sentimos, pero la página que estás buscando no existe o ha sido movida.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link 
            href="/"
            className="bg-[#959581] border border-[#2C3424]/20 text-white font-seasons-light text-[0.875rem] md:text-[1rem] uppercase tracking-[0.1em] py-[0.5rem] px-[1.75rem] rounded-full transition-all hover:bg-[#2C3424]"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 