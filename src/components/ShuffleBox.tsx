import { useState, useEffect } from "react";

interface ShuffleBoxProps {
  label: string;
  images: string[];
  isShuffling: boolean;
  onImageChange: (image: string) => void;
}

export const ShuffleBox = ({ label, images, isShuffling, onImageChange }: ShuffleBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isShuffling) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        onImageChange(images[nextIndex]);
        setIsTransitioning(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [isShuffling, currentIndex, images, onImageChange]);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-center text-foreground">{label}</h3>
      <div className="relative aspect-square bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
        <img
          src={images[currentIndex]}
          alt={label}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
        {isShuffling && (
          <div className="absolute bottom-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Shuffling...
          </div>
        )}
      </div>
    </div>
  );
};
