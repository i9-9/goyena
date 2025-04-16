'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Animación específica para las líneas del formulario
const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (i: number) => ({ 
    scaleX: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      delay: 0.3 + (i * 0.1)
    }
  })
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    busqueda: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Referencias para controlar cuándo están en viewport
  const formContainerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Detectar cuando cada elemento está en el viewport
  const isFormContainerInView = useInView(formContainerRef, { once: true, amount: 0.3 });
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.8 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isEmailInView = useInView(emailRef, { once: true, amount: 1 });
  const isButtonInView = useInView(buttonRef, { once: true, amount: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Here you would typically send the form data to an API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        busqueda: '',
        mensaje: ''
      });
    } catch {
      setSubmitError('Hubo un error al enviar el formulario. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/bg_contact.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <motion.div 
          ref={formContainerRef}
          className="w-full max-w-[600px] bg-[#EFEFE9] rounded-[2rem] p-8 md:p-10 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isFormContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            ref={headerRef}
            className="font-seasons-regular text-[2.75rem] md:text-[3.5rem] text-[#2C3424] text-center mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            HABLEMOS
          </motion.h2>
          
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
          >
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              <motion.div variants={itemVariants}>
                <label htmlFor="nombre" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Nombre*</label>
                <div className="relative">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                    custom={0}
                    variants={lineVariants}
                    initial="hidden"
                    animate={isFormInView ? "visible" : "hidden"}
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="apellido" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Apellido*</label>
                <div className="relative">
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                    custom={1}
                    variants={lineVariants}
                    initial="hidden"
                    animate={isFormInView ? "visible" : "hidden"}
                  />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              <motion.div variants={itemVariants}>
                <label htmlFor="telefono" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Teléfono</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                    custom={2}
                    variants={lineVariants}
                    initial="hidden"
                    animate={isFormInView ? "visible" : "hidden"}
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                    custom={3}
                    variants={lineVariants}
                    initial="hidden"
                    animate={isFormInView ? "visible" : "hidden"}
                  />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-1">
              <label htmlFor="busqueda" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">¿Qué estás buscando?</label>
              <div className="relative">
                <select
                  id="busqueda"
                  name="busqueda"
                  value={formData.busqueda}
                  onChange={handleChange}
                  className="w-full bg-transparent pb-1 focus:outline-none appearance-none font-goudy-regular text-base pr-8"
                >
                  <option value="">Seleccionar</option>
                  <option value="casa">Casa urbana</option>
                  <option value="departamento">Departamento</option>
                  <option value="información">Información general</option>
                </select>
                <motion.div 
                  className="absolute right-2 bottom-3 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isFormInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L8 8L15 1" stroke="#2C3424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                  custom={4}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isFormInView ? "visible" : "hidden"}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-4">
              <label htmlFor="mensaje" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Mensaje</label>
              <div className="relative">
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={1}
                  className="w-full bg-transparent pb-1 focus:outline-none resize-none font-goudy-regular text-base"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2C3424]"
                  custom={5}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isFormInView ? "visible" : "hidden"}
                />
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex justify-between items-center mt-10"
            >
              <motion.div 
                ref={emailRef}
                className="text-sm text-[#2C3424]"
                initial={{ opacity: 0, x: -5 }}
                animate={isEmailInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <a href="mailto:comercial@grupoportland.com" className="hover:underline font-goudy-regular">
                  comercial@grupoportland.com
                </a>
              </motion.div>
              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2C3424] text-white py-2 px-12 rounded-full font-seasons-regular text-sm hover:bg-opacity-90 transition-all"
                initial={{ opacity: 0, x: 5 }}
                animate={isButtonInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 5 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </motion.button>
            </motion.div>
            
            {submitSuccess && (
              <motion.div 
                className="text-green-600 text-center font-seasons-regular"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                ¡Gracias por contactarnos! Nos comunicaremos a la brevedad.
              </motion.div>
            )}
            
            {submitError && (
              <motion.div 
                className="text-red-600 text-center font-seasons-regular"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {submitError}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm; 