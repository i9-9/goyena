'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SeoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const SeoImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes
}: SeoImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Create a descriptive alt text if missing
  const safeAlt = alt || 'Imagen del proyecto Goyena en Caballito';
  
  // Check if sizes is provided when fill=true
  useEffect(() => {
    if (fill && !sizes && process.env.NODE_ENV === 'development') {
      console.warn('SeoImage: "sizes" attribute is recommended when using fill={true}');
    }
  }, [fill, sizes]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <>
      {!error ? (
        <div className={`${className} ${!loaded ? 'bg-gray-200 animate-pulse' : ''}`}>
          <Image
            src={src}
            alt={safeAlt}
            width={fill ? undefined : (width || 400)}
            height={fill ? undefined : (height || 300)}
            fill={fill}
            className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            priority={priority}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      ) : (
        <div className={`${className} flex items-center justify-center bg-gray-200 text-gray-600 font-medium`}>
          Imagen no disponible
        </div>
      )}
    </>
  );
};

export default SeoImage; 