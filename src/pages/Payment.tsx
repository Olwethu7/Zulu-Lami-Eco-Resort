import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format, differenceInDays } from "date-fns";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId || !user) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          rooms (
            name,
            room_type,
            price_per_night,
            images
          )
        `)
        .eq("id", bookingId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "Booking not found",
          variant: "destructive",
        });
        navigate("/bookings");
      } else {
        setBooking(data);
      }
      setIsLoading(false);
    };

    fetchBooking();
  }, [bookingId, user, navigate, toast]);

  const handlePayment = async () => {
    if (!booking || !user) return;

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment-checkout", {
        body: { bookingId: booking.id },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, "_blank");
        
        toast({
          title: "Payment Checkout Opened",
          description: "Complete your payment in the new tab to confirm your booking.",
        });
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!booking) return null;

  const nights = booking.check_in_date && booking.check_out_date
    ? differenceInDays(new Date(booking.check_out_date), new Date(booking.check_in_date))
    : 0;

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-8">
          Complete Payment
        </h1>

        {booking.payment_status === "paid" && (
          <Alert className="mb-6">
            <AlertDescription>
              This booking has already been paid. No further payment is required.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {booking.rooms?.images?.[0] && (
                <img
                  src={booking.rooms.images[0]}
                  alt={booking.rooms.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              
              <div>
                <h3 className="font-semibold text-lg">{booking.rooms?.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {booking.rooms?.room_type} Room
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-medium">
                    {booking.check_in_date && format(new Date(booking.check_in_date), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-medium">
                    {booking.check_out_date && format(new Date(booking.check_out_date), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nights:</span>
                  <span className="font-medium">{nights}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    R{booking.rooms?.price_per_night} × {nights} nights
                  </span>
                  <span>R{(booking.rooms?.price_per_night * nights).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service fee (10%)</span>
                  <span>R{(booking.rooms?.price_per_night * nights * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">R{Number(booking.total_price).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Action */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <CreditCard className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">Secure Card Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Powered by Stripe
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>✓ Secure payment processing</p>
                <p>✓ All major credit cards accepted</p>
                <p>✓ Instant booking confirmation</p>
                <p>✓ Protected transaction</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Payment is required to confirm your booking. Your reservation will be held for 24 hours.
                </AlertDescription>
              </Alert>

              <Button
                size="lg"
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing || booking.payment_status === "paid"}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Opening Payment...
                  </>
                ) : booking.payment_status === "paid" ? (
                  "Already Paid"
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay R{Number(booking.total_price).toFixed(2)}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By clicking "Pay", you agree to the booking terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
