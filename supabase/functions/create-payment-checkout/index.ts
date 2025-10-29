import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe Price IDs for room types (per night)
const STRIPE_PRICE_IDS: Record<string, string> = {
  single: "price_1SNYmeJt7tSDnBRMQZ967Jka",
  double: "price_1SNYn6Jt7tSDnBRMRNEbUbsd",
  family: "price_1SNYnPJt7tSDnBRMPaNMBs4A",
  event: "price_1SNYo2Jt7tSDnBRMgp5UrQqd",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-PAYMENT-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const { bookingId } = await req.json();
    if (!bookingId) throw new Error("Booking ID is required");
    logStep("Booking ID received", { bookingId });

    // Fetch booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select(`
        *,
        rooms (
          room_type,
          price_per_night
        )
      `)
      .eq("id", bookingId)
      .eq("user_id", user.id)
      .single();

    if (bookingError || !booking) {
      throw new Error("Booking not found or access denied");
    }
    logStep("Booking fetched", { 
      bookingId, 
      roomType: booking.rooms?.room_type,
      totalPrice: booking.total_price 
    });

    // Get Stripe price ID for room type
    const roomType = booking.rooms?.room_type?.toLowerCase();
    const stripePriceId = STRIPE_PRICE_IDS[roomType];
    if (!stripePriceId) {
      throw new Error(`No Stripe price found for room type: ${roomType}`);
    }
    logStep("Stripe price ID found", { roomType, stripePriceId });

    // Calculate nights
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.check_out_date);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    logStep("Calculated nights", { nights });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer, will create at checkout");
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: stripePriceId,
          quantity: nights,
        },
      ],
      mode: "payment",
      metadata: {
        bookingId: booking.id,
        userId: user.id,
        roomType: roomType,
        nights: nights.toString(),
      },
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancel?booking_id=${bookingId}`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
