import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingId = searchParams.get("booking_id");
  const sessionId = searchParams.get("session_id");
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    const updateBookingPaymentStatus = async () => {
      if (!bookingId) {
        setIsUpdating(false);
        return;
      }

      try {
        // Update booking payment status
        const { error } = await supabase
          .from("bookings")
          .update({ 
            payment_status: "paid",
            admin_approved: true 
          })
          .eq("id", bookingId);

        if (error) throw error;

        toast({
          title: "Payment Successful!",
          description: "Your booking has been confirmed.",
        });
      } catch (error) {
        console.error("Error updating booking:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    updateBookingPaymentStatus();
  }, [bookingId, toast]);

  return (
    <Layout>
      <div className="container py-16 max-w-2xl">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>

            <div className="space-y-2">
              <h1 className="font-montserrat text-3xl font-bold text-primary">
                Payment Successful!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your booking has been confirmed
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-3 text-left">
              <p className="text-sm text-muted-foreground">
                <strong>What's next?</strong>
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ Confirmation email has been sent to your inbox</li>
                <li>✓ Your booking is now confirmed and reserved</li>
                <li>✓ You can view your booking details anytime</li>
                <li>✓ Check your email for check-in instructions</li>
              </ul>
            </div>

            {bookingId && (
              <div className="text-sm text-muted-foreground">
                <p>Booking Reference: <span className="font-mono font-semibold">{bookingId}</span></p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg">
                <Link to="/bookings">
                  <Calendar className="w-4 h-4 mr-2" />
                  View My Bookings
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
