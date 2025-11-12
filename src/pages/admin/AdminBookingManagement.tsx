import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Mail, Eye } from "lucide-react";


interface Booking {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_id_number: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  admin_approved: boolean;
  special_requests: string;
  admin_notes: string;
  created_at: string;
  room_id: string;
}

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
    
    // Real-time subscription
    const channel = supabase
      .channel("admin-bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          admin_approved: true,
          status: "confirmed",
          admin_notes: adminNotes,
        })
        .eq("id", bookingId);

      if (error) throw error;

      // Send approval email with payment link
      await supabase.functions.invoke("send-booking-approval", {
        body: { bookingId, action: "approve" },
      });

      toast({
        title: "Booking Approved",
        description: "Approval email sent to guest with payment link",
      });
      
      setSelectedBooking(null);
      setAdminNotes("");
    } catch (error) {
      console.error("Error approving booking:", error);
      toast({
        title: "Error",
        description: "Failed to approve booking",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          admin_approved: false,
          status: "cancelled",
          admin_notes: adminNotes,
        })
        .eq("id", bookingId);

      if (error) throw error;

      // Send decline email to guest
      await supabase.functions.invoke("send-booking-approval", {
        body: { bookingId, action: "decline" },
      });

      toast({
        title: "Booking Declined",
        description: "Decline email sent to guest",
      });
      
      setSelectedBooking(null);
      setAdminNotes("");
    } catch (error) {
      console.error("Error declining booking:", error);
      toast({
        title: "Error",
        description: "Failed to decline booking",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      confirmed: "default",
      cancelled: "destructive",
      completed: "secondary",
    };
    return <Badge variant={variants[status] || "outline"}>{status.toUpperCase()}</Badge>;
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      paid: "default",
      failed: "destructive",
    };
    return <Badge variant={variants[paymentStatus] || "outline"}>{paymentStatus.toUpperCase()}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="border-b pb-4 mb-6">
            <h1 className="font-montserrat text-3xl font-bold text-primary">
              Admin Booking Management
            </h1>
          </div>
          <p className="text-muted-foreground">Loading bookings...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
                Admin Booking Management
              </h1>
              <p className="text-muted-foreground">
                Review and manage all guest booking requests
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">Administrator Panel</p>
              <p className="text-xs text-muted-foreground">Zulu Lami Eco-Resort</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{booking.guest_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Room ID: {booking.room_id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(booking.status)}
                    {getPaymentBadge(booking.payment_status)}
                    {booking.admin_approved && (
                      <Badge variant="default">Approved</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p>{new Date(booking.check_in_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Check-out</p>
                    <p>{new Date(booking.check_out_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Guests</p>
                    <p>{booking.guests}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Total</p>
                    <p className="text-lg font-bold">R{booking.total_price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t pt-4">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{booking.guest_email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>{booking.guest_phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">ID Number</p>
                    <p>{booking.guest_id_number}</p>
                  </div>
                </div>

                {booking.special_requests && (
                  <div className="border-t pt-4">
                    <p className="font-semibold text-sm mb-1">Special Requests</p>
                    <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                  </div>
                )}

                {booking.admin_notes && (
                  <div className="border-t pt-4">
                    <p className="font-semibold text-sm mb-1">Admin Notes</p>
                    <p className="text-sm text-muted-foreground">{booking.admin_notes}</p>
                  </div>
                )}

                {booking.status === "pending" && !booking.admin_approved && (
                  <div className="border-t pt-4 space-y-3">
                    <Textarea
                      placeholder="Add admin notes (optional)"
                      value={selectedBooking?.id === booking.id ? adminNotes : ""}
                      onChange={(e) => {
                        setSelectedBooking(booking);
                        setAdminNotes(e.target.value);
                      }}
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(booking.id)}
                        className="flex-1"
                        variant="default"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve & Send Payment Link
                      </Button>
                      <Button
                        onClick={() => handleDecline(booking.id)}
                        className="flex-1"
                        variant="destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                )}

                {booking.admin_approved && booking.payment_status === "pending" && (
                  <div className="border-t pt-4">
                    <Badge variant="outline" className="bg-yellow-50">
                      Awaiting Payment
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {bookings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No bookings found</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminBookingManagement;
