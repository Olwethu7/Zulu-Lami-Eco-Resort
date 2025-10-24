import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your resort overview.
          </p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBookings />
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/bookings"
                className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold">Manage Bookings</p>
                <p className="text-sm text-muted-foreground">
                  View and update reservations
                </p>
              </a>
              <a
                href="/admin/rooms"
                className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold">Manage Accommodations</p>
                <p className="text-sm text-muted-foreground">
                  Update inventory and pricing
                </p>
              </a>
              <a
                href="/admin/content"
                className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <p className="font-semibold">Content Management</p>
                <p className="text-sm text-muted-foreground">
                  Upload photos and manage listings
                </p>
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
