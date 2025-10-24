import { Leaf, Droplet, Recycle, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Leaf,
    title: "Carbon Neutral",
    description: "All accommodations offset 100% of their carbon footprint",
  },
  {
    icon: Droplet,
    title: "Water Conservation",
    description: "Rainwater harvesting and greywater recycling systems",
  },
  {
    icon: Recycle,
    title: "Zero Waste",
    description: "Comprehensive recycling and composting programs",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    description: "Solar-powered facilities reducing environmental impact",
  },
];

export const SustainabilityHighlights = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Sustainability Commitment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to preserving the natural beauty of KwaZulu-Natal for future generations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
