'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Location = () => {
  return (
    <section id="ubicacion" className="relative w-full h-[100vh] flex flex-col items-center justify-start pt-16 md:pt-24 px-4">
      <motion.div
        className="relative z-10 max-w-[1200px] w-full mx-auto"
        initial={{ opacity: 0, y: "1.25rem" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="font-seasons-bold text-[2.5rem] md:text-[3.5rem] text-[#2C3424] uppercase mb-[2.5rem] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut" 
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Ubicación
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Versión desktop: horizontal */}
          <div className="hidden md:block w-full max-w-[1000px] relative overflow-hidden border-4 border-[#2C3424] shadow-lg">
            <div className="relative w-full h-[600px] flex">
              {/* Mapa a la izquierda */}
              <div className="w-[65%] h-full bg-[#EEECE5] relative">
                <Image
                  src="/images/ubicacion/mapa.svg"
                  alt="Mapa de Ubicación"
                  fill
                  className="object-cover p-0"
                />
              </div>
              
              {/* Información a la derecha */}
              <div className="w-[35%] h-full bg-[#2C3424] text-white px-12 py-10 flex flex-col text-left justify-center pl-20">
                <h3 className="text-base font-seasons-bold uppercase mb-6">Polo Gastronómico</h3>
                <ul className="text-[1.125rem] leading-tight space-y-2 mb-12">
                  <li className="font-arizona-light">Cucina Paradiso</li>
                  <li className="font-arizona-light">Goyena Grill</li>
                  <li className="font-arizona-light">Salva Cocina</li>
                  <li className="font-arizona-light">LUCE</li>
                  <li className="font-arizona-light">Tía Margarita</li>
                  <li className="font-arizona-light">ROSÉ Restaurant</li>
                  <li className="font-arizona-light">El Desembarco Caballito</li>
                  <li className="font-arizona-light">La Birra Bar</li>
                  <li className="font-arizona-light">Rapa Nui</li>
                </ul>
                
                <h3 className="text-base font-seasons-bold uppercase mb-6">Otros Servicios</h3>
                <ul className="text-[1.125rem] leading-tight space-y-2">
                  <li className="font-arizona-light">Farmacity</li>
                  <li className="font-arizona-light">YPF</li>
                  <li className="font-arizona-light">Jose Maria Moreno - SUBTE E</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Versión mobile: vertical con texto abajo */}
          <div className="md:hidden w-full max-w-[1000px] relative overflow-hidden border-4 border-[#2C3424] shadow-lg">
            <div className="flex flex-col">
              {/* Mapa arriba */}
              <div className="w-full h-[350px] bg-[#EEECE5] relative">
                <Image
                  src="/images/ubicacion/mapa.svg"
                  alt="Mapa de Ubicación"
                  fill
                  className="object-cover p-0"
                />
              </div>
              
              {/* Información abajo - en dos columnas para móvil */}
              <div className="w-full bg-[#2C3424] text-white px-6 py-4">
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <h3 className="text-base font-seasons-bold uppercase mb-3">Polo Gastronómico</h3>
                    <ul className="text-sm leading-tight space-y-1">
                      <li className="font-arizona-light">Cucina Paradiso</li>
                      <li className="font-arizona-light">Goyena Grill</li>
                      <li className="font-arizona-light">Salve Cocina</li>
                      <li className="font-arizona-light">LUCE</li>
                      <li className="font-arizona-light">Tía Margarita</li>
                      <li className="font-arizona-light">ROSÉ Restaurant</li>
                      <li className="font-arizona-light">El Desembarco Caballito</li>
                      <li className="font-arizona-light">La Birra Bar</li>
                      <li className="font-arizona-light">Rapa Nui</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-seasons-bold uppercase mb-3">Otros Servicios</h3>
                    <ul className="text-sm leading-tight space-y-1">
                      <li className="font-arizona-light">Farmacity</li>
                      <li className="font-arizona-light">YPF</li>
                      <li className="font-arizona-light">JoseMaria Moreno - SUBTE E</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Location; 