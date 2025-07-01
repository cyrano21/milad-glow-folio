
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

  console.log("Image Component:", {
    originalSrc: src,
    currentSrc: imageSrc,
    isLoading,
    hasError,
    fallback,
  });

  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-muted to-card animate-pulse rounded flex items-center justify-center",
          loadingClassName,
          className
        )}
      >
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-300",
        hasError && errorClassName,
        className
      )}
      onError={onError}
      {...props}
    />
  );
};

export default Image;
