'use client';

import { useEffect, useState } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  direction?: 'vertical' | 'horizontal' | 'circular';
}

export default function FloatingElement({ 
  children, 
  className = '',
  intensity = 'medium',
  direction = 'vertical'
}: FloatingElementProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  const getAnimationClass = () => {
    switch (direction) {
      case 'vertical':
        return intensity === 'light' 
          ? 'animate-bounce-gentle' 
          : intensity === 'medium' 
          ? 'animate-float-vertical' 
          : 'animate-bounce';
      case 'horizontal':
        return 'animate-float-horizontal';
      case 'circular':
        return 'animate-float-circular';
      default:
        return 'animate-float-vertical';
    }
  };

  return (
    <div className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
}