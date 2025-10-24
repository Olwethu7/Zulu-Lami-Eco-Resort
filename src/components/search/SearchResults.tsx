import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState } from "./SearchFilters";
import { MapPin, LayoutGrid } from "lucide-react";

interface SearchResultsProps {
  filters: FilterState;
  searchParams: URLSearchParams;
}

export const SearchResults = ({ filters, searchParams }: SearchResultsProps) => {
  const [sortBy, setSortBy] = useState("price-asc");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const { data: accommodations, isLoading } = useQuery({
    queryKey: ["accommodations", filters, sortBy, searchParams.toString()],
    queryFn: async () => {
      let query = supabase
        .from("accommodations")
        .select("*")
        .eq("available", true);

      // Apply price filter
      query = query
        .gte("price_per_night", filters.priceRange[0])
        .lte("price_per_night", filters.priceRange[1]);

      // Apply capacity filter if guests specified
      const adults = parseInt(searchParams.get("adults") || "0");
      const children = parseInt(searchParams.get("children") || "0");
      const totalGuests = adults + children;
      if (totalGuests > 0) {
        query = query.gte("capacity", totalGuests);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Client-side filtering for amenities
      let filtered = data || [];
      if (filters.amenities.length > 0) {
        filtered = filtered.filter((acc) =>
          filters.amenities.every((amenity) =>
            acc.amenities?.includes(amenity)
          )
        );
      }

      // Sort
      if (sortBy === "price-asc") {
        filtered.sort((a, b) => (a.price_per_night || 0) - (b.price_per_night || 0));
      } else if (sortBy === "price-desc") {
        filtered.sort((a, b) => (b.price_per_night || 0) - (a.price_per_night || 0));
      }

      return filtered;
    },
  });

  const totalPages = Math.ceil((accommodations?.length || 0) / itemsPerPage);
  const paginatedResults = accommodations?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-lg" />
        ))}
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
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          {accommodations.length} {accommodations.length === 1 ? "property" : "properties"} found
        </p>
        
        <div className="flex items-center gap-4">
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
        <div className="bg-muted rounded-lg h-[600px] flex items-center justify-center">
          <p className="text-muted-foreground">Map view coming soon</p>
        </div>
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
