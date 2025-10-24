import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedAccommodations = () => {
  const { data: accommodations, isLoading } = useQuery({
    queryKey: ["featured-accommodations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("available", true)
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {accommodations?.map((accommodation) => (
                <CarouselItem key={accommodation.id} className="md:basis-1/2 lg:basis-1/3">
                  <AccommodationCard accommodation={accommodation} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
};
