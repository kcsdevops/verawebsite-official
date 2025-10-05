'use client';

import { useState } from 'react';

interface ProfessionalImageProps {
  className?: string;
  alt?: string;
  size?: 'large' | 'medium' | 'small';
}

export default function ProfessionalImage({ 
  className = '', 
  alt = 'Veralucia Trindade Santos - Podóloga',
  size = 'medium'
}: ProfessionalImageProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-full h-96'
  };

  const fallbackUrls = {
    small: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
    medium: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
    large: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = imageError 
    ? fallbackUrls[size]
    : '/images/veralucia-consultorio.jpg';

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${sizeClasses[size]} ${className}`}
      onError={handleImageError}
    />
  );
}