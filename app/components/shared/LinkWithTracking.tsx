'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LinkWithTrackingProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  title?: string;
}

const LinkWithTracking = ({
  href,
  children,
  className = '',
  ariaLabel,
  target,
  rel,
  onClick,
  title
}: LinkWithTrackingProps) => {
  const [ariaAttributes, setAriaAttributes] = useState<{ [key: string]: string }>({});
  
  // Determine if link is external
  const isExternal = href.startsWith('http') || href.startsWith('https');
  
  // Set appropriate rel for external links
  const safeRel = isExternal 
    ? `noopener noreferrer ${rel || ''}`.trim() 
    : rel;
  
  // Set target for external links if not specified
  const safeTarget = isExternal && !target 
    ? '_blank' 
    : target;
    
  // Set aria attributes for better accessibility
  useEffect(() => {
    const attributes: { [key: string]: string } = {};
    
    // Add aria-label if provided or can be inferred
    if (ariaLabel) {
      attributes['aria-label'] = ariaLabel;
    } else if (typeof children === 'string') {
      attributes['aria-label'] = children;
    }
    
    // Add title if external link
    if (isExternal && !title) {
      attributes['title'] = `Se abrirá en una nueva ventana`;
    } else if (title) {
      attributes['title'] = title;
    }
    
    setAriaAttributes(attributes);
  }, [ariaLabel, children, isExternal, title]);
  
  // Handle click for analytics tracking (optional)
  const handleClick = () => {
    // You can add analytics tracking here
    if (onClick) onClick();
  };
  
  // Render as external link
  if (isExternal) {
    return (
      <a 
        href={href}
        className={className}
        target={safeTarget}
        rel={safeRel}
        onClick={handleClick}
        {...ariaAttributes}
      >
        {children}
        {safeTarget === '_blank' && (
          <span className="sr-only"> (Se abre en una nueva ventana)</span>
        )}
      </a>
    );
  }
  
  // Render as Next.js Link for internal navigation
  return (
    <Link 
      href={href}
      className={className}
      onClick={handleClick}
      {...ariaAttributes}
      prefetch={!href.includes('#')} // Don't prefetch anchor links
    >
      {children}
    </Link>
  );
};

export default LinkWithTracking; 