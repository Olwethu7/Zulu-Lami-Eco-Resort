-- Create trigger to automatically send notifications when a booking is created
CREATE OR REPLACE FUNCTION public.trigger_send_booking_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  request_id bigint;
BEGIN
  -- Call the edge function asynchronously using pg_net
  SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/send-booking-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  ) INTO request_id;
  
  RETURN NEW;
END;
$function$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_booking_created ON public.bookings;
CREATE TRIGGER on_booking_created
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_booking_notification();