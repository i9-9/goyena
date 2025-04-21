# SEO Implementation for Goyena

This document outlines the SEO strategies and implementations used for the Goyena website to improve search engine visibility and user experience.

## Implemented SEO Features

### Metadata
- Comprehensive meta tags in `layout.tsx` including title, description, keywords, and Open Graph data
- Appropriate language tag (`<html lang="es">`)
- Theme color for mobile browsers
- Favicons and app icons for various platforms

### Structured Data
- Implementation of Schema.org markup for RealEstateAgent and Residence entities
- Geographic location data with GeoCoordinates
- Detailed property specifications including amenities, price information, and floor size
- Business information including opening hours and contact details
- Social media profile links

### URL Structure
- Clean, descriptive URLs for all pages
- Fragment identifiers for single-page application sections (`/#ubicacion`, `/#proyecto`, etc.)

### Sitemap & Robots.txt
- XML sitemap with proper prioritization and change frequency indicators
- Robots.txt with appropriate directives
- Automated generation script for keeping both files updated

### Semantic HTML
- Proper heading hierarchy with `<h1>` through `<h6>` elements
- Semantic sectioning elements (`<section>`, `<article>`, `<nav>`, etc.)
- ARIA attributes for improved accessibility
- Custom `Heading` component to maintain proper heading hierarchy

### Images
- Enhanced image handling with the custom `SeoImage` component
- Descriptive alt text for all images
- Lazy loading for images below the fold
- Appropriate image sizes and responsive handling
- Placeholder styling during image loading

### Performance
- Lazy loading components using IntersectionObserver API
- Custom hooks for efficient media queries
- CSS-based responsive design where possible
- Proper image loading prioritization

### Navigation & Accessibility
- Breadcrumb navigation with structured data
- Keyboard-navigable UI elements
- Mobile-friendly interface with appropriate tap targets
- Screen reader support with ARIA attributes and `sr-only` content

## SEO Components

### JsonLd
Standardized implementation of structured data using JSON-LD format:
```jsx
<JsonLd data={structuredData} id="schema-id" />
```

### Breadcrumbs
Navigation component with semantic markup and structured data:
```jsx
<Breadcrumbs homeLabel="Inicio" className="my-4" />
```

### SeoImage
Enhanced image component with automatic handling of alt text and lazy loading:
```jsx
<SeoImage 
  src="/path/to/image.jpg" 
  alt="Descriptive text" 
  width={800} 
  height={600} 
  priority={isHeroImage} 
/>
```

### Heading
Semantic heading component that maintains proper hierarchy:
```jsx
<Heading level={2} className="text-2xl">Section Title</Heading>
```

## SEO Best Practices

1. **Use Semantic HTML**: Always use the most appropriate HTML elements for content.
2. **Maintain Heading Hierarchy**: Every page should have exactly one `<h1>` with a logical hierarchy of subheadings.
3. **Optimize Image Alt Text**: Use descriptive, keyword-rich alt text for images.
4. **Keep Metadata Current**: Update meta descriptions and titles as content changes.
5. **Mobile Optimization**: Ensure all content is accessible and usable on mobile devices.
6. **Local SEO**: Include geographic data in structured markup for local search visibility.
7. **Page Speed**: Regularly test performance with tools like Lighthouse.
8. **Internal Linking**: Create logical navigation paths through the site.
9. **Monitor Analytics**: Track user behavior and search performance metrics.
10. **Update Sitemaps**: Regenerate sitemaps when new content is added.

## Tools for SEO Maintenance

- **Generate Sitemap**: `npm run generate-sitemap`
- **Google Search Console**: For monitoring search performance
- **Google Analytics**: For user behavior analysis
- **Lighthouse**: For performance and accessibility auditing

## Future SEO Enhancements

- Implementation of FAQ Schema
- Additional language versions with hreflang attributes
- Enhanced local business schema
- Product schema for individual unit types
- Review schema for testimonials