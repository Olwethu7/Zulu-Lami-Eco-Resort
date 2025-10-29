import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { bookingId, action } = await req.json();

    // Fetch booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError) throw bookingError;

    const origin = req.headers.get("origin") || "https://zululami.co.za";
    const paymentLink = `${origin}/payment/${bookingId}`;

    let emailSubject: string;
    let emailHtml: string;

    if (action === "decline") {
      // Decline email template
      emailSubject = "Booking Request Update - Zulu Lami Eco-Resort";
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
            .button { background: #E76F51; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .info-box { background: #fef3e8; border-left: 4px solid #E76F51; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Zulu Lami Eco-Resort</h1>
              <p>Booking Request Update</p>
            </div>
            <div class="content">
              <h2>Dear ${booking.guest_name},</h2>
              <p>Thank you for your interest in Zulu Lami Eco-Resort.</p>
              
              <div class="info-box">
                <p style="margin: 0;"><strong>Unfortunately, we are unable to accommodate your booking request at this time.</strong></p>
              </div>

              <p><strong>Booking Reference:</strong> ${bookingId.substring(0, 8).toUpperCase()}</p>
              <p><strong>Check-in Date:</strong> ${new Date(booking.check_in_date).toLocaleDateString()}</p>
              <p><strong>Check-out Date:</strong> ${new Date(booking.check_out_date).toLocaleDateString()}</p>
              
              ${booking.admin_notes ? `
                <div style="background: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <strong>Message from our team:</strong>
                  <p>${booking.admin_notes}</p>
                </div>
              ` : ''}

              <p>We would love to welcome you on alternative dates. Please feel free to contact us or make a new booking request for different dates.</p>

              <a href="${origin}/search" class="button">Browse Available Dates</a>

              <p style="margin-top: 30px;">For any questions, please contact us at:</p>
              <p>
                Email: bookings@zululami.co.za<br>
                Phone: +27 (0) 123-456-789
              </p>

              <p>We look forward to welcoming you in the future!</p>
              <p>Warm regards,<br><strong>The Zulu Lami Team</strong></p>
            </div>
            <div class="footer">
              <p>Zulu Lami Eco-Resort | KwaZulu-Natal, South Africa</p>
              <p>Sustainable Tourism | Authentic Cultural Experiences</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Approval email template
      emailSubject = "Booking Approved - Payment Required";
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
            .button { background: #E76F51; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
            .success-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; }
            .booking-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .price { font-size: 24px; color: #1B4332; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Approved!</h1>
              <p>Your reservation at Zulu Lami Eco-Resort</p>
            </div>
            <div class="content">
              <h2>Dear ${booking.guest_name},</h2>
              <p>Great news! Your booking request has been approved.</p>
              
              <div class="success-box">
                <p style="margin: 0;"><strong>✓ Your booking has been confirmed</strong></p>
              </div>

              <div class="booking-details">
                <h3 style="margin-top: 0;">Booking Details</h3>
                <p><strong>Booking Reference:</strong> ${bookingId.substring(0, 8).toUpperCase()}</p>
                <p><strong>Check-in:</strong> ${new Date(booking.check_in_date).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> ${new Date(booking.check_out_date).toLocaleDateString()}</p>
                <p><strong>Number of Guests:</strong> ${booking.guests}</p>
                <p class="price">Total Amount: R${booking.total_price.toFixed(2)}</p>
              </div>

              ${booking.admin_notes ? `
                <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <strong>Special Note from our team:</strong>
                  <p>${booking.admin_notes}</p>
                </div>
              ` : ''}

              <h3>Next Steps:</h3>
              <ol>
                <li>Click the button below to proceed with payment</li>
                <li>Complete your secure payment</li>
                <li>Download your Proof of Payment</li>
                <li>Present the proof upon arrival</li>
              </ol>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${paymentLink}" class="button">Complete Payment Now</a>
              </div>

              <p style="font-size: 12px; color: #666;">
                <strong>Important:</strong> This payment link will expire in 48 hours. Please complete your payment before ${new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString()}.
              </p>

              <p style="margin-top: 30px;">If you have any questions, please contact us:</p>
              <p>
                Email: bookings@zululami.co.za<br>
                Phone: +27 (0) 123-456-789
              </p>

              <p>We look forward to welcoming you!</p>
              <p>Warm regards,<br><strong>The Zulu Lami Team</strong></p>
            </div>
            <div class="footer">
              <p>Zulu Lami Eco-Resort | KwaZulu-Natal, South Africa</p>
              <p>Sustainable Tourism | Authentic Cultural Experiences</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Send email via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zulu Lami Eco-Resort <onboarding@resend.dev>",
        to: [booking.guest_email],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData.message || emailResponse.statusText}`);
    }

    const emailData = await emailResponse.json();
    console.log(`Email sent successfully to ${booking.guest_email}`, emailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${action === "decline" ? "Decline" : "Approval"} email sent successfully`,
        paymentLink: action === "decline" ? null : paymentLink,
        emailId: emailData?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-booking-approval function:", error);
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
