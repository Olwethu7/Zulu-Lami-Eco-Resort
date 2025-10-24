import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users } from "lucide-react";

export const CulturalExperiences = () => {
  const navigate = useNavigate();
  
  const { data: experiences, isLoading } = useQuery({
    queryKey: ["preview-experiences"],
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

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-4">
            Immerse in Zulu Culture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with authentic traditions through guided experiences led by local community members
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences?.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-40 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${experience.images?.[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070'})` 
                  }}
                />
                <CardContent className="p-4">
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {experience.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Max {experience.max_participants}</span>
                    </div>
                  </div>
                  <div className="font-semibold text-primary">
                    R{experience.price}
                    <span className="text-sm font-normal text-muted-foreground">/person</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button size="lg" onClick={() => navigate("/experiences")}>
            Explore All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};
