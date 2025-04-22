# Contentful Guide for Goyena Website

This guide explains how to manage your website content using Contentful CMS.

## Introduction to Contentful

Contentful is a headless Content Management System (CMS) that allows you to manage all the media and content displayed on your website without needing to modify the code. It provides an intuitive web interface for updating images, videos, and text that will appear on your Goyena website.

## Accessing Your Contentful Account

1. Go to [https://app.contentful.com/](https://app.contentful.com/)
2. Log in with the credentials provided:
   - Email: [client's email]
   - Password: [initial password - to be changed after first login]
3. Once logged in, you'll see a dashboard with your spaces. Click on "Goyena Website" to access your content.

## Understanding the Contentful Interface

The Contentful interface has several key components:

- **Content**: This is where you'll find all your existing entries (pieces of content)
- **Media**: This is where all your images and videos are stored
- **Content Model**: The structure of your content (you shouldn't need to modify this)
- **Settings**: Advanced options (most users won't need to change these)

## Content Types

Your website uses the following content types:

### 1. Hero Image
The main image displayed at the top of your homepage.
- **Fields**:
  - Title: A reference name for the image (not displayed on site)
  - Description: Optional notes about the image (not displayed on site)
  - Image: The hero image file (recommended size: 1920x1080px for desktop)
  - Mobile Image: Optional separate image for mobile devices (if not provided, the main image will be used)

### 2. Project Image
The image displayed in the "Conoce el proyecto" section.
- **Fields**:
  - Title: A reference name for the image (not displayed on site)
  - Description: Optional notes about the image (not displayed on site)
  - Image: The project image file (recommended size: 800x600px)

### 3. Carousel Images
The images displayed in the carousel slideshow.
- **Fields**:
  - Title: A reference name for the image (not displayed on site)
  - Description: Optional notes about the image (not displayed on site)
  - Image: The carousel image file (recommended landscape orientation)
  - Order: A number to determine the order of images in the carousel (1, 2, 3, etc.)

### 4. Construction Progress Video
The video shown in the "Mira los avances de obra" section.
- **Fields**:
  - Title: A reference name for the video (not displayed on site)
  - Description: Optional notes about the video (not displayed on site)
  - Video: The video file (MP4 format recommended)
  - Thumbnail: Optional thumbnail image shown before the video plays

## Step-by-Step Guides

### Updating the Hero Image

1. In the Contentful dashboard, click on "Content" in the left sidebar
2. Find the "Hero Image" entry in the list and click on it
3. To replace the image:
   - Click on the current image in the "Image" field
   - Click "Remove" to delete the current image
   - Click "Add media" to open the media library
   - Either upload a new image or select an existing one
   - Click "Select" to choose the image
4. If you want a different image for mobile devices, follow the same process for the "Mobile Image" field
5. Click "Publish changes" in the top-right corner when you're done

### Updating the Project Image

1. In the Contentful dashboard, click on "Content" in the left sidebar
2. Find the "Project Image" entry in the list and click on it
3. To replace the image:
   - Click on the current image in the "Image" field
   - Click "Remove" to delete the current image
   - Click "Add media" to open the media library
   - Either upload a new image or select an existing one
   - Click "Select" to choose the image
4. Click "Publish changes" in the top-right corner when you're done

### Managing Carousel Images

#### Adding a New Carousel Image

1. In the Contentful dashboard, click on "Content" in the left sidebar
2. Click "Add entry" and select "Carousel Image"
3. Fill in the following fields:
   - Title: Give it a descriptive name like "Carousel Image 4"
   - Description: (Optional) Add any notes about this image
   - Image: Click "Add media" and upload or select your image
   - Order: Enter a number that determines where this image appears in the sequence (higher numbers appear later)
4. Click "Publish" in the top-right corner

#### Removing a Carousel Image

1. In the Contentful dashboard, click on "Content" in the left sidebar
2. Find the Carousel Image entry you want to remove
3. Click the "..." (three dots) menu at the far right of the entry
4. Select "Delete"
5. Confirm the deletion
6. Consider updating the Order of remaining images to ensure a continuous sequence

#### Reordering Carousel Images

1. Open each Carousel Image entry you want to reorder
2. Change the "Order" field to the new position value
3. Click "Publish changes" to save
4. The website will automatically display the images in the new order

### Updating the Construction Progress Video

1. In the Contentful dashboard, click on "Content" in the left sidebar
2. Find the "Construction Progress Video" entry in the list and click on it
3. To replace the video:
   - Click on the current video in the "Video" field
   - Click "Remove" to delete the current video
   - Click "Add media" to open the media library
   - Either upload a new video file or select an existing one
   - Click "Select" to choose the video
4. To update the thumbnail:
   - Follow the same process for the "Thumbnail" field
5. Click "Publish changes" in the top-right corner when you're done

## Managing Media

### Uploading New Media

1. Click on "Media" in the left sidebar
2. Click "Add asset" in the top-right corner
3. Drag and drop your file onto the upload area or click to browse your files
4. Give your media a title (and optional description)
5. Click "Publish" to make it available for use in content entries

### Best Practices for Media

- **Image Optimization**: Before uploading, optimize your images for web (reduce file size while maintaining quality)
  - For hero images: 1920x1080px (16:9 ratio) for desktop
  - For project images: 800x600px or similar size
  - For carousel images: Consistent aspect ratio for all images (16:9 recommended)
- **Image Formats**: Use JPEG for photographs and PNG for graphics with transparency
- **Video Compression**: Keep videos under 10MB when possible for faster loading
  - MP4 format with H.264 encoding is recommended
  - Resolution of 1280x720px (720p) provides a good balance between quality and file size
- **Testing**: After publishing changes, visit your website to verify the changes are displayed correctly

## Website Updates Timeline

After making changes in Contentful, your website will typically update:
- Within 5 minutes for most updates
- May take up to 15 minutes during high traffic periods

If changes aren't appearing after 15 minutes, try clearing your browser cache or viewing the site in an incognito/private browsing window.

## Need Help?

If you encounter any issues or need assistance with Contentful:
- Email: [support contact email]
- Phone: [support phone number]
- Hours: Monday-Friday, 9:00 AM - 6:00 PM

## Frequently Asked Questions

**Q: Can I add more than one hero image?**  
A: The website is designed to display one hero image at a time. If you want to change the hero image, update the existing entry rather than creating a new one.

**Q: What happens if I don't add a mobile version of the hero image?**  
A: The website will automatically use the main hero image on all device sizes, possibly cropping it on mobile devices.

**Q: How many carousel images can I have?**  
A: There is no strict limit, but for best performance, we recommend keeping it to 10 or fewer images.

**Q: Can I upload videos other than MP4?**  
A: While Contentful supports various video formats, MP4 is recommended for maximum compatibility with web browsers.

**Q: Will deleting an image from the Media library remove it from my website?**  
A: Yes, if you delete an image from the Media library that is being used on the website, it will no longer appear on the site. Always make sure to replace the image in your content entries before deleting the old one from the Media library. 