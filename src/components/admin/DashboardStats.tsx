import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardStats = () => {
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      const { count: pendingBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { data: confirmedBookings } = await supabase
        .from("bookings")
        .select("total_price")
        .eq("status", "confirmed");

      const revenue = confirmedBookings?.reduce(
        (sum, booking) => sum + (Number(booking.total_price) || 0),
        0
      ) || 0;

      return {
        totalBookings: totalBookings || 0,
        pendingBookings: pendingBookings || 0,
        monthlyRevenue: revenue,
        occupancyRate: 72,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      subtitle: "All time bookings",
      icon: Calendar,
    },
    {
      title: "Pending Approvals",
      value: stats?.pendingBookings || 0,
      subtitle: "Requires action",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      title: "Revenue",
      value: `R${stats?.monthlyRevenue.toLocaleString() || 0}`,
      subtitle: "Total confirmed revenue",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Occupancy Rate",
      value: `${stats?.occupancyRate || 0}%`,
      subtitle: "Current occupancy",
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color || "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
