import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";

interface MapViewProps {
  accommodations: any[];
}

export const MapView = ({ accommodations }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  

  useEffect(() => {
    // Fetch token from Supabase edge function or use hardcoded for now
    // In production, retrieve this from your Supabase secrets via edge function
    const fetchToken = async () => {
      // For now, you need to replace this with your actual Mapbox token
      // You can get it from https://mapbox.com
      const token = ""; // Add your Mapbox public token here
      setMapboxToken(token);
    };
    
    fetchToken();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [32.065038, -27.414692], // Othobothini, South Africa
      zoom: 8,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers for accommodations
    accommodations.forEach((accommodation) => {
      if (accommodation.location) {
        // In real app, parse location coordinates
        const marker = new mapboxgl.Marker({ color: "#1B4332" })
          .setLngLat([32.065038 + Math.random() * 0.5, -27.414692 + Math.random() * 0.5])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="p-2">
                <h3 class="font-semibold text-sm">${accommodation.name}</h3>
                <p class="text-xs text-muted-foreground">R${accommodation.price_per_night}/night</p>
              </div>`
            )
          )
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, accommodations]);

  if (!mapboxToken) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">
            Map view requires Mapbox configuration
          </p>
          <p className="text-sm text-muted-foreground">
            Please configure MAPBOX_PUBLIC_TOKEN in your environment
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
  );
};
