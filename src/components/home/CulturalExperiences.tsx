import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { allExperiences } from "@/data/experiencesData";
import { useMemo } from "react";

export const CulturalExperiences = () => {
  const navigate = useNavigate();
  
  // Filter for culturally relevant experiences and food
  const featuredExperiences = useMemo(() => {
    return allExperiences.filter(exp => 
      exp.id === "cultural-3" || // Cultural Village Tour
      exp.id === "meal-1" ||     // Traditional Zulu Feast
      exp.id === "meal-3"        // Braai Experience
    );
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredExperiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="h-40 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${experience.image})` 
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
                    <span>{experience.duration}</span>
                  </div>
                  {experience.maxParticipants && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Max {experience.maxParticipants}</span>
                    </div>
                  )}
                </div>
                <div className="font-semibold text-primary">
                  R{experience.price}
                  <span className="text-sm font-normal text-muted-foreground">/person</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" onClick={() => navigate("/experiences")}>
            Explore All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};
