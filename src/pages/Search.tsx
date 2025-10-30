import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Users, Home } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
  quantity: number;
}

interface RoomGroup {
  type: 'single' | 'double' | 'family' | 'event';
  name: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  image: string;
  totalAvailable: number;
  rooms: Room[];
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
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    specialRequests: ''
  });

  // Fetch rooms from database
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('available', true)
        .order('room_type', { ascending: true });
      
      if (error) throw error;
      
      // Transform database format to component format
      return (data || []).map(room => ({
        id: room.id,
        name: room.name,
        type: room.room_type as 'single' | 'double' | 'family' | 'event',
        price: Number(room.price_per_night),
        capacity: room.capacity,
        description: room.description || '',
        amenities: room.amenities || [],
        images: room.images || [],
        available: room.available,
        quantity: room.quantity
      }));
    }
  });

  // Group rooms by type
  const roomGroups: RoomGroup[] = React.useMemo(() => {
    const groups: { [key: string]: RoomGroup } = {};
    
    rooms.forEach(room => {
      if (!groups[room.type]) {
        groups[room.type] = {
          type: room.type,
          name: room.name,
          price: room.price,
          capacity: room.capacity,
          description: room.description,
          amenities: room.amenities,
          image: room.images[0] || '/placeholder.svg',
          totalAvailable: 0,
          rooms: []
        };
      }
      groups[room.type].totalAvailable += room.quantity;
      groups[room.type].rooms.push(room);
    });
    
    return Object.values(groups);
  }, [rooms]);

  const [filteredGroups, setFilteredGroups] = useState<RoomGroup[]>([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState<'all' | 'single' | 'double' | 'family' | 'event'>('all');

  useEffect(() => {
    if (roomTypeFilter === 'all') {
      setFilteredGroups(roomGroups);
    } else {
      setFilteredGroups(roomGroups.filter(group => group.type === roomTypeFilter));
    }
  }, [roomTypeFilter, roomGroups]);

  const handleBookNow = (group: RoomGroup) => {
    // Use the first room in the group for booking
    if (group.rooms.length > 0) {
      setSelectedRoom(group.rooms[0]);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedRoom || !bookingDates.checkIn || !bookingDates.checkOut) {
      alert('Please fill in all booking details');
      return;
    }

    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      alert('Please fill in all required guest details');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please login to make a booking');
        navigate('/login');
        return;
      }

      const checkIn = new Date(bookingDates.checkIn);
      const checkOut = new Date(bookingDates.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom.price * nights;

      const bookingData = {
        user_id: user.id,
        room_id: selectedRoom.id,
        check_in_date: bookingDates.checkIn,
        check_out_date: bookingDates.checkOut,
        guests: bookingDates.guests,
        total_price: totalAmount,
        guest_name: guestDetails.name,
        guest_email: guestDetails.email,
        guest_phone: guestDetails.phone,
        guest_id_number: guestDetails.idNumber || null,
        special_requests: guestDetails.specialRequests || null,
        status: 'pending' as const,
        payment_status: 'pending',
        admin_approved: false
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      alert('Booking request submitted! Awaiting admin approval.');
      setSelectedRoom(null);
      setBookingDates({ checkIn: '', checkOut: '', guests: 1 });
      setGuestDetails({ name: '', email: '', phone: '', idNumber: '', specialRequests: '' });
      navigate('/bookings');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const RoomGroupCard: React.FC<{ group: RoomGroup }> = ({ group }) => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          <Home className="w-3 h-3 mr-1" />
          {group.totalAvailable} Available
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-primary">{group.name}</h3>
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold">
            R{group.price}/night
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{group.description}</p>
        
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <Users size={14} className="mr-1" />
          <span>Sleeps {group.capacity} {group.capacity === 1 ? 'person' : 'people'}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {group.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              {amenity}
            </span>
          ))}
          {group.amenities.length > 3 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              +{group.amenities.length - 3} more
            </span>
          )}
        </div>

        <button
          onClick={() => handleBookNow(group)}
          disabled={group.totalAvailable === 0}
          className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {group.totalAvailable > 0 ? 'Book Now' : 'Sold Out'}
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
        <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Book {room.name}</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">
                ×
              </button>
            </div>

            <img src={room.images[0]} alt={room.name} className="w-full h-48 object-cover rounded-lg mb-6" />

            <div className="space-y-4">
              {/* Booking Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Check-in Date *</label>
                  <input
                    type="date"
                    value={bookingDates.checkIn}
                    onChange={(e) => setBookingDates({...bookingDates, checkIn: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Check-out Date *</label>
                  <input
                    type="date"
                    value={bookingDates.checkOut}
                    onChange={(e) => setBookingDates({...bookingDates, checkOut: e.target.value})}
                    className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    min={bookingDates.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Number of Guests *</label>
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

              {/* Guest Details */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-foreground mb-3">Guest Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={guestDetails.name}
                      onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="+27 123 456 789"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">ID/Passport Number (Optional)</label>
                    <input
                      type="text"
                      value={guestDetails.idNumber}
                      onChange={(e) => setGuestDetails({...guestDetails, idNumber: e.target.value})}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="ID or Passport Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Special Requests (Optional)</label>
                    <textarea
                      value={guestDetails.specialRequests}
                      onChange={(e) => setGuestDetails({...guestDetails, specialRequests: e.target.value})}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                      rows={3}
                      placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                    />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              {calculateTotal() > 0 && (
                <div className="bg-muted p-4 rounded-lg border-t mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Room rate:</span>
                    <span>R{room.price} × {Math.ceil((new Date(bookingDates.checkOut).getTime() - new Date(bookingDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R{calculateTotal()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Payment link will be sent after admin approval</p>
                </div>
              )}

              <button
                onClick={handleConfirmBooking}
                disabled={!bookingDates.checkIn || !bookingDates.checkOut || !guestDetails.name || !guestDetails.email || !guestDetails.phone}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                Submit Booking Request
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
            {filteredGroups.length} room {filteredGroups.length === 1 ? 'type' : 'types'} found
          </p>
        </div>

        {/* Room Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          ) : filteredGroups.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No rooms found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different room type
              </p>
            </div>
          ) : (
            filteredGroups.map(group => (
              <RoomGroupCard key={group.type} group={group} />
            ))
          )}
        </div>

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
