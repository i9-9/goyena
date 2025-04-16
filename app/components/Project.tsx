'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp = ({ end, duration = 2000, className }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

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

    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Usar una función de aceleración para hacer la animación más natural
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(easeOutQuart * end));

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
  }, [end, duration, inView]);

  return <span ref={countRef} className={className}>{count}</span>;
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
            <motion.h2 
              className="font-seasons-regular text-[2.5rem] md:text-[4rem] text-[#2C3424] uppercase mb-6 md:mb-12 leading-[1.1]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Conocé<br />
              El Proyecto
            </motion.h2>
            
            <p className="font-goudy-regular text-[1.125rem] text-[#2C3424] leading-tight tracking-normal mb-8 md:mb-10 max-w-[90%] md:max-w-none mx-auto md:mx-0 md:px-0">
              Goyena busca maximizar el uso del espacio en el centro de la manzana, creando un entorno residencial moderno que promueva la vida comunitaria y el contacto con la naturaleza.
            </p>
            
            <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-3 mb-10 md:mb-0 md:mt-auto md:flex-col w-full">
              <button className="bg-[#959581] border border-[#2C3424]/20 text-white font-seasons-light text-[0.875rem] md:text-[1rem] uppercase tracking-[0.1em] py-[0.3rem] md:py-[0.375rem] px-[1.25rem] md:px-[1.5rem] rounded-full transition-opacity hover:opacity-80 w-fit">
                Descargar Plantas
              </button>
              <button className="bg-[#959581] border border-[#2C3424]/20 text-white font-seasons-light text-[0.875rem] md:text-[1rem] uppercase tracking-[0.1em] py-[0.3rem] md:py-[0.375rem] px-[1.25rem] md:px-[1.5rem] rounded-full transition-opacity hover:opacity-80 w-fit">
                Descargar Brochure
              </button>
            </div>
          </div>
          
          {/* Columna de imagen - Versión desktop */}
          <motion.div
            className="hidden md:block w-full h-[550px] md:h-[600px] relative rounded-none overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
          <div className="w-full h-px bg-[#2C3424]/30 my-8"></div>
          {/* Estadísticas en formato móvil: una debajo de otra con líneas separadoras */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none">
                <CountUp end={68} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Casas Urbanas</p>
            </div>
            <div className="w-full h-px bg-[#2C3424]/30"></div>
            
            <div className="flex justify-between items-center">
              <div className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none">
                <CountUp end={43} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Departamentos</p>
            </div>
            <div className="w-full h-px bg-[#2C3424]/30"></div>
            
            <div className="flex justify-between items-center">
              <div className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none">2,3,4 &5</div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Ambientes</p>
            </div>
            <div className="w-full h-px bg-[#2C3424]/30"></div>
            
            <div className="flex justify-between items-center">
              <div className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none">
                <CountUp end={1000} duration={2500} className="font-seasons-bold text-[3rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">M² Espacios Verdes</p>
            </div>
          </div>
          <div className="w-full h-px bg-[#2C3424]/30 mt-8 mb-0"></div>
        </div>
        
        {/* Línea inferior y estadísticas para desktop */}
        <div className="hidden md:block">
          <div className="w-full h-px bg-[#2C3424]/30 my-12 md:my-16"></div>
          
          {/* Estadísticas para desktop */}
          <motion.div 
            className="grid grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-left">
              <div className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none">
                <CountUp end={68} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Casas Urbanas</p>
            </div>
            <div className="text-left">
              <div className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none">
                <CountUp end={43} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Departamentos</p>
            </div>
            <div className="text-left">
              <div className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none">2,3,4 &5</div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">Ambientes</p>
            </div>
            <div className="text-left">
              <div className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none">
                <CountUp end={1000} duration={2500} className="font-seasons-bold text-[3.5rem] text-[#2C3424] leading-none" />
              </div>
              <p className="font-goudy-regular text-[0.875rem] text-[#768064] uppercase tracking-wider">M² Espacios Verdes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Project; 