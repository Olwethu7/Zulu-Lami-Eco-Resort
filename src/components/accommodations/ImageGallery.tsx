import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[400px] md:h-[500px]">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-3 relative rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={images[selectedIndex]}
            alt={`${name} - Main view`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-2">
          {images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer",
                selectedIndex === index && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          ))}
          {images.length > 3 && (
            <div
              className="relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            >
              <img
                src={images[3]}
                alt={`${name} - More photos`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold">
                  +{images.length - 3} more
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <div className="relative h-full flex items-center justify-center bg-black">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <img
              src={images[selectedIndex]}
              alt={`${name} - Fullscreen view`}
              className="max-h-full max-w-full object-contain"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 p-2 rounded-lg">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-16 h-16 rounded cursor-pointer overflow-hidden",
                    selectedIndex === index && "ring-2 ring-white"
                  )}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
