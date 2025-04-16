'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Spotlight Effect Component with fixed overflow
const SpotlightText = ({ 
  children, 
  className, 
  duration = 3.5, 
  delay = 0,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  baseColor = "rgba(44, 52, 36, 0.85)",
  repeatDelay = 4 // Increased delay between repetitions
}: { 
  children: React.ReactNode, 
  className?: string, 
  duration?: number,
  delay?: number,
  spotlightColor?: string,
  baseColor?: string,
  repeatDelay?: number
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (textRef.current && !hasInitialized) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setHasInitialized(true);
    }

    const handleResize = () => {
      if (textRef.current) {
        const { width, height } = textRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasInitialized]);

  const spotlightSize = Math.max(dimensions.width * 0.8, 300); 

  return (
    <div className={`relative overflow-hidden ${className || ''}`} ref={textRef}>
      {/* Base text - muted version */}
      <div className="relative z-10" style={{ color: baseColor }}>
        {children}
      </div>
      
      {/* Spotlight overlay - contained within parent */}
      {hasInitialized && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          initial={{ x: -spotlightSize }}
          animate={{ x: dimensions.width + spotlightSize }}
          transition={{
            duration,
            delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay
          }}
        >
          <div
            className="absolute rounded-full blur-[40px]"
            style={{
              width: `${spotlightSize}px`,
              height: `${spotlightSize}px`,
              background: `radial-gradient(ellipse at center, ${spotlightColor} 0%, rgba(255,255,255,0) 70%)`,
              left: `-${spotlightSize / 2}px`,
              top: `-${(spotlightSize - dimensions.height) / 2}px`,
              mixBlendMode: 'overlay',
              opacity: 0.9,
            }}
          ></div>
        </motion.div>
      )}
      
      {/* Bright text that will be revealed by the spotlight - more subtle now */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          color: '#2C3424',
          maskImage: `linear-gradient(to right, transparent, transparent)`,
          WebkitMaskImage: `linear-gradient(to right, transparent, transparent)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Splash Screen Component
const SplashScreen = ({ finishLoading }: { finishLoading: () => void }) => {
  useEffect(() => {
    // Automatically dismiss splash screen after animation (3s)
    const timer = setTimeout(() => {
      finishLoading();
    }, 3000);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent">
      {/* Left door */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#2C3424]"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 1.6 }}
        style={{ originX: 0 }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-[0.5px] bg-[#BDBEAE] opacity-40"></div>
      </motion.div>

      {/* Right door */}
      <motion.div 
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#2C3424]"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 1.6 }}
        style={{ originX: 1 }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-[0.5px] bg-[#BDBEAE] opacity-40"></div>
      </motion.div>

      {/* Logo centered (without text) */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <div className="w-[60px] h-[60px] bg-white" style={{ 
          maskImage: 'url(/logo/icon.svg)', 
          WebkitMaskImage: 'url(/logo/icon.svg)', 
          maskSize: 'contain', 
          WebkitMaskSize: 'contain', 
          maskRepeat: 'no-repeat', 
          WebkitMaskRepeat: 'no-repeat', 
          maskPosition: 'center', 
          WebkitMaskPosition: 'center' 
        }}></div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Detect mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen finishLoading={() => setLoading(false)} />}
      </AnimatePresence>

      <section id="hero" className={`relative w-full ${isMobile ? 'h-screen' : 'h-[calc(100vh-6.25rem)]'} flex items-center justify-center bg-[#D7DBD6] overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <Image
            src={isMobile ? "/images/hero/mobile_hero.jpg" : "/images/hero/desktop.jpg"}
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <motion.div 
          className={`relative z-10 flex flex-col items-center ${isMobile ? 'mt-[-50vh]' : ''} justify-center gap-[1.5rem] text-[#2C3424] w-full px-4`}
          initial={{ opacity: 0, y: "1.25rem" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: loading ? 2.5 : 0 }}
        >
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: loading ? 2.7 : 0.2 }}
          >
            <SpotlightText 
              className="font-goudy-regular text-sm md:text-base tracking-[0.2em] uppercase" 
              delay={loading ? 3.3 : 1}
              duration={2}
              repeatDelay={5}
            >
              CABALLITO
            </SpotlightText>
          </motion.div>
          
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: loading ? 2.9 : 0.4 }}
          >
            <div className="relative overflow-hidden">
              <Image 
                src="/logo/logo.svg" 
                alt="Goyena"
                width={isMobile ? 280 : 600}
                height={isMobile ? 100 : 200}
                className="h-auto object-contain opacity-70"
                style={{ filter: 'brightness(0) saturate(100%) invert(17%) sepia(11%) saturate(1000%) hue-rotate(70deg) brightness(99%) contrast(91%)' }}
              />
              
              {/* Spotlight effect for the logo */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                initial={{ x: -300 }}
                animate={{ x: isMobile ? 300 : 650 }}
                transition={{
                  duration: 4,
                  delay: loading ? 3.8 : 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              >
                <div
                  className="absolute rounded-full blur-[60px]"
                  style={{
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    left: `-200px`,
                    top: `-200px`,
                    mixBlendMode: 'overlay',
                    opacity: 0.9,
                  }}
                ></div>
              </motion.div>
              
              {/* Bright version of the logo that appears with spotlight */}
              <Image 
                src="/logo/logo.svg" 
                alt=""
                width={isMobile ? 280 : 600}
                height={isMobile ? 100 : 200}
                className="h-auto object-contain absolute inset-0"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(17%) sepia(11%) saturate(1000%) hue-rotate(70deg) brightness(120%) contrast(100%)',
                  opacity: 0.9,
                  mixBlendMode: 'lighten'
                }}
              />
            </div>
          </motion.div>
          
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: loading ? 3.1 : 0.6 }}
          >
            <SpotlightText 
              className="font-seasons-bold text-[1.25rem] md:text-[2.5rem] uppercase mt-0"
              delay={loading ? 3.4 : 2}
              duration={2}
              repeatDelay={5}
            >
              CASAS URBANAS
            </SpotlightText>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero; 