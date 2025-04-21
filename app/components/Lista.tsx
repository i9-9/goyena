'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedText = ({ text, className, delay = 0 }: { text: string, className: string, delay?: number }) => {
  // Create an array of characters
  const characters = Array.from(text);
  
  // Animation variants for each character
  const characterAnimation = {
    hidden: { 
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * 0.05,
        duration: 0.3,
      },
    }),
  };
  
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={characterAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          aria-hidden="true"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const Lista = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Animation variants
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      x: 5,
      transition: { duration: 0.2 }
    }
  };
  
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.15,
      backgroundColor: "#8C8573",
      transition: { 
        duration: 0.2,
        backgroundColor: { duration: 0.3 }
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.2,
        duration: 0.4
      }
    }),
    hover: {
      y: 0,
      color: "#ffffff",
      textShadow: "0px 0px 8px rgba(255,255,255,0.3)",
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <section aria-labelledby="lista-section-title" className="relative w-full h-screen">
      {/* Hidden H1 for SEO and screen readers */}
      <h1 id="lista-section-title" className="sr-only">Goyena - Casas Urbanas y Departamentos en Caballito</h1>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lista/bg_lista.png"
          alt="Vista panorámica del proyecto Goyena en Caballito"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Top section with list */}
      <motion.div 
        className="absolute top-0 inset-x-0 h-1/2 z-10 flex flex-col justify-center pl-[10%] md:pl-[15%]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-[600px]">
          <h2 className="sr-only">Características del proyecto</h2>
          <div className="space-y-6">
            {[
              { number: 1, text: "Casas urbanas" },
              { number: 2, text: "Edificio multifamiliar" },
              { number: 3, text: "Espacios comunes" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center"
                custom={index}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div 
                  className="flex justify-center items-center w-10 h-10 rounded-full bg-[#666356] text-white mr-4"
                  custom={index}
                  variants={circleVariants}
                >
                  <span className="font-seasons-light text-lg">{item.number}</span>
                </motion.div>
                <motion.span 
                  className="text-2xl md:text-2xl text-white font-goudy-regular"
                  custom={index}
                  variants={textVariants}
                >
                  {item.text}
                </motion.span>
                
                {/* Animated line that appears on hover */}
                <motion.div 
                  className="h-px bg-white/60 ml-4 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '40px' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Bottom section with text */}
      <motion.div 
        className="absolute bottom-0 inset-x-0 h-1/2 z-10 flex flex-col justify-center items-center text-center text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-[800px] px-4">
          <div className="mb-3">
            <AnimatedText 
              text="Naturaleza" 
              className="text-base md:text-base uppercase tracking-wider font-goudy-regular"
              delay={0.2}
            />
          </div>
          <h2 className="text-5xl lg:text-6xl font-seasons-regular uppercase leading-tight mb-2">
            <AnimatedText 
              text="Un jardín" 
              className="block"
              delay={0.5}
            />
            <AnimatedText 
              text="lleno de vida" 
              className="block"
              delay={1.0}
            />
            <AnimatedText 
              text="en el corazón" 
              className="block"
              delay={1.5}
            />
            <AnimatedText 
              text="de caballito" 
              className="block"
              delay={2.0}
            />
          </h2>
          <div className="mt-2">
            <AnimatedText 
              text="Ciudad" 
              className="text-base md:text-base uppercase tracking-wider font-goudy-regular"
              delay={2.5}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Lista; 