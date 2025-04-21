'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useMemo } from 'react';

interface BreadcrumbsProps {
  homeLabel?: string;
  className?: string;
  omitHome?: boolean;
  separator?: string;
}

const Breadcrumbs = ({
  homeLabel = 'Inicio',
  className = '',
  omitHome = false,
  separator = '/'
}: BreadcrumbsProps) => {
  const pathname = usePathname();
  
  const breadcrumbs = useMemo(() => {
    // If we're on the homepage, return just the home breadcrumb
    if (pathname === '/') {
      return [{ href: '/', label: homeLabel }];
    }
    
    // Split path into segments, filter out empty strings
    const segments = pathname.split('/').filter(Boolean);
    
    // Create breadcrumb items
    const items = [
      ...(!omitHome ? [{ href: '/', label: homeLabel }] : []),
      ...segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join('/')}`;
        // Format segment for display (capitalize, replace hyphens)
        const label = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        
        return { href, label };
      })
    ];
    
    return items;
  }, [pathname, homeLabel, omitHome]);
  
  // Generate structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://www.goyena.com.ar${item.href}`,
        'name': item.label
      }
    }))
  };
  
  return (
    <>
      <Script
        id="breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav aria-label="Breadcrumbs" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[#2C3424]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-[#5D6E4E] hover:text-[#2C3424] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs; 