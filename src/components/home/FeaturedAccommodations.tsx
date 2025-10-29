import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { useAccommodations } from "@/hooks/useAccommodations";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedAccommodations = () => {
  const featuredRooms = [
    {
      id: 'single-featured',
      name: 'Single Room',
      type: 'Single',
      description: 'Cozy eco-friendly room for solo travelers',
      price_per_night: 750,
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'],
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Garden View'],
      sustainability_rating: 4.5,
      available: true,
      capacity: 1
    },
    {
      id: 'double-featured',
      name: 'Double Room',
      type: 'Double',
      description: 'Spacious room for couples with sustainable features',
      price_per_night: 1200,
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'],
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Solar Power', 'Private Balcony'],
      sustainability_rating: 4.5,
      available: true,
      capacity: 2
    },
    {
      id: 'family-featured',
      name: 'Family Room',
      type: 'Family',
      description: 'Spacious family accommodation with multiple beds',
      price_per_night: 2400,
      images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=600&fit=crop'],
      amenities: ['Wi-Fi', 'En-suite Bathroom', '2 Bedrooms', 'Living Area', 'Kitchenette', 'Garden Access'],
      sustainability_rating: 4.5,
      available: true,
      capacity: 4
    },
    {
      id: 'event-featured',
      name: 'Event Space',
      type: 'Event Space',
      description: 'Perfect for weddings, conferences, and special events',
      price_per_night: 2000,
      images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
      amenities: ['Wi-Fi', 'Sound System', 'Projector', 'Catering Kitchen', 'Outdoor Area', 'Parking'],
      sustainability_rating: 4.5,
      available: true,
      capacity: 50
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Eco-Lodges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully selected sustainable accommodations that blend comfort with environmental responsibility
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredRooms.map((accommodation) => (
              <CarouselItem key={accommodation.id} className="md:basis-1/2 lg:basis-1/3">
                <AccommodationCard accommodation={accommodation} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
