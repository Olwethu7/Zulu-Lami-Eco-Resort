import { TreePine, Users, Award, Heart } from "lucide-react";

const stats = [
  { icon: TreePine, value: "50,000+", label: "Trees Planted" },
  { icon: Users, value: "200+", label: "Local Jobs Created" },
  { icon: Award, value: "15", label: "Conservation Awards" },
  { icon: Heart, value: "10,000+", label: "Happy Guests" },
];

export const QuickStats = () => {
  return (
    <section className="py-12 bg-primary text-background">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <p className="text-3xl font-bold font-montserrat mb-1">
                  {stat.value}
                </p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
