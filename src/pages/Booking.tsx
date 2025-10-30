import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { GuestInfoForm } from "@/components/booking/GuestInfoForm";
import { ExperienceAddOns } from "@/components/booking/ExperienceAddOns";
import { PaymentSection } from "@/components/booking/PaymentSection";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { differenceInDays } from "date-fns";

const bookingSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  idNumber: z.string().max(20).optional(),
  specialRequests: z.string().max(500).optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [room, setRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      idNumber: "",
      specialRequests: "",
    },
  });

  // Parse dates and guests from URL params
  const checkIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn")!)
    : new Date();
  const checkOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut")!)
    : new Date(Date.now() + 86400000);
  const guests = {
    adults: parseInt(searchParams.get("adults") || "2"),
    children: parseInt(searchParams.get("children") || "0"),
  };

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("*, accommodations(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching room:", error);
        toast({
          title: "Error",
          description: "Failed to load room details",
          variant: "destructive",
        });
      } else {
        setRoom(data);
      }
      setIsLoading(false);
    };

    fetchRoom();
  }, [id, toast]);

  const onSubmit = async (values: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a booking",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (!room) {
      toast({
        title: "Error",
        description: "Room information not available",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const nights = differenceInDays(checkOut, checkIn);
      const totalGuests = guests.adults + guests.children;
      const subtotal = nights * (room.price_per_night || 0);
      const serviceFee = subtotal * 0.1; // 10% service fee
      const totalPrice = subtotal + serviceFee;

      // Generate booking reference number
      const bookingRef = `ZL-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const { data: bookingData, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          room_id: room.id,
          accommodation_id: room.accommodation_id,
          check_in_date: checkIn.toISOString().split('T')[0],
          check_out_date: checkOut.toISOString().split('T')[0],
          guests: totalGuests,
          total_price: totalPrice,
          guest_name: `${values.firstName} ${values.lastName}`,
          guest_email: values.email,
          guest_phone: values.phone,
          guest_id_number: values.idNumber,
          special_requests: values.specialRequests || null,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Request Submitted!",
        description: `Booking reference: ${bookingRef}. Your booking is pending admin approval.`,
      });

      // Navigate to payment page after successful booking
      setTimeout(() => {
        navigate(`/payment/${bookingData.id}`);
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  if (!room) {
    return (
      <Layout>
        <div className="container py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Room not found
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const accommodation = {
    id: room.id,
    name: room.name,
    type: room.room_type,
    price_per_night: room.price_per_night,
    images: room.images || []
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-8">
          Complete Your Booking
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <GuestInfoForm form={form} />
                <ExperienceAddOns
                  selectedExperiences={selectedExperiences}
                  onSelectionChange={setSelectedExperiences}
                />
                <PaymentSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !acceptedTerms}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>

              <div>
                <BookingSummary
                  accommodation={accommodation}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Booking;
