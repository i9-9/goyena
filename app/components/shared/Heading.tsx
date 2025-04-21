import { createElement } from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * A semantic heading component that helps maintain proper heading hierarchy
 * while allowing for styling flexibility via the "as" prop.
 * 
 * Example: 
 * <Heading level={2} as={1} className="text-4xl">Visually h1, semantically h2</Heading>
 * 
 * @param level The semantic heading level (for SEO and accessibility)
 * @param as Visual heading level (optional, for styling)
 * @param children Content of the heading
 * @param className Optional CSS classes
 * @param id Optional ID attribute
 */
const Heading = ({ 
  level, 
  children, 
  className = '', 
  id,
  as
}: HeadingProps) => {
  // Create the semantic element
  const semanticElement = createElement(
    `h${level}`,
    {
      className: `${className} ${as ? `as-h${as}` : ''}`,
      id,
      'data-semantic-level': level,
      ...(as && { 'data-visual-level': as })
    },
    children
  );
  
  return semanticElement;
};

export default Heading; 