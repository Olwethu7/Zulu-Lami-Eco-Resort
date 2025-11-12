import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Printer } from "lucide-react";

const PaymentProof = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (error) throw error;
      
      if (data.payment_status !== "paid") {
        navigate("/bookings");
        return;
      }

      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In production, generate actual PDF
    alert("PDF generation would be implemented here using a library like jsPDF or html2pdf");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading proof of payment...</p>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Booking not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Your booking is confirmed. Please save this proof of payment.
          </p>
        </div>

        <Card className="mb-6 print:shadow-none" id="proof-of-payment">
          <CardHeader className="bg-primary text-primary-foreground print:bg-white print:text-primary">
            <CardTitle className="text-center text-2xl">
              PROOF OF PAYMENT
            </CardTitle>
            <p className="text-center text-sm opacity-90">
              Zulu Lami Eco-Resort
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Booking Reference</p>
                <p className="font-mono font-semibold">{booking.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Guest Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-semibold">{booking.guest_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-semibold">{booking.guest_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-semibold">{booking.guest_phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID Number</span>
                  <span className="font-semibold">{booking.guest_id_number}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room ID</span>
                  <span className="font-semibold">{booking.room_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in Date</span>
                  <span className="font-semibold">
                    {new Date(booking.check_in_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out Date</span>
                  <span className="font-semibold">
                    {new Date(booking.check_out_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Guests</span>
                  <span className="font-semibold">{booking.guests}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">Total Amount Paid</span>
                <span className="font-bold text-2xl text-primary">
                  R{booking.total_price}
                </span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm">
              <p className="font-semibold mb-2">Important Information:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Please present this proof of payment upon arrival</li>
                <li>Check-in time: 2:00 PM | Check-out time: 10:00 AM</li>
                <li>For inquiries, contact: info@zululami.co.za</li>
                <li>Cancellation policy applies as per terms and conditions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="flex-1">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={() => navigate("/bookings")} className="flex-1">
            View My Bookings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentProof;


