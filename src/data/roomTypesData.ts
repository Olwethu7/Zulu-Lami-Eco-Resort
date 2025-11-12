import singleRoom from "@/assets/rooms/single.jpg";
import doubleRoom from "@/assets/rooms/double.jpg";
import familyRoom from "@/assets/rooms/family.jpg";
import eventHall from "@/assets/rooms/event.jpg";


export interface RoomType {
  id: string;
  name: string;
  description: string;
  type: string;
  price_per_night: number;
  capacity: number;
  images: string[];
  amenities: string[];
  available: boolean;
  quantity: number;
}

export const roomTypes: RoomType[] = [
  {
    id: "single-room",
    name: "Single Room",
    description: "Cozy eco-friendly single room perfect for solo travelers seeking comfort and sustainability",
    type: "Single",
    price_per_night: 750,
    capacity: 1,
    images: [singleRoom],
    amenities: ["Wi-Fi", "Fireplace", "Eco-Friendly Toiletries", "Hiking Trails Access"],
    available: true,
    quantity: 5
  },
  {
    id: "double-room",
    name: "Double Room",
    description: "Spacious double room with stunning views, perfect for couples or friends sharing",
    type: "Double",
    price_per_night: 1200,
    capacity: 2,
    images: [doubleRoom],
    amenities: ["Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Wildlife Tours"],
    available: true,
    quantity: 8
  },
  {
    id: "family-room",
    name: "Family Room",
    description: "Generous family suite designed for comfort, featuring multiple beds and family-friendly amenities",
    type: "Family",
    price_per_night: 2400,
    capacity: 4,
    images: [familyRoom],
    amenities: ["Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Hiking Trails", "Wildlife Tours", "Cultural Activities"],
    available: true,
    quantity: 10
  },
  {
    id: "event-hall",
    name: "Book Hall or Space for Events",
    description: "Spacious event hall perfect for weddings, conferences, and special occasions with eco-friendly facilities",
    type: "Event Space",
    price_per_night: 2000,
    capacity: 100,
    images: [eventHall],
    amenities: ["Wi-Fi", "Restaurant", "Solar Power", "Audio/Visual Equipment", "Outdoor Space", "Catering Available"],
    available: true,
    quantity: 1
  }
];
