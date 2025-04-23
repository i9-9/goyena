# Goyena Website

This is the repository for the Goyena residential project website built with Next.js and Contentful.

## Features

- Modern, responsive design
- Fast performance with Next.js
- Content management through Contentful CMS
- Interactive components built with Framer Motion
- Optimized for SEO with JSON-LD structured data

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- A Contentful account (for content management)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/goyena.git
   cd goyena
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env.local` file:
   ```
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tjs1emf07vzj
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=GNTLd96GKnvz69kzesaxtHCMMziX7pN1K4sgVe3bvNc
   CONTENTFUL_PREVIEW_TOKEN=24sXCvxRZwR7YDsLzP2kraZ-8NInFCo8XQz2v8HOgiQ
   
   # Google Sheets (see docs/GOOGLE_SHEETS_SETUP.md for instructions)
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000.

## Contentful Integration

This website uses Contentful as its headless CMS to manage content. The main content types are:

1. **Hero Image**: The main image at the top of the homepage
2. **Project Image**: The image in the "Conoce el proyecto" section
3. **Carousel Images**: Images displayed in the carousel slideshow
4. **Construction Progress Video**: The video shown in the "Mira los avances de obra" section

### Setting Up Contentful

If you need to set up the content models in a new Contentful space, use the setup script included in the `contentful-setup` directory:

1. Navigate to the setup directory:
   ```bash
   cd contentful-setup
   ```

2. Follow the instructions in the [contentful-setup README](./contentful-setup/README.md) to configure and run the setup script.

## Google Sheets Integration

The contact form in this website automatically sends all submissions to a Google Sheets spreadsheet. This helps to manage and track inquiries efficiently.

### Setting Up Google Sheets Integration

To set up the Google Sheets integration:

1. Follow the detailed instructions in [Google Sheets Setup Guide](./docs/GOOGLE_SHEETS_SETUP.md)
2. Set the required environment variables in your `.env.local` file
3. When deployed, add the same environment variables to your hosting platform

### Form Data Structure

The contact form collects and saves the following information to Google Sheets:

- Fecha (Date of submission)
- Nombre (First name)
- Apellido (Last name)
- Teléfono (Phone number)
- Email
- Búsqueda (What they're looking for)
- Mensaje (Message)

## Development

### Project Structure

- `app/` - Next.js app directory containing all pages and components
- `app/components/` - React components
- `app/lib/` - Utility functions and services
- `contentful-setup/` - Scripts for setting up Contentful content models

### Key Files

- `app/page.tsx` - Main homepage
- `app/ContentfulProvider.tsx` - Provider component for Contentful data
- `app/lib/contentful.js` - Contentful client and data fetching functions
- `contentful-setup/contentful-setup.cjs` - Contentful setup script

## Deployment

This project can be deployed using [Vercel](https://vercel.com) by connecting your GitHub repository and configuring the same environment variables as in your `.env.local` file.

## License

This project is licensed under the MIT License.
