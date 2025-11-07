import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const BookingHistory = () => {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          rooms (
            name,
            room_type,
            images,
            accommodations (
              name,
              type
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-muted";
    }
  };

  const filterBookings = (status?: string) => {
    if (!bookings) return [];
    if (!status) return bookings;
    return bookings.filter((b) => b.status === status);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          You don't have any bookings yet. Start exploring our eco-lodges!
        </AlertDescription>
      </Alert>
    );
  }

  const BookingCard = ({ booking }: { booking: any }) => {
    const roomName = booking.rooms?.name || "Room";
    const accommodationName = booking.rooms?.accommodations?.name || "Zulu Lami Eco-Resort";
    const roomImage = booking.rooms?.images?.[0] || "/placeholder.svg";
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={roomImage}
              alt={roomName}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {roomName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {accommodationName}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  {booking.payment_status && (
                    <Badge variant="outline" className="text-xs">
                      Payment: {booking.payment_status}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {booking.check_in_date && format(new Date(booking.check_in_date), "MMM dd")} - 
                    {booking.check_out_date && format(new Date(booking.check_out_date), " MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{booking.guests} guests</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-primary">
                  R{Number(booking.total_price).toFixed(2)}
                </span>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4 mt-6">
        {filterBookings().map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>

      <TabsContent value="upcoming" className="space-y-4 mt-6">
        {filterBookings("confirmed").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>

      <TabsContent value="past" className="space-y-4 mt-6">
        {filterBookings("completed").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-4 mt-6">
        {filterBookings("cancelled").map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </TabsContent>
    </Tabs>
  );
};
