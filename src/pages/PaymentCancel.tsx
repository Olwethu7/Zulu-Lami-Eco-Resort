import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <Layout>
      <div className="container py-16 max-w-2xl">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="flex justify-center">
              <XCircle className="w-20 h-20 text-orange-500" />
            </div>

            <div className="space-y-2">
              <h1 className="font-montserrat text-3xl font-bold text-primary">
                Payment Cancelled
              </h1>
              <p className="text-lg text-muted-foreground">
                Your payment was not completed
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-3 text-left">
              <p className="text-sm text-muted-foreground">
                <strong>What happened?</strong>
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Your booking is still reserved but not confirmed</li>
                <li>• No payment has been charged</li>
                <li>• You can try again to complete payment</li>
                <li>• Your reservation will be held for 24 hours</li>
              </ul>
            </div>

            {bookingId && (
              <div className="text-sm text-muted-foreground">
                <p>Booking Reference: <span className="font-mono font-semibold">{bookingId}</span></p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              {bookingId && (
                <Button asChild size="lg">
                  <Link to={`/payment/${bookingId}`}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Try Payment Again
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link to="/bookings">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to My Bookings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentCancel;
