import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export const RecentBookings = () => {
  const { data: bookings, isLoading } = useQuery<Array<any>>({
    queryKey: ["recent-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          accommodations (name)
        `)
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      // Fetch user profiles separately
      if (data) {
        const userIds = [...new Set(data.map((b: any) => b.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", userIds);
        
        // Map profiles to bookings
        return data.map((booking: any) => ({
          ...booking,
          profile: profiles?.find((p: any) => p.id === booking.user_id),
        }));
      }
      
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold">{booking.accommodations?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.profile?.full_name || booking.profile?.email || "Guest"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {booking.check_in_date && format(new Date(booking.check_in_date), "MMM dd")} -{" "}
                  {booking.check_out_date && format(new Date(booking.check_out_date), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">R{booking.total_price}</span>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
