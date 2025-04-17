'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  delay?: number;
}

const CountUp = ({ end, duration = 2500, className, delay = 0 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    // Add initial delay before starting the animation
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [inView, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Enhanced easing function for a more pronounced animation
      // Using elastic-out for a subtle bounce effect at the end
      const elasticOut = (x: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0
          ? 0
          : x === 1
          ? 1
          : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
      };
      
      // Combine easeOutQuart with a touch of elasticOut for a subtle bounce effect
      const combinedEase = percentage < 0.85 
        ? 1 - Math.pow(1 - percentage, 4) // easeOutQuart for most of the animation
        : elasticOut((percentage - 0.85) / 0.15); // elastic for the last bit
      
      setCount(Math.floor(combinedEase * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasStarted]);

  return (
    <motion.span 
      ref={countRef} 
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {count}
    </motion.span>
  );
};

// Animation variants for text elements
const textFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom,
    }
  })
};

// Character-by-character blur animation like in Lista.tsx
const BlurredText = ({ text, className, delay = 0 }: { text: React.ReactNode, className?: string, delay?: number }) => {
  // If text is not a string, just render it directly with animation
  if (typeof text !== 'string') {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, delay }}
        viewport={{ once: true }}
      >
        {text}
      </motion.span>
    );
  }
  
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
        delay: delay + i * 0.02,
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
          style={{ 
            display: 'inline-block',
            marginRight: char === ' ' ? '0.25em' : '0.01em',
            width: char === ' ' ? '0.25em' : 'auto'
          }}
        >
          {char === ' ' ? '' : char}
        </motion.span>
      ))}
    </span>
  );
};

// Animation for stats labels
const StatLabel = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.p 
      className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
};

const Project = () => {
  return (
    <section id="proyecto" className="relative w-full py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* La línea superior se eliminó porque ya existe en ProjectLocation */}
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0, y: "1.25rem" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Columna de texto - en móvil está centrado, en desktop a la izquierda */}
          <div className="flex flex-col text-center md:text-left">
            <div className="mb-6 md:mb-12">
              <motion.span 
                className="block font-seasons-regular text-[2.5rem] md:text-[4rem] text-[#2C3424] uppercase leading-[1.1]"
                custom={0.1}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                Conocé
              </motion.span>
              <motion.span 
                className="block font-seasons-regular text-[2.5rem] md:text-[4rem] text-[#2C3424] uppercase leading-[1.1]"
                custom={0.3}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                El Proyecto
              </motion.span>
            </div>
            
            <div className="font-arizona text-[1.125rem] text-[#2C3424] leading-tight tracking-normal mb-8 md:mb-10 max-w-[90%] md:max-w-none mx-auto md:mx-0 md:px-0">
            <BlurredText 
  text={
    <>
      Goyena busca maximizar el uso del espacio en el centro de la manzana, creando un entorno residencial moderno que
      <br />
      promueva la vida comunitaria y el contacto con la naturaleza.
    </>
  }
  className="font-arizona"
  delay={0.6}
/>

            </div>
            
            <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-3 mb-10 md:mb-0 md:mt-auto md:flex-col w-full">
              <motion.button 
                className="bg-[#959581] border border-[#2C3424]/20 text-white font-seasons-light text-[0.875rem] md:text-[1rem] uppercase tracking-[0.1em] py-[0.3rem] md:py-[0.375rem] px-[1.25rem] md:px-[1.5rem] rounded-full transition-opacity hover:opacity-80 w-fit"
                custom={1.0}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Descargar Plantas
              </motion.button>
              <motion.button 
                className="bg-[#959581] border border-[#2C3424]/20 text-white font-seasons-light text-[0.875rem] md:text-[1rem] uppercase tracking-[0.1em] py-[0.3rem] md:py-[0.375rem] px-[1.25rem] md:px-[1.5rem] rounded-full transition-opacity hover:opacity-80 w-fit"
                custom={1.2}
                variants={textFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Descargar Brochure
              </motion.button>
            </div>
          </div>
          
          {/* Columna de imagen - Versión desktop */}
          <motion.div
            className="hidden md:block w-full h-[550px] md:h-[600px] relative rounded-none overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src="/images/proyecto/edificio.jpg"
              alt="Imagen del Proyecto"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
          
          {/* Columna de imagen - Versión móvil */}
          <motion.div
            className="md:hidden w-full h-[350px] relative rounded-none overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src="/images/proyecto/edificio_mobile.jpg"
              alt="Imagen del Proyecto"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </motion.div>
        
        {/* Líneas separadoras para las estadísticas - Solo visibles en móvil */}
        <div className="block md:hidden">
          <motion.div 
            className="w-full h-px bg-[#2C3424]/30 my-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          
          {/* Estadísticas en formato móvil: una debajo de otra con líneas separadoras */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <motion.div 
                className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <CountUp end={68} duration={3000} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" delay={300} />
              </motion.div>
              <StatLabel delay={0.5}>Casas Urbanas</StatLabel>
            </div>
            <motion.div 
              className="w-full h-px bg-[#2C3424]/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <div className="flex justify-between items-center">
              <motion.div 
                className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <CountUp end={43} duration={2500} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" delay={600} />
              </motion.div>
              <StatLabel delay={0.7}>Departamentos</StatLabel>
            </div>
            <motion.div 
              className="w-full h-px bg-[#2C3424]/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <div className="flex justify-between items-center">
              <motion.div 
                className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
                viewport={{ once: true }}
              >
                2,3,4 &5
              </motion.div>
              <StatLabel delay={0.9}>Ambientes</StatLabel>
            </div>
            <motion.div 
              className="w-full h-px bg-[#2C3424]/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <div className="flex justify-between items-center">
              <motion.div 
                className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <CountUp end={1000} duration={3500} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" delay={900} />
              </motion.div>
              <StatLabel delay={1.1}>M² Espacios Verdes</StatLabel>
            </div>
          </div>
          <motion.div 
            className="w-full h-px bg-[#2C3424]/30 mt-8 mb-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
        
        {/* Línea inferior y estadísticas para desktop */}
        <div className="hidden md:block">
          <motion.div 
            className="w-full h-px bg-[#2C3424]/30 my-12 md:my-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          ></motion.div>
          
          {/* Estadísticas para desktop */}
          <motion.div 
            className="grid grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-left">
              <motion.div 
                className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none mb-1"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CountUp end={68} duration={3000} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" delay={200} />
              </motion.div>
              <StatLabel delay={0.5}>Casas Urbanas</StatLabel>
            </div>
            <div className="text-left">
              <motion.div 
                className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none mb-1"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CountUp end={43} duration={2500} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" delay={500} />
              </motion.div>
              <StatLabel delay={0.6}>Departamentos</StatLabel>
            </div>
            <div className="text-left">
              <motion.div 
                className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none mb-1"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                2,3,4 &5
              </motion.div>
              <StatLabel delay={0.7}>Ambientes</StatLabel>
            </div>
            <div className="text-left">
              <motion.div 
                className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none mb-1"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <CountUp end={1000} duration={3500} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" delay={800} />
              </motion.div>
              <StatLabel delay={0.8}>M² Espacios Verdes</StatLabel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Project; 