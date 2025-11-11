import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, TrendingUp, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const AdminReports = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const { data: bookings } = await supabase
        .from("bookings")
        .select(`
          *,
          rooms (name, room_type)
        `);

      if (!bookings) return null;

      const confirmedBookings = bookings.filter(b => b.status === "confirmed");
      const totalRevenue = confirmedBookings.reduce(
        (sum, b) => sum + (Number(b.total_price) || 0), 
        0
      );
      const avgBookingValue = confirmedBookings.length > 0 
        ? totalRevenue / confirmedBookings.length 
        : 0;

      const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (5 - i));
        const monthName = month.toLocaleDateString("en-US", { month: "short" });
        
        const monthBookings = bookings.filter(b => {
          const bookingDate = new Date(b.created_at);
          return bookingDate.getMonth() === month.getMonth() &&
                 bookingDate.getFullYear() === month.getFullYear();
        });

        const revenue = monthBookings
          .filter(b => b.status === "confirmed")
          .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);

        return {
          month: monthName,
          bookings: monthBookings.length,
          revenue: revenue,
        };
      });

      const revenueByStatus = [
        {
          name: "Pending",
          value: bookings
            .filter(b => b.status === "pending")
            .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0),
        },
        {
          name: "Approved",
          value: bookings
            .filter(b => b.status === "confirmed")
            .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0),
        },
        {
          name: "Declined",
          value: bookings
            .filter(b => b.status === "cancelled")
            .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0),
        },
        {
          name: "Completed",
          value: bookings
            .filter(b => b.status === "completed")
            .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0),
        },
      ];

      const roomTypeData = bookings.reduce((acc: any, booking) => {
        const roomType = booking.rooms?.name || "Unknown";
        if (!acc[roomType]) {
          acc[roomType] = 0;
        }
        acc[roomType]++;
        return acc;
      }, {});

      const roomDistribution = Object.entries(roomTypeData).map(([name, value]) => ({
        name,
        value,
      }));

      const { count: roomTypes } = await supabase
        .from("rooms")
        .select("*", { count: "exact", head: true });

      return {
        totalRevenue,
        avgBookingValue,
        totalBookings: bookings.length,
        roomTypes: roomTypes || 0,
        monthlyData,
        revenueByStatus,
        roomDistribution,
      };
    },
  });

  const COLORS = ["#1B4332", "#2D6A4F", "#52B788", "#95D5B2"];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Revenue reports, trends, and insights
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R{stats?.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From confirmed bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Booking Value
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R{stats?.avgBookingValue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">Per booking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Room Types
              </CardTitle>
              <Home className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.roomTypes}</div>
              <p className="text-xs text-muted-foreground">Available types</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Booking Trends</CardTitle>
              <p className="text-sm text-muted-foreground">Number of bookings per month</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats?.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#1B4332" 
                    name="bookings"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Status</CardTitle>
              <p className="text-sm text-muted-foreground">Total revenue breakdown</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.revenueByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1B4332" name="amount" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings by Room Type</CardTitle>
              <p className="text-sm text-muted-foreground">Distribution of bookings</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats?.roomDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats?.roomDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <p className="text-sm text-muted-foreground">Revenue trends over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#52B788" name="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;
