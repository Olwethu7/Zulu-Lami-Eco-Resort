-- Create function to reduce room quantity when booking is approved
CREATE OR REPLACE FUNCTION public.handle_booking_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only reduce quantity if status changed from pending to confirmed
  IF OLD.status = 'pending' AND NEW.status = 'confirmed' THEN
    -- Reduce room quantity by 1
    UPDATE rooms
    SET quantity = quantity - 1
    WHERE id = NEW.room_id AND quantity > 0;
    
    -- Check if update was successful
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Room not found or no rooms available';
    END IF;
  END IF;
  
  -- If booking is cancelled, increase quantity back
  IF (OLD.status = 'confirmed' OR OLD.status = 'pending') AND NEW.status = 'cancelled' THEN
    UPDATE rooms
    SET quantity = quantity + 1
    WHERE id = NEW.room_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for booking status changes
DROP TRIGGER IF EXISTS on_booking_status_change ON bookings;
CREATE TRIGGER on_booking_status_change
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_booking_approval();

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);