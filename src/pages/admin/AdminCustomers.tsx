import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Calendar, Award, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminCustomers = () => {
  const { data: customers } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!profiles) return [];

      const customersWithBookings = await Promise.all(
        profiles.map(async (profile) => {
          const { count } = await supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .eq("user_id", profile.id);

          return {
            ...profile,
            bookingCount: count || 0,
          };
        })
      );

      return customersWithBookings;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["customer-stats"],
    queryFn: async () => {
      const { count: totalCustomers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      return {
        totalCustomers: totalCustomers || 0,
        totalBookings: totalBookings || 0,
        goldMembers: customers?.filter((c) => c.bookingCount >= 5).length || 0,
        platinumMembers: customers?.filter((c) => c.bookingCount >= 8).length || 0,
      };
    },
    enabled: !!customers,
  });

  const getLoyaltyBadge = (bookingCount: number) => {
    if (bookingCount >= 8) return { label: "PLATINUM", color: "bg-purple-500" };
    if (bookingCount >= 5) return { label: "GOLD", color: "bg-yellow-500" };
    if (bookingCount >= 3) return { label: "SILVER", color: "bg-gray-400" };
    return { label: "BRONZE", color: "bg-orange-600" };
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Customer Management
          </h1>
          <p className="text-muted-foreground">
            View and manage customer profiles and history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gold Members
              </CardTitle>
              <Award className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.goldMembers}</div>
              <p className="text-xs text-muted-foreground">Premium customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Platinum Members
              </CardTitle>
              <Crown className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.platinumMembers}</div>
              <p className="text-xs text-muted-foreground">VIP customers</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Phone
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Total Bookings
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Loyalty Status
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Member Since
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers?.map((customer) => {
                    const loyalty = getLoyaltyBadge(customer.bookingCount);
                    return (
                      <tr key={customer.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-primary">
                              <AvatarFallback className="text-xs text-primary-foreground">
                                {customer.full_name?.charAt(0) || customer.email?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {customer.full_name || "Guest User"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {customer.email}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {customer.phone || "-"}
                        </td>
                        <td className="py-4 px-4 text-center font-semibold">
                          {customer.bookingCount}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge className={`${loyalty.color} text-white`}>
                            {loyalty.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminCustomers;
