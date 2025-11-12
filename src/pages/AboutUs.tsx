import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Users, Globe } from "lucide-react";



const AboutUs = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            About Zulu Lami Eco-Resort
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Authentic eco-tourism experiences in the heart of KwaZulu-Natal
          </p>

          <div className="prose max-w-none mb-12">
            <p className="text-foreground mb-4">
              Welcome to Zulu Lami Eco-Resort, where authentic Zulu cultural heritage meets sustainable tourism excellence. 
              Nestled in the breathtaking landscapes of KwaZulu-Natal, we offer more than just accommodation – we provide 
              meaningful experiences that connect you with nature, culture, and local communities.
            </p>
            
            <p className="text-foreground mb-4">
              Our resort is built on the principles of environmental responsibility and cultural preservation. Every aspect 
              of our operations reflects our commitment to sustainability, from our eco-friendly lodges to our community 
              partnerships with local artisans and cultural groups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Environmental Stewardship</h3>
                  <p className="text-muted-foreground text-sm">
                    We utilize solar power, water recycling systems, and sustainable building materials to minimize 
                    our environmental impact while providing comfortable, modern accommodations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Cultural Preservation</h3>
                  <p className="text-muted-foreground text-sm">
                    We partner with local Zulu communities to offer authentic cultural experiences, preserving traditions 
                    while creating sustainable economic opportunities.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Community Empowerment</h3>
                  <p className="text-muted-foreground text-sm">
                    We employ local staff, source from local suppliers, and support community development projects 
                    to ensure tourism benefits the entire region.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Authentic Experiences</h3>
                  <p className="text-muted-foreground text-sm">
                    From traditional Zulu dance performances to wildlife safaris, we offer immersive experiences 
                    that create lasting memories and meaningful connections.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted p-8 rounded-lg">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-foreground mb-4">
              To provide exceptional eco-tourism experiences that honor Zulu cultural heritage, protect the natural 
              environment, and support local communities through sustainable tourism practices.
            </p>
            <p className="text-foreground">
              Join us in celebrating the beauty of KwaZulu-Natal while making a positive impact on the environment 
              and local communities. Your stay at Zulu Lami Eco-Resort is more than a vacation – it's a contribution 
              to a sustainable future.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
