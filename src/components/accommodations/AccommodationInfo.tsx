import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  MapPin,
  Users,
  Leaf,
  Check,
} from "lucide-react";

interface AccommodationInfoProps {
  accommodation: {
    name: string;
    room_type?: string | null;
    type?: string | null;
    description: string | null;
    capacity: number | null;
    amenities: string[] | null;
  };
}

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "Swimming Pool": Waves,
  Restaurant: UtensilsCrossed,
  Spa: Sparkles,
  "Hiking Trails": MapPin,
  "Solar Power": Leaf,
};

export const AccommodationInfo = ({ accommodation }: AccommodationInfoProps) => {
  const roomType = accommodation.room_type || accommodation.type;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2 flex-wrap gap-4">
          <div className="flex-1">
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-2">
              {accommodation.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>KwaZulu-Natal, South Africa</span>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Leaf className="w-3 h-3 mr-1" />
            Eco-Certified
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Up to {accommodation.capacity || 2} guests</span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <span className="capitalize">{roomType || "Eco-Lodge"}</span>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h2 className="font-montserrat text-xl font-semibold mb-3">About this place</h2>
        <p className="text-muted-foreground leading-relaxed">
          {accommodation.description ||
            "Experience sustainable luxury in the heart of nature. This eco-friendly accommodation combines modern comfort with traditional Zulu heritage, offering an authentic and environmentally conscious stay."}
        </p>
      </div>

      {/* Amenities */}
      {accommodation.amenities && accommodation.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What this place offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accommodation.amenities.map((amenity, index) => {
                const Icon = amenityIcons[amenity] || Check;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
