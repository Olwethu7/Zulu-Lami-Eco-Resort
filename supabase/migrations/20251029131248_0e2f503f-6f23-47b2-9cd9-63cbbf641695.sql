-- Create admin user and accommodations


-- First, check if accommodations exist and create if needed
INSERT INTO public.accommodations (name, description, type, price_per_night, capacity, available, sustainability_rating, amenities, sustainability_features, location, images)
VALUES 
  (
    'Single Room',
    'Cozy eco-friendly room for solo travelers with sustainable features',
    'Single',
    750,
    1,
    true,
    4.5,
    ARRAY['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Garden View'],
    ARRAY['Solar Power', 'Rainwater Harvesting', 'Eco-friendly Amenities'],
    'KwaZulu-Natal, South Africa',
    ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop']
  ),
  (
    'Double Room',
    'Spacious room for couples with sustainable features and private balcony',
    'Double',
    1200,
    2,
    true,
    4.5,
    ARRAY['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Solar Power', 'Private Balcony'],
    ARRAY['Solar Power', 'Energy Efficient', 'Organic Linens'],
    'KwaZulu-Natal, South Africa',
    ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop']
  ),
  (
    'Family Room',
    'Spacious family accommodation with multiple beds and living area',
    'Family',
    2400,
    4,
    true,
    4.5,
    ARRAY['Wi-Fi', 'En-suite Bathroom', '2 Bedrooms', 'Living Area', 'Kitchenette', 'Garden Access'],
    ARRAY['Solar Power', 'Composting', 'Eco-friendly Furnishings'],
    'KwaZulu-Natal, South Africa',
    ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=600&fit=crop']
  ),
  (
    'Event Space',
    'Perfect for weddings, conferences, and special events with modern facilities',
    'Event Space',
    2000,
    50,
    true,
    4.5,
    ARRAY['Wi-Fi', 'Sound System', 'Projector', 'Catering Kitchen', 'Outdoor Area', 'Parking'],
    ARRAY['Solar Power', 'Water Conservation', 'Waste Recycling'],
    'KwaZulu-Natal, South Africa',
    ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop']
  )
ON CONFLICT DO NOTHING;

-- Create admin user account (will be created manually in Supabase Auth)
-- We'll assign admin role after the user signs up
-- Email: passiveincome1340@gmil.com (note the typo in gmail as provided by user)
-- Password: #Admin01

-- The user will need to sign up first, then we'll assign the admin role
-- For now, we'll prepare by ensuring the role system is ready
