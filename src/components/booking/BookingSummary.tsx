import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, MapPin } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface BookingSummaryProps {
  accommodation: {
    id: string;
    name: string;
    type: string | null;
    
    price_per_night: number | null;
    images: string[] | null;
  };
  checkIn: Date;
  checkOut: Date;
  guests: { adults: number; children: number };
}

export const BookingSummary = ({
  accommodation,
  checkIn,
  checkOut,
  guests,
}: BookingSummaryProps) => {
  const nights = differenceInDays(checkOut, checkIn);
  const pricePerNight = accommodation.price_per_night || 0;
  const subtotal = nights * pricePerNight;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Accommodation Info */}
        <div className="flex gap-4">
          <img
            src={accommodation.images?.[0] || "/placeholder.svg"}
            alt={accommodation.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{accommodation.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {accommodation.type || "Eco-Lodge"}
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3" />
              <span>KwaZulu-Natal</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Check-in</p>
              <p className="text-muted-foreground">{format(checkIn, "PPP")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Check-out</p>
              <p className="text-muted-foreground">{format(checkOut, "PPP")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Guests</p>
              <p className="text-muted-foreground">
                {guests.adults} {guests.adults === 1 ? "adult" : "adults"}
                {guests.children > 0 &&
                  `, ${guests.children} ${guests.children === 1 ? "child" : "children"}`}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              R{pricePerNight} x {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service fee</span>
            <span>R{serviceFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>Total (ZAR)</span>
            <span className="text-primary">R{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
