import { Layout } from "@/components/layout/Layout";
import { useExperiences } from "@/hooks/useExperiences";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, MapPin, Award } from "lucide-react";

const Experiences = () => {
  const { data: experiences, isLoading } = useExperiences();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          Cultural Experiences
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover authentic Zulu cultural activities and nature tours
        </p>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : experiences && experiences.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {experience.images && experience.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={experience.images[0]} 
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                    {experience.cultural_authenticity_badge && (
                      <Badge className="absolute top-4 right-4 bg-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Authentic
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-2">
                    {experience.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {experience.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {experience.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{Math.floor(experience.duration / 60)}h {experience.duration % 60}m</span>
                      </div>
                    )}
                    
                    {experience.max_participants && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Max {experience.max_participants} participants</span>
                      </div>
                    )}
                    
                    {experience.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        R{experience.price?.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                    
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experiences available at the moment.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Experiences;
