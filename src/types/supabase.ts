export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cameras: {
        Row: {
          created_at: string;

          id: number;

          name: string | null;

          point_id: number | null;

          processed: boolean;

          url: string | null;
        };

        Insert: {
          created_at?: string;

          id?: number;

          name?: string | null;

          point_id?: number | null;

          processed?: boolean;

          url?: string | null;
        };

        Update: {
          created_at?: string;

          id?: number;

          name?: string | null;

          point_id?: number | null;

          processed?: boolean;

          url?: string | null;
        };

        Relationships: [
          {
            foreignKeyName: "public_cameras_point_id_fkey";

            columns: ["point_id"];

            isOneToOne: false;

            referencedRelation: "points";

            referencedColumns: ["id"];
          },
        ];
      };

      points: {
        Row: {
          camera_count: number;

          created_at: string;

          floor_plan_url: string | null;

          id: number;

          json: Json | null;

          name: string | null;

          restart: boolean;

          status: string;

          user_id: string | null;
        };

        Insert: {
          camera_count?: number;

          created_at?: string;

          floor_plan_url?: string | null;

          id?: number;

          json?: Json | null;

          name?: string | null;

          restart?: boolean;

          status?: string;

          user_id?: string | null;
        };

        Update: {
          camera_count?: number;

          created_at?: string;

          floor_plan_url?: string | null;

          id?: number;

          json?: Json | null;

          name?: string | null;

          restart?: boolean;

          status?: string;

          user_id?: string | null;
        };

        Relationships: [
          {
            foreignKeyName: "public_points_user_id_fkey";

            columns: ["user_id"];

            isOneToOne: false;

            referencedRelation: "users";

            referencedColumns: ["id"];
          },
        ];
      };

      role_permissions: {
        Row: {
          id: number;

          permission: Database["public"]["Enums"]["app_permission"];

          role: Database["public"]["Enums"]["app_role"];
        };

        Insert: {
          id?: number;

          permission: Database["public"]["Enums"]["app_permission"];

          role: Database["public"]["Enums"]["app_role"];
        };

        Update: {
          id?: number;

          permission?: Database["public"]["Enums"]["app_permission"];

          role?: Database["public"]["Enums"]["app_role"];
        };

        Relationships: [];
      };

      statistics: {
        Row: {
          created_at: string;

          id: number;

          point_id: number | null;

          type: string;

          data: Json;
        };

        Insert: {
          created_at?: string;

          id?: number;

          point_id?: number | null;
        };

        Update: {
          created_at?: string;

          id?: number;

          point_id?: number | null;
        };

        Relationships: [
          {
            foreignKeyName: "public_statistics_point_id_fkey";

            columns: ["point_id"];

            isOneToOne: false;

            referencedRelation: "points";

            referencedColumns: ["id"];
          },
        ];
      };

      user_roles: {
        Row: {
          id: number;

          role: Database["public"]["Enums"]["app_role"];

          user_id: string;
        };

        Insert: {
          id?: number;

          role: Database["public"]["Enums"]["app_role"];

          user_id: string;
        };

        Update: {
          id?: number;

          role?: Database["public"]["Enums"]["app_role"];

          user_id?: string;
        };

        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";

            columns: ["user_id"];

            isOneToOne: false;

            referencedRelation: "users";

            referencedColumns: ["id"];
          },
        ];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
        };

        Returns: boolean;
      };

      custom_access_token_hook: {
        Args: {
          event: Json;
        };

        Returns: Json;
      };
    };

    Enums: {
      app_permission: "read_all";

      app_role: "admin";
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
