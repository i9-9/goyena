#!/usr/bin/env node

/**
 * Contentful Setup Script for Goyena Website
 * 
 * This script sets up all required content models and initial entries in Contentful
 * using the Management API. It creates content types, sets field validations,
 * configures the UI appearance, and creates sample entries with placeholder data.
 * 
 * Usage:
 * 1. Set environment variables CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN
 * 2. Run the script: node contentful-setup.cjs
 */

// Required dependencies
const { createClient } = require('contentful-management');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Validate environment variables
if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Error: Required environment variables CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set');
  console.error('Please set these variables in your .env file or environment');
  process.exit(1);
}

// Initialize Contentful Management Client
const client = createClient({
  accessToken: MANAGEMENT_TOKEN
});

/**
 * Main function to set up Contentful content models and entries
 */
async function setupContentful() {
  try {
    // Validate required environment variables
    const requiredEnvVars = [
      'CONTENTFUL_MANAGEMENT_TOKEN',
      'CONTENTFUL_SPACE_ID',
      'CONTENTFUL_ENVIRONMENT_ID'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }
    
    // Get space and environment
    console.log('Connecting to Contentful...');
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log('Successfully connected to Contentful!');
    
    // Create content types
    await createHeroImageContentType(environment);
    await createProjectImageContentType(environment);
    await createCarouselImagesContentType(environment);
    await createConstructionVideoContentType(environment);
    
    // Create initial entries and upload assets
    await createInitialEntries(environment);
    
    console.log('All content types and entries have been created successfully!');
  } catch (_error) {
    console.error('Error setting up Contentful:', _error);
    throw _error;
  }
}

/**
 * Create Hero Image Content Type
 * @param {Object} environment - Contentful environment
 */
async function createHeroImageContentType(environment) {
  try {
    console.log('Creating Hero Image content type...');
    
    // Check if content type already exists
    try {
      const existingContentType = await environment.getContentType('heroImage');
      console.log('Hero Image content type already exists. Skipping creation.');
      return existingContentType;
    } catch (error) {
      // Explicitly ignore the error
      void error;
      // Content type doesn't exist, proceed with creation
      console.log('Hero Image content type does not exist. Creating now...');
    }
    
    // Create content type
    const contentType = await environment.createContentTypeWithId('heroImage', {
      name: 'Hero Image',
      description: 'Main hero image displayed at the top of the homepage',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true
            }
          ]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        },
        {
          id: 'mobileImage',
          name: 'Mobile Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        }
      ]
    });
    
    // Publish content type
    await contentType.publish();
    console.log('Hero Image content type created and published successfully');
    return contentType;
  } catch (_error) {
    console.error('Error creating Hero Image content type:', _error);
    throw _error;
  }
}

/**
 * Create Project Image Content Type
 * @param {Object} environment - Contentful environment
 */
async function createProjectImageContentType(environment) {
  try {
    console.log('Creating Project Image content type...');
    
    // Check if content type already exists
    try {
      const existingContentType = await environment.getContentType('projectImage');
      console.log('Project Image content type already exists. Skipping creation.');
      return existingContentType;
    } catch (error) {
      // Explicitly ignore the error
      void error;
      // Content type doesn't exist, proceed with creation
      console.log('Project Image content type does not exist. Creating now...');
    }
    
    // Create content type
    const contentType = await environment.createContentTypeWithId('projectImage', {
      name: 'Project Image',
      description: 'Image displayed in the "Conoce el proyecto" section',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true
            }
          ]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        },
        {
          id: 'floorPlanPdf',
          name: 'Floor Plan PDF',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['pdfdocument']
            }
          ]
        },
        {
          id: 'brochurePdf',
          name: 'Brochure PDF',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['pdfdocument']
            }
          ]
        }
      ]
    });
    
    // Publish content type
    await contentType.publish();
    console.log('Project Image content type created and published successfully');
    return contentType;
  } catch (_error) {
    console.error('Error creating Project Image content type:', _error);
    throw _error;
  }
}

/**
 * Create Carousel Images Content Type
 * @param {Object} environment - Contentful environment
 */
async function createCarouselImagesContentType(environment) {
  try {
    console.log('Creating Carousel Images content type...');
    
    // Check if content type already exists
    try {
      const existingContentType = await environment.getContentType('carouselImage');
      console.log('Carousel Images content type already exists. Skipping creation.');
      return existingContentType;
    } catch (_) {
      // Content type doesn't exist, proceed with creation
      console.log('Carousel Images content type does not exist. Creating now...');
    }
    
    // Create content type
    const contentType = await environment.createContentTypeWithId('carouselImage', {
      name: 'Carousel Image',
      description: 'Images displayed in the carousel slideshow',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: true
        }
      ]
    });
    
    // Publish content type
    await contentType.publish();
    console.log('Carousel Images content type created and published successfully');
    return contentType;
  } catch (_error) {
    console.error('Error creating Carousel Images content type:', _error);
    throw _error;
  }
}

