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
      examen_blanc_waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
        };
        Relationships: [];
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
      learning_modules: {
        Row: {
          color: string | null;
          created_at: string;
          icon: string | null;
          id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id: string;
          sort_order: number;
          title: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      learning_nodes: {
        Row: {
          client_key: string | null;
          created_at: string;
          description: string | null;
          href: string | null;
          id: string;
          kind: string;
          min_score_pct: number;
          module_id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          client_key?: string | null;
          created_at?: string;
          description?: string | null;
          href?: string | null;
          id?: string;
          kind: string;
          min_score_pct?: number;
          module_id: string;
          sort_order: number;
          title: string;
        };
        Update: {
          client_key?: string | null;
          created_at?: string;
          description?: string | null;
          href?: string | null;
          id?: string;
          kind?: string;
          min_score_pct?: number;
          module_id?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'learning_nodes_module_id_fkey';
            columns: ['module_id'];
            isOneToOne: false;
            referencedRelation: 'learning_modules';
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
      user_engagement_preferences: {
        Row: {
          user_id: string;
          email_reminders_opt_in: boolean;
          theme_hint: 'light' | 'dark' | 'system' | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          email_reminders_opt_in?: boolean;
          theme_hint?: 'light' | 'dark' | 'system' | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          email_reminders_opt_in?: boolean;
          theme_hint?: 'light' | 'dark' | 'system' | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      stripe_webhook_events: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
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
      onboarding_progress: {
        Row: {
          id: string;
          user_id: string;
          stage: number;
          completed: boolean;
          formation_phase: 'early' | 'mid' | 'late' | null;
          strengths: string[] | null;
          weaknesses: string[] | null;
          diagnostic_answers: Array<{ question_id: string; answer: string; correct: boolean }> | null;
          diagnostic_level: 'Novice' | 'Débutant' | 'Intermédiaire' | 'Expert' | null;
          diagnostic_score: number | null;
          generated_plan: Record<string, unknown> | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          stage?: number;
          completed?: boolean;
          formation_phase?: 'early' | 'mid' | 'late' | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          diagnostic_answers?: Array<{ question_id: string; answer: string; correct: boolean }> | null;
          diagnostic_level?: 'Novice' | 'Débutant' | 'Intermédiaire' | 'Expert' | null;
          diagnostic_score?: number | null;
          generated_plan?: Record<string, unknown> | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          stage?: number;
          completed?: boolean;
          formation_phase?: 'early' | 'mid' | 'late' | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          diagnostic_answers?: Array<{ question_id: string; answer: string; correct: boolean }> | null;
          diagnostic_level?: 'Novice' | 'Débutant' | 'Intermédiaire' | 'Expert' | null;
          diagnostic_score?: number | null;
          generated_plan?: Record<string, unknown> | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      parcours_cadres_progress: {
        Row: {
          user_id: string;
          step_slug: string;
          lesson_completed: boolean;
          quiz_best_score: number | null;
          quiz_passed: boolean;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          step_slug: string;
          lesson_completed?: boolean;
          quiz_best_score?: number | null;
          quiz_passed?: boolean;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          step_slug?: string;
          lesson_completed?: boolean;
          quiz_best_score?: number | null;
          quiz_passed?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_node_progress: {
        Row: {
          best_score_pct: number | null;
          completed_at: string | null;
          node_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          best_score_pct?: number | null;
          completed_at?: string | null;
          node_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          best_score_pct?: number | null;
          completed_at?: string | null;
          node_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_node_progress_node_id_fkey';
            columns: ['node_id'];
            isOneToOne: false;
            referencedRelation: 'learning_nodes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_node_progress_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_session_date: string | null;
          streak_start_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_session_date?: string | null;
          streak_start_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_streak?: number;
          longest_streak?: number;
          last_session_date?: string | null;
          streak_start_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned: boolean;
          earned_at: string | null;
          current_progress: number;
          target_progress: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          earned?: boolean;
          earned_at?: string | null;
          current_progress?: number;
          target_progress?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          earned?: boolean;
          earned_at?: string | null;
          current_progress?: number;
          target_progress?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          source: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          source?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          source?: string;
        };
        Relationships: [];
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
