'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
          className="w-full max-w-[600px] bg-[#EFEFE9] rounded-[2rem] p-8 md:p-10 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-seasons-regular text-[2.75rem] md:text-[3.5rem] text-[#2C3424] text-center mb-10">HABLEMOS</h2>
          
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              <div>
                <label htmlFor="nombre" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Nombre*</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Apellido*</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              <div>
                <label htmlFor="telefono" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none font-goudy-regular text-base"
                />
              </div>
            </div>
            
            <div className="mt-1">
              <label htmlFor="busqueda" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">¿Qué estás buscando?</label>
              <div className="relative">
                <select
                  id="busqueda"
                  name="busqueda"
                  value={formData.busqueda}
                  onChange={handleChange}
                  className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none appearance-none font-goudy-regular text-base pr-8"
                >
                  <option value="">Seleccionar</option>
                  <option value="casa">Casa urbana</option>
                  <option value="departamento">Departamento</option>
                  <option value="información">Información general</option>
                </select>
                <div className="absolute right-2 bottom-3 pointer-events-none">
                  <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L8 8L15 1" stroke="#2C3424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="mensaje" className="text-[#2C3424] text-sm font-goudy-regular mb-1 block">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={1}
                className="w-full border-b border-[#2C3424] bg-transparent pb-1 focus:outline-none resize-none font-goudy-regular text-base"
              />
            </div>
            
            <div className="flex justify-between items-center mt-10">
              <div className="text-sm text-[#2C3424]">
                <a href="mailto:comercial@grupoportland.com" className="hover:underline font-goudy-regular">
                  comercial@grupoportland.com
                </a>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2C3424] text-white py-2 px-12 rounded-full font-seasons-regular text-sm hover:bg-opacity-90 transition-all"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            
            {submitSuccess && (
              <div className="text-green-600 text-center font-seasons-regular">
                ¡Gracias por contactarnos! Nos comunicaremos a la brevedad.
              </div>
            )}
            
            {submitError && (
              <div className="text-red-600 text-center font-seasons-regular">
                {submitError}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm; 