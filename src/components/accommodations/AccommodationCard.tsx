import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Users } from "lucide-react";

interface Accommodation {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  price_per_night: number | null;
  capacity: number | null;
  images: string[] | null;
  amenities: string[] | null;
  available: boolean | null;
}

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  const navigate = useNavigate();
  const imageUrl = accommodation.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div 
        className="relative h-48 bg-cover bg-center transition-transform group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={() => navigate(`/accommodation/${accommodation.id}`)}
      >
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/90 text-background backdrop-blur">
            <Leaf className="w-3 h-3 mr-1" />
            Eco-Friendly
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-montserrat font-semibold text-lg mb-2 line-clamp-1">
          {accommodation.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {accommodation.description || "Experience sustainable luxury in the heart of nature"}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Up to {accommodation.capacity || 2} guests</span>
          </div>
          <div className="font-semibold text-primary">
            R{accommodation.price_per_night || 0}
            <span className="text-sm font-normal text-muted-foreground">/night</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => navigate(`/accommodation/${accommodation.id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
