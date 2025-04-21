'use client';

import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for lazy loading components when they enter the viewport
 * 
 * @param options Configuration options for the IntersectionObserver
 * @returns An object containing the ref to attach and whether the element is visible
 */
const useLazyLoad = ({
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true
}: UseLazyLoadOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const wasTriggered = useRef(false);

  useEffect(() => {
    // Skip if already triggered once and triggerOnce is true
    if (triggerOnce && wasTriggered.current) return;

    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Fallback if IntersectionObserver is not available
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          wasTriggered.current = true;
          
          // Unobserve the element if triggerOnce is true
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
};

export default useLazyLoad; 