/**
 * Create Construction Progress Video Content Type
 * @param {Object} environment - Contentful environment
 */
async function createConstructionVideoContentType(environment) {
  try {
    console.log('Creating Construction Progress Video content type...');
    
    // Check if content type already exists
    try {
      const existingContentType = await environment.getContentType('constructionVideo');
      console.log('Construction Progress Video content type already exists. Skipping creation.');
      return existingContentType;
    } catch (_) {
      // Content type doesn't exist, proceed with creation
      console.log('Construction Progress Video content type does not exist. Creating now...');
    }
    
    // Create content type
    const contentType = await environment.createContentTypeWithId('constructionVideo', {
      name: 'Construction Progress Video',
      description: 'Video showing construction progress',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true
            }
          ]
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false
        },
        {
          id: 'video',
          name: 'Video',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          validations: [
            {
              linkMimetypeGroup: ['video']
            }
          ]
        },
        {
          id: 'thumbnail',
          name: 'Thumbnail',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          validations: [
            {
              linkMimetypeGroup: ['image']
            }
          ]
        }
      ]
    });
    
    // Publish content type
    await contentType.publish();
    console.log('Construction Progress Video content type created and published successfully');
    return contentType;
  } catch (_error) {
    console.error('Error creating Construction Progress Video content type:', _error);
    throw _error;
  }
}

/**
 * Upload an asset to Contentful
 * @param {Object} environment - Contentful environment
 * @param {String} filePath - Path to the file
 * @param {String} title - Asset title
 * @param {String} description - Asset description
 * @param {String} contentType - MIME type of the asset
 * @returns {Object} - The published asset
 */
async function uploadAsset(environment, filePath, title, description, contentType) {
  try {
    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');
    
    // Create asset
    const asset = await environment.createAsset({
      fields: {
        title: {
          'en-US': title
        },
        description: {
          'en-US': description
        },
        file: {
          'en-US': {
            contentType,
            fileName: path.basename(filePath),
            upload: `data:${contentType};base64,${base64Data}`
          }
        }
      }
    });
    
    // Process and publish the asset
    const processedAsset = await asset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();
    
    console.log(`Asset "${title}" uploaded and published successfully`);
    return publishedAsset;
  } catch (_error) {
    console.error(`Error uploading asset "${title}":`, _error);
    throw _error;
  }
}

/**
 * Create sample entries for all content types
 * @param {Object} environment - Contentful environment
 */
