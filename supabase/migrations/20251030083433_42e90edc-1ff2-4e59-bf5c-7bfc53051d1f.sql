-- Update room images to show appropriate eco-resort images for each room type
UPDATE rooms
SET images = ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop']
WHERE room_type = 'single';

UPDATE rooms
SET images = ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop']
WHERE room_type = 'double';

UPDATE rooms
SET images = ARRAY['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&auto=format&fit=crop']
WHERE room_type = 'family';

UPDATE rooms
SET images = ARRAY['https://images.unsplash.com/photo-1519167758481-83f29da8c2f6?w=800&auto=format&fit=crop']
WHERE room_type = 'event';