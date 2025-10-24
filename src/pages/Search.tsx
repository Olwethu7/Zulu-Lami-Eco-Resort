import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchFilters, FilterState } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    amenities: [],
    sustainabilityRating: 0,
    hasExperiences: false,
  });

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      amenities: [],
      sustainabilityRating: 0,
      hasExperiences: false,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Find Your Eco-Lodge
          </h1>
          <p className="text-muted-foreground">
            {searchParams.get("checkIn") && searchParams.get("checkOut")
              ? `${searchParams.get("checkIn")} - ${searchParams.get("checkOut")}`
              : "Browse available accommodations"}
            {searchParams.get("adults") && ` • ${searchParams.get("adults")} adults`}
            {searchParams.get("children") && `, ${searchParams.get("children")} children`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <SearchFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <SearchFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={resetFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <SearchResults filters={filters} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
