import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Helper function to safely get entries
const safeGetEntries = async (options) => {
  try {
    return await client.getEntries(options);
  } catch (error) {
    console.error(`Error fetching entries for ${options.content_type}:`, error);
    
    // If the content type doesn't exist, return empty data structure
    if (error.message && error.message.includes('unknownContentType')) {
      console.log(`Content type '${options.content_type}' not found. Returning fallback data.`);
      return { items: [] };
    }
    
    throw error;
  }
};

// Get hero image
export const getHeroImage = async () => {
  try {
    const entries = await safeGetEntries({
      content_type: 'heroImage',
      limit: 1,
    });

    return entries.items[0]?.fields || null;
  } catch (error) {
    console.error('Error fetching hero image:', error);
    return null;
  }
};

// Get project image
export const getProjectImage = async () => {
  try {
    const entries = await safeGetEntries({
      content_type: 'projectImage',
      limit: 1,
    });

    return entries.items[0]?.fields || null;
  } catch (error) {
    console.error('Error fetching project image:', error);
    return null;
  }
};

// Get carousel images
export const getCarouselImages = async () => {
  try {
    const entries = await safeGetEntries({
      content_type: 'carouselImage',
      order: 'fields.order',
    });

    return entries.items.map(item => item.fields) || [];
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
};

// Get construction progress video
export const getConstructionVideo = async () => {
  try {
    const entries = await safeGetEntries({
      content_type: 'constructionVideo',
      limit: 1,
    });

    return entries.items[0]?.fields || null;
  } catch (error) {
    console.error('Error fetching construction video:', error);
    return null;
  }
}; 