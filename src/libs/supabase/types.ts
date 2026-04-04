export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      chapitres: {
        Row: {
          articles: string[] | null;
          contenu: Json | null;
          difficulte: string | null;
          id: string;
          module_id: string | null;
          ordre: number | null;
          pieges_examen: string[] | null;
          titre: string;
        };
        Insert: {
          articles?: string[] | null;
          contenu?: Json | null;
          difficulte?: string | null;
          id?: string;
          module_id?: string | null;
          ordre?: number | null;
          pieges_examen?: string[] | null;
          titre: string;
        };
        Update: {
          articles?: string[] | null;
          contenu?: Json | null;
          difficulte?: string | null;
          id?: string;
          module_id?: string | null;
          ordre?: number | null;
          pieges_examen?: string[] | null;
          titre?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chapitres_module_id_fkey';
            columns: ['module_id'];
            isOneToOne: false;
            referencedRelation: 'modules';
            referencedColumns: ['id'];
          }
        ];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      flashcards: {
        Row: {
          article_ref: string | null;
          difficulte: string | null;
          id: string;
          module_id: string | null;
          recto: string;
          verso: string;
        };
        Insert: {
          article_ref?: string | null;
          difficulte?: string | null;
          id?: string;
          module_id?: string | null;
          recto: string;
          verso: string;
        };
        Update: {
          article_ref?: string | null;
          difficulte?: string | null;
          id?: string;
          module_id?: string | null;
          recto?: string;
          verso?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flashcards_module_id_fkey';
            columns: ['module_id'];
            isOneToOne: false;
            referencedRelation: 'modules';
            referencedColumns: ['id'];
          }
        ];
      };
      flashcard_reviews: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          scope: string;
          bucket: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          card_id: string;
          scope?: string;
          bucket: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_id?: string;
          scope?: string;
          bucket?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'flashcard_reviews_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      modules: {
        Row: {
          couleur: string | null;
          created_at: string | null;
          description: string | null;
          icone: string | null;
          id: string;
          ordre: number | null;
          slug: string;
          titre: string;
        };
        Insert: {
          couleur?: string | null;
          created_at?: string | null;
          description?: string | null;
          icone?: string | null;
          id?: string;
          ordre?: number | null;
          slug: string;
          titre: string;
        };
        Update: {
          couleur?: string | null;
          created_at?: string | null;
          description?: string | null;
          icone?: string | null;
          id?: string;
          ordre?: number | null;
          slug?: string;
          titre?: string;
        };
        Relationships: [];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database['public']['Enums']['pricing_type'] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          article_ref: string | null;
          chapitre_id: string | null;
          difficulte: string | null;
          explication: string | null;
          id: string;
          module_id: string | null;
          options: Json;
          question: string;
          reponse_correcte: number;
          source_fascicule: string | null;
        };
        Insert: {
          article_ref?: string | null;
          chapitre_id?: string | null;
          difficulte?: string | null;
          explication?: string | null;
          id?: string;
          module_id?: string | null;
          options: Json;
          question: string;
          reponse_correcte: number;
          source_fascicule?: string | null;
        };
        Update: {
          article_ref?: string | null;
          chapitre_id?: string | null;
          difficulte?: string | null;
          explication?: string | null;
          id?: string;
          module_id?: string | null;
          options?: Json;
          question?: string;
          reponse_correcte?: number;
          source_fascicule?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_chapitre_id_fkey';
            columns: ['chapitre_id'];
            isOneToOne: false;
            referencedRelation: 'chapitres';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'questions_module_id_fkey';
            columns: ['module_id'];
            isOneToOne: false;
            referencedRelation: 'modules';
            referencedColumns: ['id'];
          }
        ];
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          mode: string;
          fascicule_num: number | null;
          domain_key: string | null;
          score: number;
          total: number;
          percent: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          mode: string;
          fascicule_num?: number | null;
          domain_key?: string | null;
          score: number;
          total: number;
          percent: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          mode?: string;
          fascicule_num?: number | null;
          domain_key?: string | null;
          score?: number;
          total?: number;
          percent?: number;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quiz_attempts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database['public']['Enums']['subscription_status'] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_price_id_fkey';
            columns: ['price_id'];
            isOneToOne: false;
            referencedRelation: 'prices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_progress: {
        Row: {
          created_at: string | null;
          flashcard_id: string | null;
          id: string;
          next_review: string | null;
          question_id: string | null;
          resultat: number | null;
          sm2_efactor: number | null;
          sm2_interval: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          flashcard_id?: string | null;
          id?: string;
          next_review?: string | null;
          question_id?: string | null;
          resultat?: number | null;
          sm2_efactor?: number | null;
          sm2_interval?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          flashcard_id?: string | null;
          id?: string;
          next_review?: string | null;
          question_id?: string | null;
          resultat?: number | null;
          sm2_efactor?: number | null;
          sm2_interval?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_progress_flashcard_id_fkey';
            columns: ['flashcard_id'];
            isOneToOne: false;
            referencedRelation: 'flashcards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_progress_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_progress_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
