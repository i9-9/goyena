'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useContentful } from '../ContentfulProvider';

const ConstructionProgress = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { constructionVideo } = useContentful();

  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Load the first frame of the video
  useEffect(() => {
    if (videoRef.current) {
      // Set to a small value to show the first frame
      videoRef.current.currentTime = 0.1;
    }
  }, []);

  // Add event listeners for video state changes
  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleEnd = () => setIsPlaying(false);
    
    if (videoElement) {
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('ended', handleEnd);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('ended', handleEnd);
      }
    };
  }, []);

  // If constructionVideo is null or isVisible is false, don't render the component
  if (!constructionVideo || constructionVideo.isVisible === false) {
    return null;
  }

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Get video URL from Contentful or fallback to static assets
  const getVideoUrl = () => {
    if (constructionVideo && constructionVideo.video && constructionVideo.video.fields && constructionVideo.video.fields.file) {
      return `https:${constructionVideo.video.fields.file.url}`;
    }
    
    // Fallback to static assets
    return "/video/mobile_vid.mp4";
  };

  return (
    <section className="relative w-full bg-[#C4C1AF] py-16 pb-24 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-seasons-regular text-3xl md:text-5xl text-[#2C3424] uppercase mb-10">
            Mirá los avances<br />de obra
          </h2>
        </motion.div>

        <motion.div
          className="relative w-full pb-12 md:pb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Video with play button */}
          <div 
            className={`relative mx-auto ${isMobile ? 'w-full h-[500px]' : 'w-[80%] h-[450px]'} bg-[#2C3424]/20 shadow-xl flex justify-center items-center overflow-hidden cursor-pointer`}
            onClick={handlePlayVideo}
          >
            <video 
              ref={videoRef}
              className="absolute w-full h-full object-cover"
              src={getVideoUrl()}
              playsInline
              preload="auto"
              muted
              loop
            />
            
            {/* Play button - only shown when video is not playing */}
            {!isPlaying && (
              <div className="absolute z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                {/* Triangle play icon */}
                <div 
                  className="w-0 h-0 border-y-[30px] border-y-transparent border-l-[50px] border-l-white opacity-80"
                  style={{ 
                    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.3))',
                    transform: 'translateX(5px)'
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConstructionProgress; 