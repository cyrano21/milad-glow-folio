import React from "react";
import { useImageFallback } from "@/hooks/use-image-fallback";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback,
  className,
  loadingClassName,
  errorClassName,
  ...props
}) => {
  const {
    src: imageSrc,
    isLoading,
    hasError,
    onError,
  } = useImageFallback({
    src,
    fallback,
  });

  // Debug logs
  console.log("Image Debug:", {
    originalSrc: src,
    currentSrc: imageSrc,
    isLoading,
    hasError,
    fallback,
  });

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-muted to-card animate-pulse rounded",
            loadingClassName
          )}
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError && errorClassName,
          className
        )}
        onError={onError}
        {...props}
      />
    </div>
  );
};

export default Image;
