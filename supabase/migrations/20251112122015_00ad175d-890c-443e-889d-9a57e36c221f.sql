-- Fix search_path for check_booking_overlap function

CREATE OR REPLACE FUNCTION public.check_booking_overlap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.bookings
    WHERE user_id = NEW.user_id
      AND room_id = NEW.room_id
      AND status IN ('pending', 'confirmed')
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      AND (
        (check_in_date <= NEW.check_in_date AND check_out_date > NEW.check_in_date)
        OR (check_in_date < NEW.check_out_date AND check_out_date >= NEW.check_out_date)
        OR (check_in_date >= NEW.check_in_date AND check_out_date <= NEW.check_out_date)
      )
  ) THEN
    RAISE EXCEPTION 'You already have a booking for this room during these dates';
  END IF;
  
  RETURN NEW;
END;
$$;
