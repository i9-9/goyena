'use client';

import { useEffect, useState } from 'react';

interface ButtonWithTrackingProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  id?: string;
  variant?: 'primary' | 'secondary' | 'text';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ButtonWithTracking = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
  title,
  id,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  size = 'medium'
}: ButtonWithTrackingProps) => {
  const [ariaAttributes, setAriaAttributes] = useState<{ [key: string]: string }>({});
  
  // Computed classes based on props
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary/20',
    text: 'bg-transparent text-primary hover:underline focus:ring-0'
  };
  
  const sizeClasses = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6'
  };
  
  const baseClass = [
    'rounded transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ].join(' ').trim();
  
  // Set aria attributes for better accessibility
  useEffect(() => {
    const attributes: { [key: string]: string } = {};
    
    // Add aria-label if provided or can be inferred
    if (ariaLabel) {
      attributes['aria-label'] = ariaLabel;
    } else if (typeof children === 'string') {
      attributes['aria-label'] = children.toString();
    }
    
    if (title) {
      attributes['title'] = title;
    }
    
    // Add disabled state to aria attributes
    if (disabled) {
      attributes['aria-disabled'] = 'true';
    }
    
    setAriaAttributes(attributes);
  }, [ariaLabel, children, disabled, title]);
  
  // Handle click for analytics tracking
  const handleClick = () => {
    // You can add analytics tracking here
    if (onClick && !disabled) onClick();
  };
  
  return (
    <button
      type={type}
      className={baseClass}
      onClick={handleClick}
      disabled={disabled}
      id={id}
      {...ariaAttributes}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex items-center">{icon}</span>
      )}
    </button>
  );
};

export default ButtonWithTracking; 