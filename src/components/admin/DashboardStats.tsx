import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Home, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [bookingsRes, accommodationsRes] = await Promise.all([
        supabase.from("bookings").select("*", { count: "exact", head: true }),
        supabase.from("accommodations").select("*", { count: "exact", head: true }),
      ]);

      const bookingsThisMonth = await supabase
        .from("bookings")
        .select("total_price")
        .gte("created_at", new Date(new Date().setDate(1)).toISOString());

      const revenue = bookingsThisMonth.data?.reduce(
        (sum, booking) => sum + (Number(booking.total_price) || 0),
        0
      ) || 0;

      return {
        totalBookings: bookingsRes.count || 0,
        totalAccommodations: accommodationsRes.count || 0,
        monthlyRevenue: revenue,
        occupancyRate: 75, // Mock data
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
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Revenue (This Month)",
      value: `R${stats?.monthlyRevenue.toFixed(2) || 0}`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Properties",
      value: stats?.totalAccommodations || 0,
      icon: Home,
      color: "text-purple-500",
    },
    {
      title: "Occupancy Rate",
      value: `${stats?.occupancyRate || 0}%`,
      icon: Users,
      color: "text-orange-500",
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
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
