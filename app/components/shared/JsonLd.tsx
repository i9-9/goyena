'use client';

import Script from 'next/script';

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/**
 * Component for adding structured data to pages
 * 
 * @param data The structured data object
 * @param id Optional ID for the script tag
 */
const JsonLd = ({ data, id = 'json-ld' }: JsonLdProps) => {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd; 