import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NearbyExperiences = () => {
  const navigate = useNavigate();

  const { data: experiences } = useQuery({
    queryKey: ["nearby-experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("available", true)
        .limit(3);
      
      if (error) throw error;
      return data;
      
    },
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-montserrat text-2xl font-bold">Cultural Experiences Nearby</h2>
      <p className="text-muted-foreground">
        Enhance your stay with authentic Zulu cultural activities
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {experiences.map((experience) => (
          <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  experience.images?.[0] ||
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070"
                })`,
              }}
            />
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{experience.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {experience.description}
              </p>
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{experience.duration}h</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Max {experience.max_participants}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">R{experience.price}</span>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" onClick={() => navigate("/experiences")}>
          View All Experiences
        </Button>
      </div>
    </div>
  );
};
