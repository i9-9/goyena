'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  // Desktop images (landscape)
  const desktopImages = [
    '/images/carousel/1.png',
    '/images/carousel/2.png',
    '/images/carousel/3.png',
    '/images/carousel/5.jpg',
    '/images/carousel/6.jpg',
    '/images/carousel/7.jpg',
    '/images/carousel/8.jpg',
    '/images/carousel/9.jpg',
    '/images/carousel/10.jpg',
    '/images/carousel/11.jpg',
  ];
  
  // Mobile images (portrait)
  const mobileImages = [
    '/images/carousel/mobile/1_mobile.png',
    '/images/carousel/mobile/2_mobile.png',
    '/images/carousel/mobile/3_mobile.png',
    '/images/carousel/5.jpg',
    '/images/carousel/6.jpg',
    '/images/carousel/7.jpg',
    '/images/carousel/8.jpg',
    '/images/carousel/9.jpg',
    '/images/carousel/10.jpg',
    '/images/carousel/11.jpg',
  ];
  
  // Determine which images to use based on screen size
  const images = isMobile ? mobileImages : desktopImages;

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial mount
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Verify images exist before using them
  const getImageSrc = (index: number) => {
    if (!images || images.length === 0) {
      return '/images/placeholder.jpg';
    }
    
    const normalizedIndex = ((index % images.length) + images.length) % images.length;
    return images[normalizedIndex] || '/images/placeholder.jpg';
  };

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Animation variants for smoother transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-5%' : '5%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section className="relative w-full h-screen bg-[#D7DBD6] overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Container for the layered images effect */}
      <div className="relative w-full max-w-[1200px] h-[65vh] md:h-[60vh] mx-auto">
        {/* Create staggered image stack effect */}
        <div className="relative h-full w-full flex justify-center items-center">
          {/* Left side image */}
          <motion.div 
            className="absolute w-[90%] h-[90%] z-10 shadow-2xl"
            style={{ 
              left: '5%',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
            }}
            animate={{
              x: '-20%',
              scale: 0.9,
              opacity: 0.85,
              rotateY: '3deg'
            }}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 30,
              duration: 0.8
            }}
          >
            <Image
              src={getImageSrc(activeIndex + images.length - 1)}
              alt="Previous image"
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Main carousel image (center) */}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full z-30 shadow-2xl"
              style={{ 
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4)'
              }}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 }
              }}
            >
              <Image
                src={getImageSrc(activeIndex)}
                alt={`Carousel image ${activeIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Right side image */}
          <motion.div 
            className="absolute w-[90%] h-[90%] z-20 shadow-2xl"
            style={{ 
              right: '5%',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
            }}
            animate={{
              x: '20%',
              scale: 0.9,
              opacity: 0.85,
              rotateY: '-3deg'
            }}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 30,
              duration: 0.8
            }}
          >
            <Image
              src={getImageSrc(activeIndex + 1)}
              alt="Next image"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 mt-12">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-5 h-5 rounded-full border-2 border-[#2C3424] transition-all ${
              index === activeIndex ? 'bg-[#2C3424]' : 'bg-transparent'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel; 