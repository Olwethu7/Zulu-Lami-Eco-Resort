export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accommodations: {
        Row: {
          amenities: string[] | null
          available: boolean | null
          capacity: number | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          location: string | null
          name: string
          price_per_night: number | null
          sustainability_features: string[] | null
          sustainability_rating: number | null
          type: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          amenities?: string[] | null
          available?: boolean | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          name: string
          price_per_night?: number | null
          sustainability_features?: string[] | null
          sustainability_rating?: number | null
          type?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          amenities?: string[] | null
          available?: boolean | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          name?: string
          price_per_night?: number | null
          sustainability_features?: string[] | null
          sustainability_rating?: number | null
          type?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          accommodation_id: string | null
          admin_approved: boolean | null
          admin_notes: string | null
          check_in_date: string | null
          check_out_date: string | null
          created_at: string | null
          experience_id: string | null
          guest_email: string | null
          guest_id_number: string | null
          guest_name: string | null
          guest_phone: string | null
          guests: number | null
          id: string
          payment_proof_url: string | null
          payment_status: string | null
          room_id: string | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accommodation_id?: string | null
          admin_approved?: boolean | null
          admin_notes?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          experience_id?: string | null
          guest_email?: string | null
          guest_id_number?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests?: number | null
          id?: string
          payment_proof_url?: string | null
          payment_status?: string | null
          room_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accommodation_id?: string | null
          admin_approved?: boolean | null
          admin_notes?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string | null
          experience_id?: string | null
          guest_email?: string | null
          guest_id_number?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests?: number | null
          id?: string
          payment_proof_url?: string | null
          payment_status?: string | null
          room_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      community_artisans: {
        Row: {
          bio: string | null
          contact_info: Json | null
          created_at: string | null
          id: string
          name: string
          photo_url: string | null
          specialty: string | null
          story: string | null
        }
        Insert: {
          bio?: string | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          name: string
          photo_url?: string | null
          specialty?: string | null
          story?: string | null
        }
        Update: {
          bio?: string | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          specialty?: string | null
          story?: string | null
        }
        Relationships: []
      }
      conservation_projects: {
        Row: {
          active: boolean | null
          created_at: string | null
          current_amount: number | null
          description: string | null
          goal_amount: number | null
          id: string
          image_url: string | null
          name: string
          progress: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          current_amount?: number | null
          description?: string | null
          goal_amount?: number | null
          id?: string
          image_url?: string | null
          name: string
          progress?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          current_amount?: number | null
          description?: string | null
          goal_amount?: number | null
          id?: string
          image_url?: string | null
          name?: string
          progress?: number | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          available: boolean | null
          category: Database["public"]["Enums"]["experience_category"]
          created_at: string | null
          cultural_authenticity_badge: boolean | null
          description: string | null
          duration: number | null
          id: string
          images: string[] | null
          location: string | null
          max_participants: number | null
          price: number | null
          title: string
        }
        Insert: {
          available?: boolean | null
          category: Database["public"]["Enums"]["experience_category"]
          created_at?: string | null
          cultural_authenticity_badge?: boolean | null
          description?: string | null
          duration?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          title: string
        }
        Update: {
          available?: boolean | null
          category?: Database["public"]["Enums"]["experience_category"]
          created_at?: string | null
          cultural_authenticity_badge?: boolean | null
          description?: string | null
          duration?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          accommodation_id: string | null
          cleanliness_rating: number | null
          comment: string
          communication_rating: number | null
          created_at: string
          experience_id: string | null
          helpful_count: number | null
          host_response: string | null
          host_response_date: string | null
          id: string
          location_rating: number | null
          photos: string[] | null
          rating: number
          title: string | null
          updated_at: string
          user_id: string
          value_rating: number | null
          verified_stay: boolean | null
        }
        Insert: {
          accommodation_id?: string | null
          cleanliness_rating?: number | null
          comment: string
          communication_rating?: number | null
          created_at?: string
          experience_id?: string | null
          helpful_count?: number | null
          host_response?: string | null
          host_response_date?: string | null
          id?: string
          location_rating?: number | null
          photos?: string[] | null
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Update: {
          accommodation_id?: string | null
          cleanliness_rating?: number | null
          comment?: string
          communication_rating?: number | null
          created_at?: string
          experience_id?: string | null
          helpful_count?: number | null
          host_response?: string | null
          host_response_date?: string | null
          id?: string
          location_rating?: number | null
          photos?: string[] | null
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          accommodation_id: string
          amenities: string[] | null
          available: boolean | null
          capacity: number
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          name: string
          price_per_night: number
          quantity: number
          room_type: string
          updated_at: string
        }
        Insert: {
          accommodation_id: string
          amenities?: string[] | null
          available?: boolean | null
          capacity: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          name: string
          price_per_night: number
          quantity?: number
          room_type: string
          updated_at?: string
        }
        Update: {
          accommodation_id?: string
          amenities?: string[] | null
          available?: boolean | null
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          name?: string
          price_per_night?: number
          quantity?: number
          room_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_accommodations: {
        Row: {
          accommodation_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          accommodation_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          accommodation_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_accommodations_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_reviews: {
        Row: {
          accommodation_id: string | null
          cleanliness_rating: number | null
          comment: string | null
          communication_rating: number | null
          created_at: string | null
          experience_id: string | null
          guest_identifier: string | null
          helpful_count: number | null
          host_response: string | null
          host_response_date: string | null
          id: string | null
          location_rating: number | null
          photos: string[] | null
          rating: number | null
          title: string | null
          updated_at: string | null
          value_rating: number | null
          verified_stay: boolean | null
        }
        Insert: {
          accommodation_id?: string | null
          cleanliness_rating?: number | null
          comment?: string | null
          communication_rating?: number | null
          created_at?: string | null
          experience_id?: string | null
          guest_identifier?: never
          helpful_count?: number | null
          host_response?: string | null
          host_response_date?: string | null
          id?: string | null
          location_rating?: number | null
          photos?: string[] | null
          rating?: number | null
          title?: string | null
          updated_at?: string | null
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Update: {
          accommodation_id?: string | null
          cleanliness_rating?: number | null
          comment?: string | null
          communication_rating?: number | null
          created_at?: string | null
          experience_id?: string | null
          guest_identifier?: never
          helpful_count?: number | null
          host_response?: string | null
          host_response_date?: string | null
          id?: string | null
          location_rating?: number | null
          photos?: string[] | null
          rating?: number | null
          title?: string | null
          updated_at?: string | null
          value_rating?: number | null
          verified_stay?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_room_availability: {
        Args: { p_check_in: string; p_check_out: string; p_room_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      experience_category: "workshop" | "tour" | "dining" | "learning"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      experience_category: ["workshop", "tour", "dining", "learning"],
    },
  },
} as const
