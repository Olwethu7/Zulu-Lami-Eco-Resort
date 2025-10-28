import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { BookingsTable } from "@/components/admin/BookingsTable";

const AdminBookings = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Booking Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all reservations in real-time
          </p>
        </div>
        
        <BookingsTable />
      </main>
    </div>
  );
};

export default AdminBookings;
