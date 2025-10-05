'use client';

import { useEffect, useState, useRef } from 'react';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export default function FadeInOnScroll({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getTransformClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (isVisible) {
      return `${baseClasses} opacity-100 transform translate-x-0 translate-y-0`;
    }

    switch (direction) {
      case 'up':
        return `${baseClasses} opacity-0 transform translate-y-8`;
      case 'down':
        return `${baseClasses} opacity-0 transform -translate-y-8`;
      case 'left':
        return `${baseClasses} opacity-0 transform translate-x-8`;
      case 'right':
        return `${baseClasses} opacity-0 transform -translate-x-8`;
      case 'fade':
        return `${baseClasses} opacity-0`;
      default:
        return `${baseClasses} opacity-0 transform translate-y-8`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
}