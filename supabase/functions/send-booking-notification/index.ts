import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
    
  }

  try {
    // Get NotificationAPI credentials
    const clientId = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
    const clientSecret = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");
    
    if (!clientId || !clientSecret) {
      throw new Error("NotificationAPI credentials are not configured");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { record } = await req.json();
    const booking = record;

    console.log('Processing booking notification for booking:', booking.id);

    // Fetch room details
    const { data: room } = await supabaseClient
      .from("rooms")
      .select("name, room_type")
      .eq("id", booking.room_id)
      .single();

    const roomName = room?.name || "Room";
    const roomType = room?.room_type || "N/A";

    // Admin email - hardcoded for testing
    const adminEmail = "developmentteam86@gmail.com";
    
    // Format booking reference
    const bookingRef = booking.id.substring(0, 8).toUpperCase();
    
    // Prepare auth header for NotificationAPI
    const authHeader = 'Basic ' + btoa(`${clientId}:${clientSecret}`);
    
    // Send admin notification
    console.log(`Sending admin notification to: ${adminEmail}`);
    const adminResponse = await fetch('https://api.notificationapi.com/sender/notifications', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'booking_notification',
        to: {
          id: adminEmail,
          email: adminEmail
        },
        parameters: {
          booking_reference: bookingRef,
          room_name: roomName,
          room_type: roomType,
          guest_name: booking.guest_name,
          guest_email: booking.guest_email,
          guest_phone: booking.guest_phone,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          guests: booking.guests.toString(),
          total_price: booking.total_price,
          special_requests: booking.special_requests || 'None'
        }
      })
    });

    if (!adminResponse.ok) {
      const errorData = await adminResponse.text();
      console.error('Admin notification error:', errorData);
      throw new Error(`Failed to send admin notification: ${adminResponse.statusText}`);
    }
    
    console.log(`Admin notification sent successfully to ${adminEmail}`);

    // Send guest confirmation
    console.log(`Sending guest confirmation to: ${booking.guest_email}`);
    const guestResponse = await fetch('https://api.notificationapi.com/sender/notifications', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'booking_confirmation',
        to: {
          id: booking.guest_email,
          email: booking.guest_email
        },
        parameters: {
          guest_name: booking.guest_name,
          booking_reference: bookingRef,
          room_name: roomName,
          room_type: roomType,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          guests: booking.guests.toString(),
          total_price: booking.total_price,
          special_requests: booking.special_requests || 'None',
          contact_email: adminEmail
        }
      })
    });

    if (!guestResponse.ok) {
      const errorData = await guestResponse.text();
      console.error('Guest confirmation error:', errorData);
      // Don't throw here, admin notification is more critical
      console.warn(`Failed to send guest confirmation to ${booking.guest_email}`);
    } else {
      console.log(`Guest confirmation sent successfully to ${booking.guest_email}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking notifications sent successfully via NotificationAPI",
        adminEmail: adminEmail,
        guestEmail: booking.guest_email,
        bookingReference: bookingRef,
        guestNotificationSent: guestResponse.ok
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-booking-notification function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
