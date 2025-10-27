import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Award } from "lucide-react";

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration: number | null;
  max_participants: number | null;
  location: string | null;
  images: string[] | null;
  cultural_authenticity_badge: boolean | null;
}

export const ExperienceCard = ({
  title,
  description,
  price,
  duration,
  max_participants,
  location,
  images,
  cultural_authenticity_badge,
}: ExperienceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {images && images.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={images[0]} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {cultural_authenticity_badge && (
            <Badge className="absolute top-4 right-4 bg-primary">
              <Award className="h-3 w-3 mr-1" />
              Authentic
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-montserrat text-xl font-semibold mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          {duration && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{Math.floor(duration / 60)}h {duration % 60}m</span>
            </div>
          )}
          
          {max_participants && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Max {max_participants} participants</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              R{price?.toFixed(2) || '0.00'}
            </p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          
          <Button variant="outline">View Details</Button>
        </div>
      </div>
    </Card>
  );
};
