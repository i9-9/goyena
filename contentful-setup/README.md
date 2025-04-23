# Contentful Setup for Goyena Website

This directory contains a Node.js script to programmatically set up Contentful content models and initial entries for the Goyena website.

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- A Contentful account with management API access
- A Contentful space created for this project

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file to add your Contentful Management API token:
   ```
   CONTENTFUL_SPACE_ID=tjs1emf07vzj
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here
   CONTENTFUL_ENVIRONMENT_ID=master
   ```

   You can generate a Management Token in the Contentful web app by going to:
   Settings > API Keys > Content management tokens > Generate personal token

## Usage

Run the setup script:

```bash
npm run setup
```

This will:
1. Create all the necessary content types in your Contentful space
2. Set appropriate validations for each field
3. Look for sample assets in the `sample-assets` directory and upload them if found
4. Create initial entries for each content type

## Sample Assets (Optional)

You can add sample assets to the `sample-assets` directory for the script to create sample entries. These are the files the script will look for:

- `hero.jpg` - Hero image for the homepage
- `project.jpg` - Image for the "Conoce el proyecto" section
- `floor-plans.pdf` - PDF containing floor plans for the project units
- `brochure.pdf` - PDF brochure with detailed project information
- `carousel/` (directory) - Images for the carousel (any images in this directory will be added to the carousel)
- `construction.mp4` - Video for construction progress section
- `construction-thumbnail.jpg` - Thumbnail for the construction video (optional)

## Content Models

The script sets up the following content models:

1. **Hero Image**
   - Fields: `title`, `description`, `image`, `mobileImage` (optional)

2. **Project Image**
   - Fields: `title`, `description`, `image`, `floorPlanPdf` (optional), `brochurePdf` (optional)

3. **Carousel Images**
   - Fields: `title`, `description`, `image`, `order`

4. **Construction Progress Video**
   - Fields: `title`, `description`, `video`, `thumbnail` (optional), `isVisible` (boolean)

## Troubleshooting

- If you get a "Rate limit exceeded" error, wait a few minutes and try again
- If you get an "Access denied" error, make sure your management token has the right permissions
- If the script exits with an error, check the error message for more details on what went wrong 