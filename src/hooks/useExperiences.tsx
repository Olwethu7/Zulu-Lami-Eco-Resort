import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ExperienceCategory = "tour" | "workshop" | "dining" | "learning";

export const useExperiences = (category?: ExperienceCategory) => {
  return useQuery({
    queryKey: ["experiences", category],
    
    queryFn: async () => {
      let query = supabase
        .from("experiences")
        .select("*")
        .eq("available", true);

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useExperienceReviews = (experienceId: string) => {
  return useQuery({
    queryKey: ["reviews", "experience", experienceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("experience_id", experienceId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!experienceId,
  });
};
