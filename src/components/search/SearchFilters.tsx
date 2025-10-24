import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  amenities: string[];
  sustainabilityRating: number;
  hasExperiences: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

const amenitiesList = [
  "Wi-Fi",
  "Swimming Pool",
  "Restaurant",
  "Spa",
  "Hiking Trails",
  "Wildlife Tours",
  "Cultural Activities",
  "Solar Power",
];

export const SearchFilters = ({ filters, onChange, onReset }: SearchFiltersProps) => {
  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: newAmenities });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="mb-3 block">Price per Night</Label>
          <Slider
            min={0}
            max={5000}
            step={100}
            value={filters.priceRange}
            onValueChange={(value) =>
              onChange({ ...filters, priceRange: value as [number, number] })
            }
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R{filters.priceRange[0]}</span>
            <span>R{filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <Label className="mb-3 block">Amenities</Label>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Rating */}
        <div>
          <Label className="mb-3 block">
            Sustainability Rating (Min: {filters.sustainabilityRating}/5)
          </Label>
          <Slider
            min={0}
            max={5}
            step={1}
            value={[filters.sustainabilityRating]}
            onValueChange={(value) =>
              onChange({ ...filters, sustainabilityRating: value[0] })
            }
          />
        </div>

        {/* Cultural Experiences */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="experiences"
            checked={filters.hasExperiences}
            onCheckedChange={(checked) =>
              onChange({ ...filters, hasExperiences: checked as boolean })
            }
          />
          <label
            htmlFor="experiences"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Has cultural experiences nearby
          </label>
        </div>
      </CardContent>
    </Card>
  );
};
