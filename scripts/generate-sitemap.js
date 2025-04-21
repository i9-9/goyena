import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

// Configure the URLs to include
const DOMAIN = 'https://www.goyena.com.ar';
const DATE = new Date().toISOString();

// Main pages of the site
const pages = [
  { 
    url: '/', 
    changeFreq: 'weekly', 
    priority: 1.0,
    lastMod: DATE
  },
  {
    url: '/#ubicacion',
    changeFreq: 'monthly',
    priority: 0.8,
    lastMod: DATE
  },
  {
    url: '/#proyecto',
    changeFreq: 'monthly',
    priority: 0.8,
    lastMod: DATE
  },
  {
    url: '/#construccion',
    changeFreq: 'monthly',
    priority: 0.7,
    lastMod: DATE
  },
  {
    url: '/#contacto',
    changeFreq: 'monthly',
    priority: 0.8,
    lastMod: DATE
  }
];

// Generate sitemap XML
async function generateSitemap() {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${DOMAIN}${page.url}</loc>
              <lastmod>${page.lastMod}</lastmod>
              <changefreq>${page.changeFreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  // Format XML with prettier
  const formatted = await prettier.format(sitemap, {
    parser: 'html',
    printWidth: 100,
  });

  // Write the sitemap to the public directory
  const publicDir = process.cwd() + '/public';
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), formatted);
  
  console.log('✅ Sitemap generated successfully!');
}

// Generate robots.txt file
function generateRobotsTxt() {
  const robotsTxt = `
# Robots.txt file for ${DOMAIN}
User-agent: *
Allow: /

# Disallow crawling of error pages
Disallow: /404
Disallow: /500

# Disallow crawling of API routes
Disallow: /api/

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml
  `;

  const publicDir = process.cwd() + '/public';
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim());
  
  console.log('✅ robots.txt generated successfully!');
}

// Run the generators
(async () => {
  try {
    await generateSitemap();
    generateRobotsTxt();
  } catch (error) {
    console.error('Error generating SEO files:', error);
    process.exit(1);
  }
})(); 