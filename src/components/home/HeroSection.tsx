import { SearchBar } from "./SearchBar";

export const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 animate-fade-in">
          Experience Eco-Tourism in KwaZulu-Natal
        </h1>
        <p className="text-lg md:text-xl text-background/90 mb-8 max-w-2xl mx-auto">
          Discover authentic eco-friendly accommodations immersed in Zulu cultural heritage
        </p>
        
        <SearchBar />
      </div>
    </section>
  );
};
