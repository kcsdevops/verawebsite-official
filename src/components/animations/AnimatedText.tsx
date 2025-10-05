'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'typewriter' | 'fadeIn' | 'slideUp' | 'wave' | 'rainbow';
  speed?: number;
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  type = 'typewriter',
  speed = 100 
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible || type !== 'typewriter') return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isVisible, speed, type]);

  const getAnimationClasses = () => {
    switch (type) {
      case 'typewriter':
        return `${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'fadeIn':
        return `${className} transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`;
      case 'slideUp':
        return `${className} transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`;
      case 'wave':
        return `${className} ${isVisible ? 'animate-wave' : 'opacity-0'}`;
      case 'rainbow':
        return `${className} ${isVisible ? 'animate-rainbow' : 'opacity-0'}`;
      default:
        return className;
    }
  };

  const renderText = () => {
    if (type === 'typewriter') {
      return (
        <>
          {displayedText}
          <span className="animate-pulse">|</span>
        </>
      );
    }

    if (type === 'wave') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block ${isVisible ? 'animate-bounce' : ''} delay-${index % 5 + 1}00`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (type === 'rainbow') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block animate-pulse delay-${index % 5 + 1}00`}
          style={{
            color: `hsl(${(index * 30) % 360}, 70%, 50%)`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    return text;
  };

  return (
    <div className={getAnimationClasses()}>
      {renderText()}
    </div>
  );
}