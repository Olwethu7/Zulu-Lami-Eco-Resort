import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingEmailRequest {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  specialRequests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
    
  }

  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }

    const bookingData: BookingEmailRequest = await req.json();
    console.log('Received booking data:', bookingData);

    // Calculate number of nights
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Format the email body
    const emailBody = `
A new booking form was submitted:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GUEST INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${bookingData.guestName}
Email: ${bookingData.guestEmail}
Phone: ${bookingData.guestPhone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room: ${bookingData.roomName}
Check-in: ${bookingData.checkInDate}
Check-out: ${bookingData.checkOutDate}
Number of Nights: ${nights}
Number of Guests: ${bookingData.guests}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Amount: R${bookingData.totalPrice}

${bookingData.specialRequests ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${bookingData.specialRequests}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from Zulu Lami Eco-Resort booking system.
    `.trim();

    // Prepare SendGrid email payload
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: 'developmentteam86@gmail.com' }],
          subject: `New Booking: ${bookingData.roomName} - ${bookingData.guestName}`,
        },
      ],
      from: {
        email: 'no-reply@webeasybooking.com',
        name: 'Zulu Lami Eco-Resort',
      },
      content: [
        {
          type: 'text/plain',
          value: emailBody,
        },
      ],
    };

    console.log('Sending email via SendGrid...');

    // Send email via SendGrid API
    const sendGridResponse = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!sendGridResponse.ok) {
      const errorText = await sendGridResponse.text();
      console.error('SendGrid API error:', errorText);
      throw new Error(`SendGrid API error: ${sendGridResponse.status} - ${errorText}`);
    }

    console.log('✅ Email sent successfully to developmentteam86@gmail.com');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking email sent successfully!' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-booking-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: 'Failed to send booking email.' 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
