import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/search/DateRangePicker";
import { GuestSelector } from "@/components/search/GuestSelector";
import { DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import { useRoomAvailability } from "@/hooks/useRoomAvailability";

interface BookingWidgetProps {
  roomId: string;
  pricePerNight: number;
}

export const BookingWidget = ({ roomId, pricePerNight }: BookingWidgetProps) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  const { data: availableRooms } = useRoomAvailability(
    roomId,
    dateRange?.from,
    dateRange?.to
    
  );

  const nights = dateRange?.from && dateRange?.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;

  const subtotal = nights * pricePerNight;
  const serviceFee = subtotal * 0.1; // 10% service fee
  const total = subtotal + serviceFee;

  const handleReserve = () => {
    const params = new URLSearchParams();
    if (dateRange?.from) {
      params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
    }
    if (dateRange?.to) {
      params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));
    }
    params.set("adults", guests.adults.toString());
    params.set("children", guests.children.toString());
    
    navigate(`/booking/${roomId}?${params.toString()}`);
  };

  const canReserve = dateRange?.from && dateRange?.to && nights > 0 && availableRooms && availableRooms > 0;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">R{pricePerNight}</span>
            <span className="text-muted-foreground">/ night</span>
          </div>
          <Badge variant={availableRooms && availableRooms > 0 ? "default" : "destructive"}>
            {availableRooms || 0} available
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Check-in / Check-out</label>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Guests</label>
          <GuestSelector value={guests} onChange={setGuests} />
        </div>

        {canReserve && (
          <>
            <Separator />
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
                <span>Total</span>
                <span>R{total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter>
        <Button
          size="lg"
          className="w-full"
          disabled={!canReserve}
          onClick={handleReserve}
        >
          {!availableRooms || availableRooms === 0
            ? "Sold Out"
            : canReserve
            ? "Reserve"
            : "Select dates"}
        </Button>
      </CardFooter>
    </Card>
  );
};
