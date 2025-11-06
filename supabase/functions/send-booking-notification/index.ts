import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import notificationapi from 'npm:notificationapi-node-server-sdk';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize NotificationAPI
    const clientId = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
    const clientSecret = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");
    
    if (!clientId || !clientSecret) {
      throw new Error("NotificationAPI credentials are not configured");
    }

    notificationapi.init(clientId, clientSecret);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { record } = await req.json();
    const booking = record;

    // Fetch room details
    const { data: room } = await supabaseClient
      .from("rooms")
      .select("name, room_type")
      .eq("id", booking.room_id)
      .single();

    const roomName = room?.name || "Room";
    const roomType = room?.room_type || "N/A";

    // Admin email - using environment variable
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@zululami.com";
    
    // Format dates
    const checkInDate = new Date(booking.check_in_date).toLocaleDateString('en-ZA', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString('en-ZA', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Send admin notification
    console.log(`Sending admin notification to: ${adminEmail}`);
    await notificationapi.send({
      notificationId: 'booking_notification',
      user: {
        id: adminEmail,
        email: adminEmail
      },
      mergeTags: {
        booking_reference: booking.id.substring(0, 8).toUpperCase(),
        room_type: roomType.charAt(0).toUpperCase() + roomType.slice(1),
        room_name: roomName,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: booking.guests.toString(),
        total_price: `R${Number(booking.total_price).toFixed(2)}`,
        guest_name: booking.guest_name,
        guest_email: booking.guest_email,
        guest_phone: booking.guest_phone,
        special_requests: booking.special_requests || 'None'
      }
    });
    console.log(`Admin notification sent to ${adminEmail}`);

    // Send guest confirmation
    console.log(`Sending guest confirmation to: ${booking.guest_email}`);
    await notificationapi.send({
      notificationId: 'booking_confirmation',
      user: {
        id: booking.guest_email,
        email: booking.guest_email
      },
      mergeTags: {
        guest_name: booking.guest_name,
        booking_reference: booking.id.substring(0, 8).toUpperCase(),
        room_type: roomType.charAt(0).toUpperCase() + roomType.slice(1),
        room_name: roomName,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: booking.guests.toString(),
        total_price: `R${Number(booking.total_price).toFixed(2)}`,
        special_requests: booking.special_requests || 'None',
        contact_email: adminEmail
      }
    });
    console.log(`Guest confirmation sent to ${booking.guest_email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking notifications sent successfully via NotificationAPI",
        adminEmail: adminEmail,
        guestEmail: booking.guest_email
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
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
