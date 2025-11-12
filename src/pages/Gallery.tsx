import { Layout } from "@/components/layout/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";
import gallery7 from "@/assets/gallery/gallery-7.jpg";
import gallery8 from "@/assets/gallery/gallery-8.jpg";
import gallery9 from "@/assets/gallery/gallery-9.jpg";
import gallery10 from "@/assets/gallery/gallery-10.jpg";
import gallery11 from "@/assets/gallery/gallery-11.jpg";
import gallery12 from "@/assets/gallery/gallery-12.jpg";
import gallery13 from "@/assets/gallery/gallery-13.jpg";
import gallery14 from "@/assets/gallery/gallery-14.jpg";
import gallery15 from "@/assets/gallery/gallery-15.jpg";
import gallery16 from "@/assets/gallery/gallery-16.jpg";
import gallery17 from "@/assets/gallery/gallery-17.jpg";
import gallery18 from "@/assets/gallery/gallery-18.jpg";

const galleryImages = [
  { src: gallery1, alt: "Zulu Lami Resort Exterior" },
  { src: gallery2, alt: "Zulu Lami Resort Building" },
  { src: gallery3, alt: "Infinity Pool with Ocean View" },
  { src: gallery4, alt: "Traditional Zulu Architecture" },
  { src: gallery5, alt: "Pool Area" },
  { src: gallery6, alt: "Outdoor Restaurant Area" },
  { src: gallery7, alt: "Outdoor Kitchen" },
  { src: gallery8, alt: "Garden Landscaping" },
  { src: gallery9, alt: "Bar Setup" },
  { src: gallery10, alt: "Restaurant View" },
  { src: gallery11, alt: "Breakfast Plate" },
  { src: gallery12, alt: "Braai Platter" },
  { src: gallery13, alt: "Conference Room" },
  { src: gallery14, alt: "Meeting Room" },
  { src: gallery15, alt: "Zebra Wildlife" },
  { src: gallery16, alt: "Kayaking Activities" },
  { src: gallery17, alt: "Birds" },
  { src: gallery18, alt: "Swimming Pool" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">Gallery</h1>
        <p className="text-muted-foreground text-center mb-8">
          Explore the beauty of Zulu Lami Eco-Resort
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0">
          {selectedImage !== null && (
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;


