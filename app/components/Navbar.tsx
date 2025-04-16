'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const NAV_ITEMS = [
  { label: 'UBICACIÓN', href: '#ubicacion' },
  { label: 'EL PROYECTO', href: '#proyecto' },
  { label: 'GOYENA', href: '#hero' },
  { label: 'DEPARTAMENTOS', href: '#unidades' },
  { label: 'CONTACTO', href: '#contacto' },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarPositionRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Función para determinar la posición inicial del navbar
    const getNavbarPosition = () => {
      if (navbarRef.current && navbarPositionRef.current === null) {
        // Guardamos la posición del navbar relativa a la página
        navbarPositionRef.current = navbarRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };

    // Función para manejar el scroll
    const handleScroll = () => {
      if (navbarPositionRef.current === null) {
        getNavbarPosition();
      }
      
      // Si tenemos la posición del navbar, verificamos si debemos hacerlo sticky
      if (navbarPositionRef.current !== null) {
        // Comparamos la posición actual del scroll con la posición del navbar
        setIsSticky(window.scrollY >= navbarPositionRef.current);
      }
    };

    // Establecer posición inicial cuando el componente esté montado
    getNavbarPosition();
    
    // Verificar el scroll inmediatamente después de montar
    handleScroll();
    
    // Agregar el listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Agregar el listener de resize (por si cambia el tamaño de la ventana)
    window.addEventListener('resize', () => {
      // Resetear la posición del navbar cuando cambia el tamaño de la ventana
      navbarPositionRef.current = null;
      getNavbarPosition();
      handleScroll();
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {
        navbarPositionRef.current = null;
      });
    };
  }, []);

  return (
    <div 
      ref={navbarRef}
      className="navbar-container w-full h-[6.25rem] md:block"
    >
      <nav 
        className={`w-full h-[6.25rem] bg-[#2C3424] z-40 flex items-center transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0' : 'relative'
        }`}
      >
        <div className="container mx-auto">
          <ul className="flex items-center justify-center gap-[3rem]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="font-seasons-bold text-base text-[#768064] tracking-normal uppercase hover:opacity-80 transition-opacity"

                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Espacio para mantener el flujo de la página cuando el navbar se vuelve fixed */}
      {isSticky && <div className="h-[6.25rem]"></div>}
    </div>
  );
};

export default Navbar; 