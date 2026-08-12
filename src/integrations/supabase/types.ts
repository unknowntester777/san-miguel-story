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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      faqs: {
        Row: {
          answer_en: string | null
          answer_es: string | null
          created_at: string
          id: string
          question_en: string | null
          question_es: string | null
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          answer_en?: string | null
          answer_es?: string | null
          created_at?: string
          id?: string
          question_en?: string | null
          question_es?: string | null
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          answer_en?: string | null
          answer_es?: string | null
          created_at?: string
          id?: string
          question_en?: string | null
          question_es?: string | null
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          city: string | null
          created_at: string
          email: string
          event_type: string | null
          first_name: string
          guests: string | null
          id: string
          last_name: string | null
          locale: string
          message: string | null
          notes: string | null
          phone: string
          read: boolean
          source: string | null
          status: string
          updated_at: string
          venue: string | null
          wedding_date: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          event_type?: string | null
          first_name: string
          guests?: string | null
          id?: string
          last_name?: string | null
          locale?: string
          message?: string | null
          notes?: string | null
          phone: string
          read?: boolean
          source?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
          wedding_date?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          event_type?: string | null
          first_name?: string
          guests?: string | null
          id?: string
          last_name?: string | null
          locale?: string
          message?: string | null
          notes?: string | null
          phone?: string
          read?: boolean
          source?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
          wedding_date?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          body_en: string | null
          body_es: string | null
          button_label_en: string | null
          button_label_es: string | null
          button_url: string | null
          created_at: string
          eyebrow_en: string | null
          eyebrow_es: string | null
          heading_en: string | null
          heading_es: string | null
          id: string
          image_alt_en: string | null
          image_alt_es: string | null
          image_url: string | null
          label: string
          section_key: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          body_en?: string | null
          body_es?: string | null
          button_label_en?: string | null
          button_label_es?: string | null
          button_url?: string | null
          created_at?: string
          eyebrow_en?: string | null
          eyebrow_es?: string | null
          heading_en?: string | null
          heading_es?: string | null
          id?: string
          image_alt_en?: string | null
          image_alt_es?: string | null
          image_url?: string | null
          label: string
          section_key: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          body_en?: string | null
          body_es?: string | null
          button_label_en?: string | null
          button_label_es?: string | null
          button_url?: string | null
          created_at?: string
          eyebrow_en?: string | null
          eyebrow_es?: string | null
          heading_en?: string | null
          heading_es?: string | null
          id?: string
          image_alt_en?: string | null
          image_alt_es?: string | null
          image_url?: string | null
          label?: string
          section_key?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          active: boolean
          alt_en: string | null
          alt_es: string | null
          category: string | null
          created_at: string
          featured: boolean
          id: string
          image_url: string
          location: string | null
          sort_order: number
          title: string | null
          updated_at: string
          venue: string | null
        }
        Insert: {
          active?: boolean
          alt_en?: string | null
          alt_es?: string | null
          category?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          image_url: string
          location?: string | null
          sort_order?: number
          title?: string | null
          updated_at?: string
          venue?: string | null
        }
        Update: {
          active?: boolean
          alt_en?: string | null
          alt_es?: string | null
          category?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string
          location?: string | null
          sort_order?: number
          title?: string | null
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          brand_name: string
          business_location: string
          canonical_url: string | null
          cta_text_en: string
          cta_text_es: string
          email: string
          facebook_url: string | null
          footer_text_en: string
          footer_text_es: string
          ga_id: string | null
          gsc_verification: string | null
          id: boolean
          instagram_url: string | null
          logo_url: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          phone: string
          seo_description_en: string
          seo_description_es: string
          seo_title_en: string
          seo_title_es: string
          updated_at: string
          whatsapp_message_en: string
          whatsapp_message_es: string
          whatsapp_number: string
        }
        Insert: {
          brand_name?: string
          business_location?: string
          canonical_url?: string | null
          cta_text_en?: string
          cta_text_es?: string
          email?: string
          facebook_url?: string | null
          footer_text_en?: string
          footer_text_es?: string
          ga_id?: string | null
          gsc_verification?: string | null
          id?: boolean
          instagram_url?: string | null
          logo_url?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          phone?: string
          seo_description_en?: string
          seo_description_es?: string
          seo_title_en?: string
          seo_title_es?: string
          updated_at?: string
          whatsapp_message_en?: string
          whatsapp_message_es?: string
          whatsapp_number?: string
        }
        Update: {
          brand_name?: string
          business_location?: string
          canonical_url?: string | null
          cta_text_en?: string
          cta_text_es?: string
          email?: string
          facebook_url?: string | null
          footer_text_en?: string
          footer_text_es?: string
          ga_id?: string | null
          gsc_verification?: string | null
          id?: boolean
          instagram_url?: string | null
          logo_url?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          phone?: string
          seo_description_en?: string
          seo_description_es?: string
          seo_title_en?: string
          seo_title_es?: string
          updated_at?: string
          whatsapp_message_en?: string
          whatsapp_message_es?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          couple_name: string
          created_at: string
          id: string
          quote_en: string | null
          quote_es: string | null
          sort_order: number
          updated_at: string
          venue: string | null
          visible: boolean
          year: string | null
        }
        Insert: {
          couple_name: string
          created_at?: string
          id?: string
          quote_en?: string | null
          quote_es?: string | null
          sort_order?: number
          updated_at?: string
          venue?: string | null
          visible?: boolean
          year?: string | null
        }
        Update: {
          couple_name?: string
          created_at?: string
          id?: string
          quote_en?: string | null
          quote_es?: string | null
          sort_order?: number
          updated_at?: string
          venue?: string | null
          visible?: boolean
          year?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      venues: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description_en: string | null
          description_es: string | null
          featured: boolean
          id: string
          location: string | null
          meta_description_en: string | null
          meta_description_es: string | null
          name: string
          published: boolean
          seo_title_en: string | null
          seo_title_es: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          featured?: boolean
          id?: string
          location?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          name: string
          published?: boolean
          seo_title_en?: string | null
          seo_title_es?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          featured?: boolean
          id?: string
          location?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          name?: string
          published?: boolean
          seo_title_en?: string | null
          seo_title_es?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      wedding_images: {
        Row: {
          alt_en: string | null
          alt_es: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
          wedding_id: string
        }
        Insert: {
          alt_en?: string | null
          alt_es?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
          wedding_id: string
        }
        Update: {
          alt_en?: string | null
          alt_es?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          wedding_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wedding_images_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      weddings: {
        Row: {
          category: string | null
          couple_names: string
          cover_image_url: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_es: string | null
          featured: boolean
          id: string
          location: string | null
          meta_description_en: string | null
          meta_description_es: string | null
          published: boolean
          seo_title_en: string | null
          seo_title_es: string | null
          slug: string
          sort_order: number
          story_en: string | null
          story_es: string | null
          updated_at: string
          venue: string | null
          wedding_date: string | null
        }
        Insert: {
          category?: string | null
          couple_names: string
          cover_image_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_es?: string | null
          featured?: boolean
          id?: string
          location?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          published?: boolean
          seo_title_en?: string | null
          seo_title_es?: string | null
          slug: string
          sort_order?: number
          story_en?: string | null
          story_es?: string | null
          updated_at?: string
          venue?: string | null
          wedding_date?: string | null
        }
        Update: {
          category?: string | null
          couple_names?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_es?: string | null
          featured?: boolean
          id?: string
          location?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          published?: boolean
          seo_title_en?: string | null
          seo_title_es?: string | null
          slug?: string
          sort_order?: number
          story_en?: string | null
          story_es?: string | null
          updated_at?: string
          venue?: string | null
          wedding_date?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
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
      app_role: ["admin"],
    },
  },
} as const
