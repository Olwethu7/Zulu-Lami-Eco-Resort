-- Remove the problematic trigger and function that require pg_net extension
DROP TRIGGER IF EXISTS on_booking_created ON public.bookings;
DROP FUNCTION IF EXISTS public.trigger_send_booking_notification();