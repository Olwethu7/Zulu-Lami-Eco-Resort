import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/search/DateRangePicker";
import { GuestSelector } from "@/components/search/GuestSelector";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (dateRange?.from) {
      params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
    }
    if (dateRange?.to) {
      params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));
    }
    params.set("adults", guests.adults.toString());
    params.set("children", guests.children.toString());
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Card className="bg-background/95 backdrop-blur p-4 md:p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <GuestSelector value={guests} onChange={setGuests} />
        
        <Button 
          onClick={handleSearch}
          size="lg"
          className="w-full md:col-span-1"
        >
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </Card>
  );
};
