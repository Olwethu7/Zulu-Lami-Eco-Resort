import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star } from "lucide-react";

interface ExperienceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: {
    title: string;
    price: number | string;
    duration?: string;
    maxParticipants?: number;
    location?: string;
    description: string;
    included: string[];
    image: string;
  } | null;
}

export const ExperienceDetailModal = ({
  open,
  onOpenChange,
  experience,
}: ExperienceDetailModalProps) => {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-2xl">
            {experience.title}
          </DialogTitle>
          <DialogDescription>Complete activity details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                R{typeof experience.price === 'number' ? experience.price.toFixed(2) : experience.price}
              </Badge>
            </div>
            {experience.duration && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{experience.duration}</span>
              </div>
            )}
            {experience.maxParticipants && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>Max {experience.maxParticipants} participants</span>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-2">
              Description
            </h3>
            <p className="text-muted-foreground">{experience.description}</p>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-2">
              What's Included
            </h3>
            <ul className="space-y-2">
              {experience.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-3">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-semibold">Sarah M.</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Absolutely amazing experience! The authenticity and attention to detail made this unforgettable."
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-semibold">John D.</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Great value for money. The staff was knowledgeable and passionate about sharing their culture."
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
