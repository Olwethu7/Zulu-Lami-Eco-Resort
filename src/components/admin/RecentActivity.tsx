import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const RecentActivity = () => {
  
  const { data: activities } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select(`
          *,
          rooms (name)
        `)
        .order("created_at", { ascending: false })
        .limit(5);

      return bookings?.map((booking) => ({
        id: booking.id,
        type: booking.status,
        guest: booking.guest_name,
        room: booking.rooms?.name,
        amount: booking.total_price,
        timestamp: booking.created_at,
      })) || [];
    },
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Calendar className="h-4 w-4 text-orange-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-primary" />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case "confirmed":
        return `Booking ${activity.id.slice(0, 5)} approved for ${activity.guest}`;
      case "cancelled":
        return `Booking ${activity.id.slice(0, 5)} declined - No availability`;
      case "pending":
        return `New booking received from ${activity.guest}`;
      default:
        return `Payment received for ${activity.id.slice(0, 5)} - R${activity.amount}`;
    }
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">
              {getActivityText(activity)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
