-- Add missing columns to accommodations table
ALTER TABLE public.accommodations 
  
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS sustainability_features text[],
ADD COLUMN IF NOT EXISTS sustainability_rating numeric;

-- Add missing column to experiences table
ALTER TABLE public.experiences 
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS cultural_authenticity_badge boolean DEFAULT false;

-- Insert sample accommodations
INSERT INTO public.accommodations (name, description, location, price_per_night, capacity, amenities, sustainability_features, images, available, sustainability_rating, type) VALUES
('Zulu Heritage Eco-Lodge', 'Authentic eco-lodge with traditional Zulu architecture and sustainable practices', 'Zululami Road, Jozini, KwaZulu-Natal', 1200.00, 4, ARRAY['Wi-Fi', 'Swimming Pool', 'Cultural Tours', 'Wildlife Viewing'], ARRAY['Solar Power', 'Water Recycling', 'Local Materials'], ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'], true, 4.8, 'Eco-Lodge'),
('Drakensberg Mountain Retreat', 'Sustainable cabins with mountain views and hiking trails', 'Drakensberg, KwaZulu-Natal', 950.00, 2, ARRAY['Wi-Fi', 'Hiking Trails', 'Fireplace', 'Restaurant'], ARRAY['Solar Power', 'Composting', 'Wildlife Conservation'], ARRAY['https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800'], true, 4.9, 'Mountain Cabin'),
('Coastal Eco-Villa', 'Beachfront eco-villa with ocean views and sustainable design', 'Ballito, KwaZulu-Natal', 1800.00, 6, ARRAY['Wi-Fi', 'Beach Access', 'Swimming Pool', 'Solar Power'], ARRAY['Solar Power', 'Rainwater Harvesting', 'Eco-Friendly Materials'], ARRAY['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800'], true, 4.7, 'Villa');

-- Insert sample experiences
INSERT INTO public.experiences (title, description, category, price, duration, max_participants, location, images, available, cultural_authenticity_badge) VALUES
('Traditional Zulu Dance', 'Experience authentic Zulu dance and music performances by local cultural groups', 'tour', 250.00, 120, 30, 'Cultural Village, Jozini', ARRAY['https://images.unsplash.com/photo-1541336032412-2048a678540d?w=800'], true, true),
('Beadwork Workshop', 'Learn traditional Zulu beadwork from local artisans and create your own piece', 'workshop', 180.00, 180, 15, 'Artisan Center, Jozini', ARRAY['https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=800'], true, true),
('Wildlife Safari', 'Guided safari tour through Jozini Dam nature reserve with experienced local guides', 'tour', 450.00, 240, 12, 'Jozini Dam Nature Reserve', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], true, false),
('Traditional Zulu Cooking Class', 'Learn to prepare authentic Zulu dishes using traditional methods and local ingredients', 'dining', 320.00, 180, 10, 'Zululami Cultural Center', ARRAY['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'], true, true);
