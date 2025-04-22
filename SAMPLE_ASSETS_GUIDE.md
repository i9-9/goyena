# Sample Assets Guide

This guide explains how to organize your sample assets to be used with the Contentful setup script.

## Directory Structure

Create the following directory structure in the project root:

```
sample-assets/
├── hero.jpg             # Main hero image for the homepage
├── project.jpg          # Image for the "Conoce el proyecto" section
├── construction.mp4     # Construction progress video
├── construction-thumbnail.jpg  # Thumbnail for the video
└── carousel/            # Directory for carousel images
    ├── image1.jpg
    ├── image2.jpg
    ├── image3.jpg
    └── ... (add as many as needed)
```

## File Requirements

### Images

- **Hero Image** (`hero.jpg`):
  - Recommended size: 1920x1080px (16:9 ratio)
  - Format: JPG or PNG
  - High quality but optimized for web (file size under 500KB if possible)

- **Project Image** (`project.jpg`):
  - Recommended size: 800x600px or similar
  - Format: JPG or PNG
  - High quality but optimized for web (file size under 300KB if possible)

- **Carousel Images** (`carousel/*.jpg`):
  - Consistent aspect ratio for all images (16:9 recommended)
  - Format: JPG or PNG
  - High quality but optimized for web (file size under 300KB each if possible)
  - Name them with sequential numbers (image1.jpg, image2.jpg, etc.) to control order

- **Video Thumbnail** (`construction-thumbnail.jpg`):
  - Recommended size: 1280x720px (16:9 ratio)
  - Format: JPG or PNG
  - This will be shown before the video plays

### Video

- **Construction Video** (`construction.mp4`):
  - Format: MP4 with H.264 encoding
  - Recommended resolution: 1280x720px (720p)
  - Optimized file size (under 10MB if possible)
  - Duration: Preferably under 2 minutes for optimal web performance

## Tips for Preparing Assets

1. **Image Optimization**:
   - Use tools like [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/) to compress images
   - Remove unnecessary metadata from images
   - Use modern image formats like WebP if possible (though JPG/PNG are more widely supported)

2. **Video Optimization**:
   - Use tools like [HandBrake](https://handbrake.fr/) to compress videos
   - Consider reducing resolution if the file is too large
   - Trim unnecessary footage to keep the video concise

3. **Naming Convention**:
   - Use lowercase letters and avoid spaces in filenames
   - Use hyphens instead of underscores or spaces
   - Keep filenames simple and descriptive

## After Preparing Assets

Once you have prepared and organized your assets according to this structure, run the setup script:

```bash
npm run setup
```

The script will:
1. Find these assets in the sample-assets directory
2. Upload them to Contentful
3. Create entries that link to these assets
4. Publish both the assets and entries 