-- Clean up duplicate rooms and create standardized entries

DELETE FROM rooms;

-- Create accommodation entry if it doesn't exist
INSERT INTO accommodations (id, name, type, location, description, capacity, price_per_night, available, sustainability_rating, amenities, images)
VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Zulu Lami Eco-Resort',
  'eco-lodge',
  'KwaZulu-Natal, South Africa',
  'Experience authentic eco-friendly accommodation with rich Zulu cultural heritage',
  50,
  1000,
  true,
  5,
  ARRAY['Wi-Fi', 'Restaurant', 'Spa', 'Cultural activities', 'Nature tours'],
  ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  location = EXCLUDED.location;

-- Insert clean, single entries for each room type
INSERT INTO rooms (id, accommodation_id, name, room_type, price_per_night, capacity, description, amenities, images, quantity, available)
VALUES
  -- Single Room: 5 available
  ('b0000000-0000-0000-0000-000000000001'::uuid, 'a0000000-0000-0000-0000-000000000001'::uuid,
   'Single Eco-Room', 'single', 750, 1, 
   'Cozy single room perfect for solo travelers seeking comfort and sustainability', 
   ARRAY['Wi-Fi', 'Eco-friendly amenities', 'Garden view', 'Solar heating'],
   ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop'],
   5, true),
  
  -- Double Room: 8 available
  ('b0000000-0000-0000-0000-000000000002'::uuid, 'a0000000-0000-0000-0000-000000000001'::uuid,
   'Double Heritage Suite', 'double', 1200, 2,
   'Spacious double room with traditional Zulu design elements and modern comfort',
   ARRAY['King bed', 'Private bathroom', 'Mountain view', 'Wi-Fi', 'Air conditioning'],
   ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop'],
   8, true),
  
  -- Family Room: 3 available
  ('b0000000-0000-0000-0000-000000000003'::uuid, 'a0000000-0000-0000-0000-000000000001'::uuid,
   'Family Nature Lodge', 'family', 2400, 6,
   'Generous family suite with separate sleeping areas and stunning nature views',
   ARRAY['2 bedrooms', 'Kitchenette', 'Living area', 'Balcony', 'Wi-Fi', 'Eco-friendly'],
   ARRAY['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&auto=format&fit=crop'],
   3, true),
  
  -- Event Space: 2 available
  ('b0000000-0000-0000-0000-000000000004'::uuid, 'a0000000-0000-0000-0000-000000000001'::uuid,
   'Cultural Event Hall', 'event', 2000, 50,
   'Versatile event space perfect for weddings, conferences, and cultural celebrations',
   ARRAY['Stage area', 'Sound system', 'Projector', 'Catering facilities', 'Outdoor access'],
   ARRAY['https://images.unsplash.com/photo-1519167758481-83f29da8c2f6?w=800&auto=format&fit=crop'],
   2, true);
