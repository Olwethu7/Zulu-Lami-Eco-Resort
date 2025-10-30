import { Loader2, Users, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import React from "react";

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

export const FeaturedAccommodations = () => {
  const navigate = useNavigate();

  // Fetch rooms from database
  const { data: rooms = [], isLoading, refetch } = useQuery({
    queryKey: ['featured-rooms'],
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
  React.useEffect(() => {
    const channel = supabase
      .channel('featured-rooms-changes')
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

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container px-4 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

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

        <button
          onClick={() => navigate('/search')}
          className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Eco-Lodges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully selected sustainable accommodations that blend comfort with environmental responsibility
          </p>
        </div>

        {roomGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomGroups.map((group) => (
              <RoomGroupCard key={group.type} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No accommodations available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};
