'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getHeroImage, getProjectImage, getCarouselImages, getConstructionVideo, getLogos } from './lib/contentful';

// Define interfaces for Contentful content types
interface Asset {
  fields: {
    file: {
      url: string;
      details?: {
        size?: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
    title?: string;
    description?: string;
  };
}

interface HeroImage {
  title: string;
  description?: string;
  image: {
    fields: Asset['fields'];
  };
  mobileImage?: {
    fields: Asset['fields'];
  };
}

interface ProjectImage {
  title: string;
  description?: string;
  image: {
    fields: Asset['fields'];
  };
  floorPlanPdf?: {
    fields: Asset['fields'];
  };
  brochurePdf?: {
    fields: Asset['fields'];
  };
}

interface CarouselImage {
  title: string;
  description?: string;
  image: {
    fields: Asset['fields'];
  };
  order: number;
}

interface ConstructionVideo {
  title: string;
  description?: string;
  video: {
    fields: Asset['fields'];
  };
  thumbnail?: {
    fields: Asset['fields'];
  };
  isVisible?: boolean;
}

interface Logo {
  title: string;
  description?: string;
  logo: {
    fields: Asset['fields'];
  };
  altText?: string;
  type?: string | {
    content: Array<{
      content: Array<{
        value: string;
        nodeType?: string;
      }>;
      nodeType?: string;
    }>;
    nodeType: string;
  }; // Puede ser string o RichText
}

// Define the context type with proper interfaces
interface ContentfulContextType {
  heroImage: HeroImage | null;
  projectImage: ProjectImage | null;
  carouselImages: CarouselImage[];
  constructionVideo: ConstructionVideo | null;
  logos: Logo[];
  loading: boolean;
  error: string | null;
}

// Create context with default values
const ContentfulContext = createContext<ContentfulContextType>({
  heroImage: null,
  projectImage: null,
  carouselImages: [],
  constructionVideo: null,
  logos: [],
  loading: true,
  error: null,
});

// Hook to use the context
export const useContentful = () => useContext(ContentfulContext);

// Provider component
export default function ContentfulProvider({ children }: { children: ReactNode }) {
  const [contentfulData, setContentfulData] = useState<ContentfulContextType>({
    heroImage: null,
    projectImage: null,
    carouselImages: [],
    constructionVideo: null,
    logos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        console.log('Fetching data from Contentful...');
        // Fetch all data in parallel
        const [heroImage, projectImage, carouselImages, constructionVideo, logos] = await Promise.all([
          getHeroImage().catch(err => {
            console.error('Error fetching hero image:', err);
            return null;
          }),
          getProjectImage().catch(err => {
            console.error('Error fetching project image:', err);
            return null;
          }),
          getCarouselImages().catch(err => {
            console.error('Error fetching carousel images:', err);
            return [];
          }),
          getConstructionVideo().catch(err => {
            console.error('Error fetching construction video:', err);
            return null;
          }),
          getLogos().catch(err => {
            console.error('Error fetching logos:', err);
            return [];
          }),
        ]);

        console.log('Data fetched successfully!');
        console.log('Hero Image:', heroImage ? 'Available' : 'Not available');
        console.log('Project Image:', projectImage ? 'Available' : 'Not available');
        console.log('Carousel Images:', carouselImages.length);
        console.log('Construction Video:', constructionVideo ? 'Available' : 'Not available');
        console.log('Logos:', logos.length);

        setContentfulData({
          heroImage,
          projectImage,
          carouselImages,
          constructionVideo,
          logos,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
        // Still provide data structure even on error
        setContentfulData({
          heroImage: null,
          projectImage: null,
          carouselImages: [],
          constructionVideo: null,
          logos: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchContentfulData();
  }, []);

  return (
    <ContentfulContext.Provider value={contentfulData}>
      {children}
    </ContentfulContext.Provider>
  );
} 