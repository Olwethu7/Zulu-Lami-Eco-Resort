import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Clock, Users, MapPin, Search } from "lucide-react";
import { ExperienceDetailModal } from "@/components/experiences/ExperienceDetailModal";
import { activitiesData, foodData, ExperienceItem } from "@/data/experiencesData";

const Experiences = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTab, setSelectedTab] = useState("activities");

  const handleViewDetails = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };

  const getPrice = (price: number | string): number => {
    if (typeof price === "string") {
      if (price === "Free") return 0;
      const match = price.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    }
    return price;
  };

  const filterExperiences = (experiences: ExperienceItem[]) => {
    return experiences.filter((exp) => {
      const matchesSearch =
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase());
      const price = getPrice(exp.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });
  };

  const groupBySubcategory = (experiences: ExperienceItem[]) => {
    const grouped: { [key: string]: ExperienceItem[] } = {};
    experiences.forEach((exp) => {
      if (!grouped[exp.subcategory]) {
        grouped[exp.subcategory] = [];
      }
      grouped[exp.subcategory].push(exp);
    });
    return grouped;
  };

  const renderExperienceCard = (experience: ExperienceItem) => (
    <Card
      key={experience.id}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>

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
              <span>{experience.duration}</span>
            </div>
          )}

          {experience.maxParticipants && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Max {experience.maxParticipants} participants</span>
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
              {typeof experience.price === "number"
                ? `R${experience.price.toFixed(2)}`
                : experience.price}
            </p>
            {typeof experience.price === "number" && (
              <p className="text-xs text-muted-foreground">per person</p>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => handleViewDetails(experience)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  const filteredActivities = filterExperiences(activitiesData);
  const filteredFood = filterExperiences(foodData);
  const groupedActivities = groupBySubcategory(filteredActivities);
  const groupedFood = groupBySubcategory(filteredFood);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-4xl font-bold text-primary mb-4">
          Experiences & Dining
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Discover authentic Zulu cultural activities, nature adventures, and
          traditional dining experiences
        </p>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search experiences and dining..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>

          <Card className="p-6">
            <h3 className="font-montserrat font-semibold mb-4">
              Price Range: R{priceRange[0]} - R{priceRange[1]}
            </h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="w-full"
            />
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="activities" className="text-lg py-3">
              Activities ({filteredActivities.length})
            </TabsTrigger>
            <TabsTrigger value="food" className="text-lg py-3">
              Food & Dining ({filteredFood.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activities">
            <div className="space-y-12">
              {Object.entries(groupedActivities).map(([subcategory, items]) => (
                <div key={subcategory}>
                  <h2 className="font-montserrat text-2xl font-bold text-primary mb-6 border-b pb-3">
                    {subcategory}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(renderExperienceCard)}
                  </div>
                </div>
              ))}
              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No activities match your search criteria. Try adjusting your
                    filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="food">
            <div className="space-y-12">
              {Object.entries(groupedFood).map(([subcategory, items]) => (
                <div key={subcategory}>
                  <h2 className="font-montserrat text-2xl font-bold text-primary mb-6 border-b pb-3">
                    {subcategory}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(renderExperienceCard)}
                  </div>
                </div>
              ))}
              {filteredFood.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No food options match your search criteria. Try adjusting
                    your filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <ExperienceDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          experience={selectedExperience}
        />
      </div>
    </Layout>
  );
};

export default Experiences;
