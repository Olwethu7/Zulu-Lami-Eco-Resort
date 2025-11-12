import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Sun, Droplet, Recycle, TreePine, Wind, Lightbulb } from "lucide-react";


const Sustainability = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            Our Sustainability Commitment
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Building a sustainable future through eco-friendly practices and environmental stewardship
          </p>

          <div className="prose max-w-none mb-12">
            <p className="text-foreground mb-6">
              At Zulu Lami Eco-Resort, sustainability isn't just a buzzword – it's the foundation of everything we do. 
              We believe that tourism should enhance, not harm, the natural environment and local communities. Our 
              comprehensive sustainability program touches every aspect of our operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sun className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Solar Power</h3>
                  <p className="text-muted-foreground text-sm">
                    100% of our energy needs are met through solar power systems, reducing our carbon footprint 
                    and ensuring clean, renewable energy for all resort operations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Water Conservation</h3>
                  <p className="text-muted-foreground text-sm">
                    Our advanced water recycling and rainwater harvesting systems reduce water consumption by 70%, 
                    protecting this precious resource for future generations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Waste Reduction</h3>
                  <p className="text-muted-foreground text-sm">
                    We practice comprehensive recycling and composting, with 95% of our waste diverted from landfills. 
                    Organic waste becomes nutrient-rich compost for our gardens.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TreePine className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Local Materials</h3>
                  <p className="text-muted-foreground text-sm">
                    Our structures are built using sustainably sourced local materials, supporting the regional economy 
                    while minimizing transportation emissions and environmental impact.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Wind className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Wildlife Conservation</h3>
                  <p className="text-muted-foreground text-sm">
                    We actively participate in local wildlife conservation efforts, protecting habitats and supporting 
                    biodiversity through responsible tourism practices and habitat restoration.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Education & Awareness</h3>
                  <p className="text-muted-foreground text-sm">
                    We educate guests about environmental conservation and sustainable practices, inspiring positive 
                    change that extends beyond their stay with us.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted p-8 rounded-lg mb-8">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Our Carbon Offset Program</h2>
            <p className="text-foreground mb-4">
              Every guest stay contributes to our carbon offset program, which funds reforestation projects and 
              renewable energy initiatives in KwaZulu-Natal. We've planted over 10,000 indigenous trees and offset 
              more than 500 tons of carbon emissions since our inception.
            </p>
          </div>

          <div className="bg-primary/5 p-8 rounded-lg">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Sustainability Goals</h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Achieve carbon neutrality across all operations by 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Expand our solar power capacity to support local community facilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Establish a wildlife corridor connecting protected areas in the region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Partner with 50 local suppliers to promote sustainable business practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Create educational programs reaching 1,000 local students annually</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sustainability;
