
"use client";

import { useState, useEffect } from 'react';

interface UseImageFallbackProps {
  src: string;
  fallback?: string;
}

export const useImageFallback = ({ src, fallback = '/placeholder.svg' }: UseImageFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('useImageFallback: Starting to load image', { src, fallback });
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    
    img.onload = () => {
      console.log('useImageFallback: Image loaded successfully', src);
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = (error) => {
      console.error('useImageFallback: Image failed to load', { src, error, fallback });
      setImageSrc(fallback);
      setIsLoading(false);
      setHasError(true);
    };
    
    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('useImageFallback: Loading timeout, using fallback', { src, fallback });
        setImageSrc(fallback);
        setIsLoading(false);
        setHasError(true);
      }
    }, 5000);
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
      clearTimeout(timeout);
    };
  }, [src, fallback]);

  const handleError = () => {
    console.error('useImageFallback: handleError called', { imageSrc, fallback });
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
      setHasError(true);
    }
  };

  return {
    src: imageSrc,
    isLoading,
    hasError,
    onError: handleError
  };
};

export default useImageFallback;
