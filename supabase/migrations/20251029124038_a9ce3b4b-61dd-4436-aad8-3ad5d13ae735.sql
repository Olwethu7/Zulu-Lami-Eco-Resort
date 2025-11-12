-- Seed database with Zulu Lami accommodation and all rooms


-- First, insert the main accommodation
INSERT INTO accommodations (
  id,
  name,
  description,
  location,
  type,
  capacity,
  price_per_night,
  sustainability_rating,
  amenities,
  sustainability_features,
  images,
  available
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Zulu Lami Eco-Resort',
  'Experience authentic KwaZulu-Natal eco-tourism with rich Zulu cultural heritage in a sustainable environment',
  'KwaZulu-Natal, South Africa',
  'Eco-Resort',
  100,
  750,
  4.8,
  ARRAY['Wi-Fi', 'Restaurant', 'Swimming Pool', 'Spa', 'Cultural Activities', 'Wildlife Tours', 'Hiking Trails', 'Solar Power'],
  ARRAY['Solar Power', 'Rainwater Harvesting', 'Organic Gardens', 'Waste Recycling', 'Eco-Friendly Toiletries', 'Local Sourcing'],
  ARRAY[
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
  ],
  true
);

-- Insert Single Rooms (5 rooms)
INSERT INTO rooms (name, room_type, capacity, price_per_night, description, amenities, images, accommodation_id, quantity, available) VALUES
('Single Eco-Room', 'single', 1, 750, 'Cozy eco-friendly room for solo travelers with sustainable amenities', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Garden View'], 
 ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Single Nature Room', 'single', 1, 750, 'Comfortable single room with views of the natural surroundings', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Nature View'], 
 ARRAY['https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Single Heritage Room', 'single', 1, 750, 'Traditional Zulu-inspired room for individual guests', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Traditional Decor', 'Courtyard View'], 
 ARRAY['https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Single Mountain View', 'single', 1, 750, 'Single room with breathtaking mountain views', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Mountain View', 'Eco-Toiletries'], 
 ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Single Dam View', 'single', 1, 750, 'Peaceful room overlooking Jozini Dam', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Dam View', 'Private Patio'], 
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true);

-- Insert Double Rooms (8 rooms)
INSERT INTO rooms (name, room_type, capacity, price_per_night, description, amenities, images, accommodation_id, quantity, available) VALUES
('Double Eco-Room', 'double', 2, 1200, 'Spacious room for couples with sustainable features', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Solar Power', 'Private Balcony'], 
 ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Heritage Suite', 'double', 2, 1200, 'Traditional Zulu-style suite for couples', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Queen Bed', 'Traditional Art', 'Garden Access'], 
 ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Mountain Retreat', 'double', 2, 1200, 'Romantic room with panoramic mountain views', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Mountain View', 'Fireplace'], 
 ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Lake View', 'double', 2, 1200, 'Couples room with stunning dam views', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Lake View', 'Private Deck'], 
 ARRAY['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Cultural Suite', 'double', 2, 1200, 'Authentic Zulu-inspired suite for two', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Cultural Decor', 'Private Entrance'], 
 ARRAY['https://images.unsplash.com/photo-1555854876-bf3656d3b0e3?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Eco-Suite', 'double', 2, 1200, 'Modern eco-friendly suite for couples', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Queen Bed', 'Solar Power', 'Rain Shower'], 
 ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Nature Lodge', 'double', 2, 1200, 'Secluded room surrounded by nature', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Forest View', 'Wildlife Sounds'], 
 ARRAY['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Double Sunset View', 'double', 2, 1200, 'Perfect room for watching African sunsets', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Sunset View', 'Romantic Setup'], 
 ARRAY['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true);

-- Insert Family Rooms (10 rooms)
INSERT INTO rooms (name, room_type, capacity, price_per_night, description, amenities, images, accommodation_id, quantity, available) VALUES
('Family Eco-Suite', 'family', 4, 2400, 'Spacious family accommodation with multiple beds', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', '2 Bedrooms', 'Living Area', 'Kitchenette', 'Garden Access'], 
 ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Heritage House', 'family', 4, 2400, 'Traditional family unit with Zulu cultural elements', 
 ARRAY['Wi-Fi', '2 Bathrooms', '3 Beds', 'Living Room', 'Private Yard', 'Cultural Decor'], 
 ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Mountain Lodge', 'family', 4, 2400, 'Large family room with mountain views', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Family Beds', 'Living Space', 'Mountain View', 'Fireplace'], 
 ARRAY['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Lake Retreat', 'family', 4, 2400, 'Perfect for families wanting dam access', 
 ARRAY['Wi-Fi', '2 Bathrooms', '4 Beds', 'Lake View', 'Private Deck', 'BBQ Area'], 
 ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Cultural Suite', 'family', 4, 2400, 'Authentic Zulu family experience', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Family Beds', 'Traditional Art', 'Courtyard', 'Cultural Activities'], 
 ARRAY['https://images.unsplash.com/photo-1555854876-bf3656d3b0e3?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Nature House', 'family', 4, 2400, 'Eco-friendly family accommodation', 
 ARRAY['Wi-Fi', '2 Bathrooms', 'Multiple Beds', 'Garden Access', 'Solar Power', 'Recycling'], 
 ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Adventure Base', 'family', 4, 2400, 'Ideal for active families', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Family Setup', 'Hiking Gear Storage', 'Activity Planning', 'Wildlife Guide'], 
 ARRAY['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Eco-Retreat', 'family', 4, 2400, 'Sustainable family living', 
 ARRAY['Wi-Fi', '2 Bathrooms', '4 Beds', 'Composting', 'Rainwater', 'Organic Garden'], 
 ARRAY['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Zulu Heritage', 'family', 4, 2400, 'Cultural immersion for families', 
 ARRAY['Wi-Fi', 'En-suite Bathroom', 'Traditional Beds', 'Cultural Artifacts', 'Storytelling Area', 'Craft Space'], 
 ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true),

('Family Premium Suite', 'family', 4, 2400, 'Luxury family accommodation', 
 ARRAY['Wi-Fi', '2 Bathrooms', 'Premium Beds', 'Living Room', 'Dining Area', 'Private Garden'], 
 ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true);

-- Insert Event Space (1 space)
INSERT INTO rooms (name, room_type, capacity, price_per_night, description, amenities, images, accommodation_id, quantity, available) VALUES
('Book Hall or Space for Events', 'event', 50, 2000, 'Perfect for weddings, conferences, and special events', 
 ARRAY['Wi-Fi', 'Sound System', 'Projector', 'Catering Kitchen', 'Outdoor Area', 'Parking'], 
 ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop'], 
 '00000000-0000-0000-0000-000000000001', 1, true);
