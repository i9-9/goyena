import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Get hero image
export const getHeroImage = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'heroImage',
      limit: 1,
    });

    return entries.items[0]?.fields;
  } catch (error) {
    console.error('Error fetching hero image:', error);
    return null;
  }
};

// Get project image
export const getProjectImage = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'projectImage',
      limit: 1,
    });

    return entries.items[0]?.fields;
  } catch (error) {
    console.error('Error fetching project image:', error);
    return null;
  }
};

// Get carousel images
export const getCarouselImages = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'carouselImage',
      order: 'fields.order',
    });

    return entries.items.map(item => item.fields);
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
};

// Get construction progress video
export const getConstructionVideo = async () => {
  try {
    const entries = await client.getEntries({
      content_type: 'constructionVideo',
      limit: 1,
    });

    return entries.items[0]?.fields;
  } catch (error) {
    console.error('Error fetching construction video:', error);
    return null;
  }
}; 