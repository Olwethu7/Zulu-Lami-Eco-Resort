import { Users, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GuestSelectorProps {
  value: { adults: number; children: number };
  onChange: (guests: { adults: number; children: number }) => void;
}

export const GuestSelector = ({ value, onChange }: GuestSelectorProps) => {
  const totalGuests = value.adults + value.children;

  const updateGuests = (type: "adults" | "children", delta: number) => {
    const newValue = Math.max(type === "adults" ? 1 : 0, value[type] + delta);
    onChange({ ...value, [type]: newValue });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start h-12">
          <Users className="mr-2 h-4 w-4" />
          {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 pointer-events-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-sm text-muted-foreground">Ages 13+</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateGuests("adults", -1)}
                disabled={value.adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{value.adults}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateGuests("adults", 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-sm text-muted-foreground">Ages 0-12</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateGuests("children", -1)}
                disabled={value.children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{value.children}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateGuests("children", 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
