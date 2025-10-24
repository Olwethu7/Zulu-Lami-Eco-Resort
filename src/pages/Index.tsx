import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedAccommodations } from "@/components/home/FeaturedAccommodations";
import { CulturalExperiences } from "@/components/home/CulturalExperiences";
import { SustainabilityHighlights } from "@/components/home/SustainabilityHighlights";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { QuickStats } from "@/components/home/QuickStats";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedAccommodations />
      <CulturalExperiences />
      <SustainabilityHighlights />
      <QuickStats />
      <TestimonialsSlider />
      <Footer />
    </Layout>
  );
};

export default Index;
