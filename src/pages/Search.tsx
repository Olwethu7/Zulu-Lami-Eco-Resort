import React, { useState, useEffect, useCallback } from 'react';
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

interface BookingDatesState {
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface GuestDetailsState {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

// BookingModal moved outside component to prevent re-renders
const BookingModal: React.FC<{
  room: Room;
  onClose: () => void;
  bookingDates: BookingDatesState;
  setBookingDates: (dates: BookingDatesState) => void;
  guestDetails: GuestDetailsState;
  setGuestDetails: (details: GuestDetailsState) => void;
  onConfirm: () => void;
}> = ({ room, onClose, bookingDates, setBookingDates, guestDetails, setGuestDetails, onConfirm }) => {
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
                <p className="text-xs text-muted-foreground mt-2">Payment instructions will be sent via email</p>
              </div>
            )}

            <button
              onClick={onConfirm}
              disabled={!bookingDates.checkIn || !bookingDates.checkOut || !guestDetails.name || !guestDetails.email || !guestDetails.phone}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDates, setBookingDates] = useState<BookingDatesState>({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [guestDetails, setGuestDetails] = useState<GuestDetailsState>({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Fetch rooms from database
  const { data: rooms = [], isLoading, refetch } = useQuery({
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

  // Real-time subscription for room updates
  useEffect(() => {
    const channel = supabase
      .channel('rooms-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

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

  const handleBookNow = useCallback((group: RoomGroup) => {
    // Use the first room in the group for booking
    if (group.rooms.length > 0) {
      setSelectedRoom(group.rooms[0]);
    }
  }, []);

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedRoom || !bookingDates.checkIn || !bookingDates.checkOut) {
      alert('Please fill in all booking details');
      return;
    }

    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      alert('Please fill in all required guest details');
      return;
    }

    // Validate date range
    const checkIn = new Date(bookingDates.checkIn);
    const checkOut = new Date(bookingDates.checkOut);
    
    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkIn < today) {
      alert('Check-in date cannot be in the past');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please login to make a booking');
        navigate('/login');
        return;
      }

      // Check room availability before booking
      const { data: availabilityData, error: availabilityError } = await supabase
        .rpc('check_room_availability', {
          p_room_id: selectedRoom.id,
          p_check_in: bookingDates.checkIn,
          p_check_out: bookingDates.checkOut
        });

      if (availabilityError) {
        console.error('Availability check error:', availabilityError);
        alert('Failed to check room availability. Please try again.');
        return;
      }

      if (availabilityData <= 0) {
        alert('Sorry, this room is not available for the selected dates. Please choose different dates or another room.');
        return;
      }

      // Fetch accommodation_id from the room
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('accommodation_id')
        .eq('id', selectedRoom.id)
        .single();

      if (roomError) {
        console.error('Room lookup error:', roomError);
        alert(`Failed to fetch room details: ${roomError.message}`);
        return;
      }

      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = selectedRoom.price * nights;

      console.log('Creating booking with data:', {
        user_id: user.id,
        room_id: selectedRoom.id,
        accommodation_id: roomData?.accommodation_id,
        check_in_date: bookingDates.checkIn,
        check_out_date: bookingDates.checkOut,
        guests: bookingDates.guests,
        total_price: totalAmount,
        guest_name: guestDetails.name,
        guest_email: guestDetails.email,
        guest_phone: guestDetails.phone,
        status: 'pending'
      });

      const bookingData = {
        user_id: user.id,
        room_id: selectedRoom.id,
        accommodation_id: roomData?.accommodation_id || null,
        check_in_date: bookingDates.checkIn,
        check_out_date: bookingDates.checkOut,
        guests: bookingDates.guests,
        total_price: totalAmount,
        guest_name: guestDetails.name,
        guest_email: guestDetails.email,
        guest_phone: guestDetails.phone,
        special_requests: guestDetails.specialRequests || null,
        status: 'pending' as const,
        payment_status: 'pending'
      };

      const { data: bookingResult, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        console.error('Booking insertion error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        console.error('Attempted booking data:', bookingData);
        
        // Check for potential double-booking error
        if (error.message.includes('overlapping') || error.message.includes('conflict')) {
          alert('This room has just been booked by another guest. Please select different dates or another room.');
        } else {
          alert(`Booking failed: ${error.message}\n\nPlease check console for details or contact support.`);
        }
        return;
      }

      console.log('✅ Booking created successfully:', bookingResult);
      
      // Send email notification via SendGrid
      try {
        const { error: emailError } = await supabase.functions.invoke('send-booking-email', {
          body: {
            guestName: guestDetails.name,
            guestEmail: guestDetails.email,
            guestPhone: guestDetails.phone,
            roomName: selectedRoom.name,
            checkInDate: bookingDates.checkIn,
            checkOutDate: bookingDates.checkOut,
            guests: bookingDates.guests,
            totalPrice: totalAmount,
            specialRequests: guestDetails.specialRequests
          }
        });
        
        if (emailError) {
          console.error('SendGrid email error:', emailError);
          alert('⚠️ Booking submitted successfully, but failed to send email notification.\n\nYour booking is confirmed. You will receive payment details shortly.');
        } else {
          console.log('✅ SendGrid email sent successfully');
          alert('✅ Booking submitted successfully!\n\nA notification has been sent to developmentteam86@gmail.com with all your booking details.\n\nYou will receive payment details via email shortly.');
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        alert('⚠️ Booking submitted successfully, but failed to send email notification.\n\nYour booking is confirmed. You will receive payment details shortly.');
      }
      setSelectedRoom(null);
      setBookingDates({ checkIn: '', checkOut: '', guests: 1 });
      setGuestDetails({ name: '', email: '', phone: '', specialRequests: '' });
      navigate('/bookings');
      
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Booking failed: ${errorMessage}. Please try again.`);
    }
  }, [selectedRoom, bookingDates, guestDetails, navigate]);

  const RoomGroupCard: React.FC<{ group: RoomGroup }> = ({ group }) => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-48 object-cover"
        />
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

        <div className="space-y-2">
          <button
            onClick={() => handleBookNow(group)}
            className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
          >
            Book Now
          </button>
          
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSengxLaLm0Tam9V6dzghnqRpsgvOZ4iiFUgPxfZeKXr159XGw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
          >
            Book using Google Forms
          </a>
        </div>
      </div>
    </div>
  );

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
                : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setRoomTypeFilter('single')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'single' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            Single Room
          </button>
          <button
            onClick={() => setRoomTypeFilter('double')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'double' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            Double Room
          </button>
          <button
            onClick={() => setRoomTypeFilter('family')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'family' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            Family Room
          </button>
          <button
            onClick={() => setRoomTypeFilter('event')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              roomTypeFilter === 'event' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            Event Venue
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `${filteredGroups.length} room type${filteredGroups.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Room Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          ) : filteredGroups.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Home size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No rooms found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <RoomGroupCard key={group.type} group={group} />
            ))
          )}
        </div>

        {/* Booking Modal */}
        {selectedRoom && (
          <BookingModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            bookingDates={bookingDates}
            setBookingDates={setBookingDates}
            guestDetails={guestDetails}
            setGuestDetails={setGuestDetails}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    </Layout>
  );
};

export default Search;


