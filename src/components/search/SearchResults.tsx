import { useState, useMemo, useEffect } from "react";
import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState } from "./SearchFilters";
import { MapPin, LayoutGrid, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MapView } from "./MapView";

interface SearchResultsProps {
  filters: FilterState;
  searchParams: URLSearchParams;
}


export const SearchResults = ({ filters, searchParams }: SearchResultsProps) => {
  const [sortBy, setSortBy] = useState("price-asc");
  const [viewMode, setViewMode] = useState<"grid" | "map">("map");
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("available", true);
      
      if (data) {
        setRooms(data);
      }
      setIsLoading(false);
    };

    fetchRooms();

    // Real-time subscription for room updates
    const channel = supabase
      .channel("rooms-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
        },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const accommodations = useMemo(() => {
    let filtered = [...rooms];

    // Apply price filter
    filtered = filtered.filter(
      (room) =>
        room.price_per_night >= filters.priceRange[0] &&
        room.price_per_night <= filters.priceRange[1]
    );

    // Apply capacity filter if guests specified
    const adults = parseInt(searchParams.get("adults") || "0");
    const children = parseInt(searchParams.get("children") || "0");
    const totalGuests = adults + children;
    if (totalGuests > 0) {
      filtered = filtered.filter((room) => room.capacity >= totalGuests);
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((room) =>
        filters.amenities.every((amenity) => room.amenities?.includes(amenity))
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price_per_night - b.price_per_night);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price_per_night - a.price_per_night);
    }

    return filtered;
  }, [rooms, filters, searchParams, sortBy]);

  const totalPages = Math.ceil((accommodations?.length || 0) / itemsPerPage);
  const paginatedResults = accommodations?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!accommodations || accommodations.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="font-montserrat text-2xl font-bold text-primary mb-4">
          No accommodations found
        </h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <p className="text-muted-foreground">
          {accommodations.length} {accommodations.length === 1 ? "property" : "properties"} found
        </p>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedResults?.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      ) : (
        <MapView accommodations={accommodations} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