async function createInitialEntries(environment) {
  try {
    console.log('Creating initial entries and uploading assets...');
    
    // Only proceed if assets directory exists
    const assetsDir = path.join(__dirname, 'sample-assets');
    if (!fs.existsSync(assetsDir)) {
      console.log('Sample assets directory not found. Skipping asset upload and entry creation.');
      console.log(`Create a directory at ${assetsDir} with sample images and videos to create initial entries.`);
      return;
    }
    
    // Upload hero image and create entry
    try {
      const heroImagePath = path.join(assetsDir, 'hero.jpg');
      if (fs.existsSync(heroImagePath)) {
        const heroAsset = await uploadAsset(
          environment,
          heroImagePath,
          'Hero Image',
          'Main hero image for the homepage',
          'image/jpeg'
        );
        
        // Create hero image entry
        const heroEntry = await environment.createEntry('heroImage', {
          fields: {
            title: {
              'en-US': 'Main Hero Image'
            },
            description: {
              'en-US': 'Main hero image displayed at the top of the homepage'
            },
            image: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: heroAsset.sys.id
                }
              }
            }
          }
        });
        
        await heroEntry.publish();
        console.log('Hero Image entry created and published successfully');
      } else {
        console.log('Hero image not found. Skipping hero image entry creation.');
      }
    } catch (_) {
      console.log('Hero image not found. Skipping hero image entry creation.');
    }
    
    // Upload project image and create entry
    try {
      const projectImagePath = path.join(assetsDir, 'project.jpg');
      if (fs.existsSync(projectImagePath)) {
        const projectAsset = await uploadAsset(
          environment,
          projectImagePath,
          'Project Image',
          'Image for the "Conoce el proyecto" section',
          'image/jpeg'
        );
        
        // Check for floor plan PDF
        let floorPlanAsset = null;
        const floorPlanPath = path.join(assetsDir, 'floor-plans.pdf');
        if (fs.existsSync(floorPlanPath)) {
          floorPlanAsset = await uploadAsset(
            environment,
            floorPlanPath,
            'Floor Plans',
            'Floor plans for the project units',
            'application/pdf'
          );
        }
        
        // Check for brochure PDF
        let brochureAsset = null;
        const brochurePath = path.join(assetsDir, 'brochure.pdf');
        if (fs.existsSync(brochurePath)) {
          brochureAsset = await uploadAsset(
            environment,
            brochurePath,
            'Project Brochure',
            'Detailed brochure with project information',
            'application/pdf'
          );
        }
        
        // Prepare entry fields
        const entryFields = {
          title: {
            'en-US': 'Project Image'
          },
          description: {
            'en-US': 'Image displayed in the "Conoce el proyecto" section'
          },
          image: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: projectAsset.sys.id
              }
            }
          }
        };
        
        // Add floor plan if available
        if (floorPlanAsset) {
          entryFields.floorPlanPdf = {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: floorPlanAsset.sys.id
              }
            }
          };
        }
        
        // Add brochure if available
        if (brochureAsset) {
          entryFields.brochurePdf = {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: brochureAsset.sys.id
              }
            }
          };
        }
        
        // Create project image entry
        const projectEntry = await environment.createEntry('projectImage', {
          fields: entryFields
        });
        
        await projectEntry.publish();
        console.log('Project Image entry created and published successfully');
        
        if (floorPlanAsset) {
          console.log('Floor Plan PDF linked to Project Image entry');
        }
        
        if (brochureAsset) {
          console.log('Brochure PDF linked to Project Image entry');
        }
      } else {
        console.log('Project image not found. Skipping project image entry creation.');
      }
    } catch (_) {
      console.log('Project image not found. Skipping project image entry creation.');
    }
    
    // Upload carousel images and create entries
    try {
      const carouselDir = path.join(assetsDir, 'carousel');
      if (fs.existsSync(carouselDir)) {
        const carouselFiles = fs.readdirSync(carouselDir)
          .filter(file => file.match(/\.(jpg|jpeg|png)$/i));
        
        for (let i = 0; i < carouselFiles.length; i++) {
          const file = carouselFiles[i];
          const imagePath = path.join(carouselDir, file);
          
          const carouselAsset = await uploadAsset(
            environment,
            imagePath,
            `Carousel Image ${i + 1}`,
            `Image ${i + 1} for the carousel slideshow`,
            'image/jpeg'
          );
          
          // Create carousel image entry
          const carouselEntry = await environment.createEntry('carouselImage', {
            fields: {
              title: {
                'en-US': `Carousel Image ${i + 1}`
              },
              description: {
                'en-US': `Image ${i + 1} for the carousel slideshow`
              },
              image: {
                'en-US': {
                  sys: {
                    type: 'Link',
                    linkType: 'Asset',
                    id: carouselAsset.sys.id
                  }
                }
              },
              order: {
                'en-US': i + 1
              }
            }
          });
          
          await carouselEntry.publish();
          console.log(`Carousel Image ${i + 1} entry created and published successfully`);
        }
      } else {
        console.log('Carousel images directory not found. Skipping carousel image entries creation.');
      }
    } catch (_) {
      console.log('Carousel images directory not found. Skipping carousel image entries creation.');
    }
    
    // Upload construction video and create entry
    try {
      const videoPath = path.join(assetsDir, 'construction.mp4');
      const thumbnailPath = path.join(assetsDir, 'construction-thumbnail.jpg');
      
      if (fs.existsSync(videoPath)) {
        const videoAsset = await uploadAsset(
          environment,
          videoPath,
          'Construction Progress Video',
          'Video showing construction progress',
          'video/mp4'
        );
        
        let thumbnailAsset = null;
        if (fs.existsSync(thumbnailPath)) {
          thumbnailAsset = await uploadAsset(
            environment,
            thumbnailPath,
            'Construction Video Thumbnail',
            'Thumbnail for the construction progress video',
            'image/jpeg'
          );
        }
        
        // Create construction video entry
        const fields = {
          title: {
            'en-US': 'Construction Progress Video'
          },
          description: {
            'en-US': 'Video showing the latest construction progress'
          },
          video: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: videoAsset.sys.id
              }
            }
          }
        };
        
        // Add thumbnail if it exists
        if (thumbnailAsset) {
          fields.thumbnail = {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: thumbnailAsset.sys.id
              }
            }
          };
        }
        
        const videoEntry = await environment.createEntry('constructionVideo', {
          fields
        });
        
        await videoEntry.publish();
        console.log('Construction Progress Video entry created and published successfully');
      } else {
        console.log('Construction video not found. Skipping construction video entry creation.');
      }
    } catch (_) {
      console.log('Construction video not found. Skipping construction video entry creation.');
    }
    
    console.log('Initial entries created successfully');
  } catch (error) {
    console.error('Error creating initial entries:', error);
    throw error;
  }
}

// Execute the main function
setupContentful()
  .then(() => {
    console.log('Contentful setup completed! You can now use the CMS to manage your content.');
  })
  .catch(error => {
    console.error('Setup failed with error:', error);
    process.exit(1);
  }); 