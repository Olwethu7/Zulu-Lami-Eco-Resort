import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";

interface Room {
  id: string;
  name: string;
  type: 'single' | 'double' | 'family' | 'event';
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
}

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  // Exact room inventory as specified
  const rooms: Room[] = [
    // Single Rooms
    {
      id: 'single-1',
      name: 'Single Eco-Room',
      type: 'single',
      price: 750,
      capacity: 1,
      description: 'Cozy eco-friendly room for solo travelers with sustainable amenities',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Garden View'],
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'single-2',
      name: 'Single Nature Room',
      type: 'single',
      price: 750,
      capacity: 1,
      description: 'Comfortable single room with views of the natural surroundings',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Nature View'],
      images: ['https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'single-3',
      name: 'Single Heritage Room',
      type: 'single',
      price: 750,
      capacity: 1,
      description: 'Traditional Zulu-inspired room for individual guests',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Traditional Decor', 'Courtyard View'],
      images: ['https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'single-4',
      name: 'Single Mountain View',
      type: 'single',
      price: 750,
      capacity: 1,
      description: 'Single room with breathtaking mountain views',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Mountain View', 'Eco-Toiletries'],
      images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'single-5',
      name: 'Single Dam View',
      type: 'single',
      price: 750,
      capacity: 1,
      description: 'Peaceful room overlooking Jozini Dam',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Dam View', 'Private Patio'],
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'],
      available: true
    },
    // Double Rooms
    {
      id: 'double-1',
      name: 'Double Eco-Room',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Spacious room for couples with sustainable features',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Solar Power', 'Private Balcony'],
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-2',
      name: 'Double Heritage Suite',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Traditional Zulu-style suite for couples',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Queen Bed', 'Traditional Art', 'Garden Access'],
      images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-3',
      name: 'Double Mountain Retreat',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Romantic room with panoramic mountain views',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Mountain View', 'Fireplace'],
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-4',
      name: 'Double Lake View',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Couples room with stunning dam views',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Lake View', 'Private Deck'],
      images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-5',
      name: 'Double Cultural Suite',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Authentic Zulu-inspired suite for two',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Cultural Decor', 'Private Entrance'],
      images: ['https://images.unsplash.com/photo-1555854876-bf3656d3b0e3?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-6',
      name: 'Double Eco-Suite',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Modern eco-friendly suite for couples',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Queen Bed', 'Solar Power', 'Rain Shower'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-7',
      name: 'Double Nature Lodge',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Secluded room surrounded by nature',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Double Bed', 'Forest View', 'Wildlife Sounds'],
      images: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'double-8',
      name: 'Double Sunset View',
      type: 'double',
      price: 1200,
      capacity: 2,
      description: 'Perfect room for watching African sunsets',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Sunset View', 'Romantic Setup'],
      images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop'],
      available: true
    },
    // Family Rooms
    {
      id: 'family-1',
      name: 'Family Eco-Suite',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Spacious family accommodation with multiple beds',
      amenities: ['Wi-Fi', 'En-suite Bathroom', '2 Bedrooms', 'Living Area', 'Kitchenette', 'Garden Access'],
      images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-2',
      name: 'Family Heritage House',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Traditional family unit with Zulu cultural elements',
      amenities: ['Wi-Fi', '2 Bathrooms', '3 Beds', 'Living Room', 'Private Yard', 'Cultural Decor'],
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-3',
      name: 'Family Mountain Lodge',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Large family room with mountain views',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Family Beds', 'Living Space', 'Mountain View', 'Fireplace'],
      images: ['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-4',
      name: 'Family Lake Retreat',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Perfect for families wanting dam access',
      amenities: ['Wi-Fi', '2 Bathrooms', '4 Beds', 'Lake View', 'Private Deck', 'BBQ Area'],
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-5',
      name: 'Family Cultural Suite',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Authentic Zulu family experience',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Family Beds', 'Traditional Art', 'Courtyard', 'Cultural Activities'],
      images: ['https://images.unsplash.com/photo-1555854876-bf3656d3b0e3?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-6',
      name: 'Family Nature House',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Eco-friendly family accommodation',
      amenities: ['Wi-Fi', '2 Bathrooms', 'Multiple Beds', 'Garden Access', 'Solar Power', 'Recycling'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-7',
      name: 'Family Adventure Base',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Ideal for active families',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Family Setup', 'Hiking Gear Storage', 'Activity Planning', 'Wildlife Guide'],
      images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-8',
      name: 'Family Eco-Retreat',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Sustainable family living',
      amenities: ['Wi-Fi', '2 Bathrooms', '4 Beds', 'Composting', 'Rainwater', 'Organic Garden'],
      images: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-9',
      name: 'Family Zulu Heritage',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Cultural immersion for families',
      amenities: ['Wi-Fi', 'En-suite Bathroom', 'Traditional Beds', 'Cultural Artifacts', 'Storytelling Area', 'Craft Space'],
      images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop'],
      available: true
    },
    {
      id: 'family-10',
      name: 'Family Premium Suite',
      type: 'family',
      price: 2400,
      capacity: 4,
      description: 'Luxury family accommodation',
      amenities: ['Wi-Fi', '2 Bathrooms', 'Premium Beds', 'Living Room', 'Dining Area', 'Private Garden'],
      images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=300&fit=crop'],
      available: true
    },
    // Event Space
    {
      id: 'event-1',
      name: 'Book Hall or Space for Events',
      type: 'event',
      price: 2000,
      capacity: 50,
      description: 'Perfect for weddings, conferences, and special events',
      amenities: ['Wi-Fi', 'Sound System', 'Projector', 'Catering Kitchen', 'Outdoor Area', 'Parking'],
      images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop'],
      available: true
    }
  ];

  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [roomTypeFilter, setRoomTypeFilter] = useState<'all' | 'single' | 'double' | 'family' | 'event'>('all');

  useEffect(() => {
    if (roomTypeFilter === 'all') {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(room => room.type === roomTypeFilter));
    }
  }, [roomTypeFilter]);

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleConfirmBooking = async () => {
    if (!selectedRoom || !bookingDates.checkIn || !bookingDates.checkOut) {
      alert('Please fill in all booking details');
      return;
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please login to make a booking');
        navigate('/login');
        return;
      }

      // Calculate total amount
      const checkIn = new Date(bookingDates.checkIn);
      const checkOut = new Date(bookingDates.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom.price * nights;

      // Create booking object
      const bookingData = {
        user_id: user.id,
        check_in_date: bookingDates.checkIn,
        check_out_date: bookingDates.checkOut,
        guests: bookingDates.guests,
        total_price: totalAmount,
        status: 'pending' as const
      };

      // Save to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) throw error;

      alert('Booking confirmed successfully!');
      setSelectedRoom(null);
      setBookingDates({ checkIn: '', checkOut: '', guests: 1 });
      navigate('/bookings');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-primary">{room.name}</h3>
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold">
            R{room.price}/night
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{room.description}</p>
        
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <Users size={14} className="mr-1" />
          <span>Sleeps {room.capacity} {room.capacity === 1 ? 'person' : 'people'}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={() => handleBookNow(room)}
          className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );

  const BookingModal: React.FC<{ room: Room; onClose: () => void }> = ({ room, onClose }) => {
    const calculateTotal = () => {
      if (!bookingDates.checkIn || !bookingDates.checkOut) return 0;
      const checkIn = new Date(bookingDates.checkIn);
      const checkOut = new Date(bookingDates.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return room.price * nights;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Book {room.name}</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">
                ×
              </button>
            </div>

            <img src={room.images[0]} alt={room.name} className="w-full h-48 object-cover rounded-lg mb-4" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={bookingDates.checkIn}
                  onChange={(e) => setBookingDates({...bookingDates, checkIn: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={bookingDates.checkOut}
                  onChange={(e) => setBookingDates({...bookingDates, checkOut: e.target.value})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                  min={bookingDates.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Number of Guests</label>
                <select
                  value={bookingDates.guests}
                  onChange={(e) => setBookingDates({...bookingDates, guests: parseInt(e.target.value)})}
                  className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>

              {calculateTotal() > 0 && (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Room rate:</span>
                    <span>R{room.price} × {Math.ceil((new Date(bookingDates.checkOut).getTime() - new Date(bookingDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total:</span>
                    <span>R{calculateTotal()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleConfirmBooking}
                disabled={!bookingDates.checkIn || !bookingDates.checkOut}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-muted disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-4">Find Your Eco-Lodge</h1>
          <p className="text-xl text-muted-foreground">Browse available accommodations</p>
        </div>

        {/* Room Type Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setRoomTypeFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setRoomTypeFilter('single')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'single' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            Single (R750)
          </button>
          <button
            onClick={() => setRoomTypeFilter('double')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'double' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            Double (R1200)
          </button>
          <button
            onClick={() => setRoomTypeFilter('family')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'family' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            Family (R2400)
          </button>
          <button
            onClick={() => setRoomTypeFilter('event')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'event' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            Event Space (R2000)
          </button>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            {filteredRooms.length} {filteredRooms.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No rooms found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different room type
            </p>
          </div>
        )}

        {/* Booking Modal */}
        {selectedRoom && (
          <BookingModal 
            room={selectedRoom} 
            onClose={() => {
              setSelectedRoom(null);
              setBookingDates({ checkIn: '', checkOut: '', guests: 1 });
            }} 
          />
        )}
      </div>
    </Layout>
  );
};

export default Search;
