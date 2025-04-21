'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that handles media queries
 * 
 * @param query The media query to match against (e.g. '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  // Default to false on the server to prevent hydration mismatch
  const [matches, setMatches] = useState(false);
  // Track if the hook has been mounted to handle server/client differences
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Check if window is available (client-side only)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set the initial value
      setMatches(media.matches);
      
      // Define the callback
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      
      // Add the listener
      media.addEventListener('change', listener);
      
      // Clean up the listener on unmount
      return () => {
        media.removeEventListener('change', listener);
      };
    }
  }, [query]); // Only re-run if the query changes

  // Return false during SSR and true value after mounting
  return hasMounted ? matches : false;
};

export default useMediaQuery; 