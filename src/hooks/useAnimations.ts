'use client';

import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    freezeOnceVisible = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (isElementIntersecting) {
          setHasIntersected(true);
        }

        if (!freezeOnceVisible || !hasIntersected) {
          setIsIntersecting(isElementIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, freezeOnceVisible, hasIntersected]);

  return [elementRef, isIntersecting, hasIntersected] as const;
}

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
  }, [delay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && text.length > 0) {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  const reset = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return {
    displayedText,
    isComplete,
    reset
  };
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
}

export function useCountUp(
  end: number,
  start: number = 0,
  duration: number = 2000,
  delay: number = 0
) {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);

  const startAnimation = () => {
    if (isActive) return;
    
    setIsActive(true);
    const startTime = Date.now() + delay;
    const range = end - start;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 0) return;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(start + range * easeOutProgress));
      } else {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  };

  const reset = () => {
    setCount(start);
    setIsActive(false);
  };

  return {
    count,
    startAnimation,
    reset,
    isActive
  };
}