export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      platform_stats: {
        Row: {
          average_apy: number | null
          id: string
          total_rewards_distributed: number | null
          total_staked: number | null
          total_users: number | null
          total_validators: number | null
          updated_at: string | null
        }
        Insert: {
          average_apy?: number | null
          id?: string
          total_rewards_distributed?: number | null
          total_staked?: number | null
          total_users?: number | null
          total_validators?: number | null
          updated_at?: string | null
        }
        Update: {
          average_apy?: number | null
          id?: string
          total_rewards_distributed?: number | null
          total_staked?: number | null
          total_users?: number | null
          total_validators?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          total_rewards: number | null
          total_staked: number | null
          updated_at: string | null
          username: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          total_rewards?: number | null
          total_staked?: number | null
          updated_at?: string | null
          username?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          total_rewards?: number | null
          total_staked?: number | null
          updated_at?: string | null
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      rewards_history: {
        Row: {
          claimed_at: string | null
          epoch_number: number
          id: string
          reward_amount: number
          staking_position_id: string | null
          validator_address: string
          wallet_address: string
        }
        Insert: {
          claimed_at?: string | null
          epoch_number: number
          id?: string
          reward_amount: number
          staking_position_id?: string | null
          validator_address: string
          wallet_address?: string
        }
        Update: {
          claimed_at?: string | null
          epoch_number?: number
          id?: string
          reward_amount?: number
          staking_position_id?: string | null
          validator_address?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_wallet_rewards"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "rewards_history_staking_position_id_fkey"
            columns: ["staking_position_id"]
            isOneToOne: false
            referencedRelation: "staking_positions"
            referencedColumns: ["id"]
          },
        ]
      }
      staking_positions: {
        Row: {
          apy: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          rewards_earned: number
          stake_account_address: string | null
          staked_amount: number
          updated_at: string | null
          validator_address: string
          wallet_address: string
        }
        Insert: {
          apy?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rewards_earned?: number
          stake_account_address?: string | null
          staked_amount?: number
          updated_at?: string | null
          validator_address: string
          wallet_address?: string
        }
        Update: {
          apy?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          rewards_earned?: number
          stake_account_address?: string | null
          staked_amount?: number
          updated_at?: string | null
          validator_address?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_wallet_positions"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      staking_transactions: {
        Row: {
          amount: number
          block_hash: string | null
          created_at: string | null
          id: string
          status: string | null
          transaction_signature: string
          transaction_type: string
          validator_address: string | null
          wallet_address: string
        }
        Insert: {
          amount: number
          block_hash?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          transaction_signature: string
          transaction_type: string
          validator_address?: string | null
          wallet_address?: string
        }
        Update: {
          amount?: number
          block_hash?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          transaction_signature?: string
          transaction_type?: string
          validator_address?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_wallet_address"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      validators: {
        Row: {
          apy: number | null
          commission: number
          created_at: string | null
          description: string | null
          id: string
          identity_verified: boolean | null
          name: string
          status: string | null
          total_staked: number | null
          updated_at: string | null
          uptime: number | null
          validator_address: string
          website: string | null
        }
        Insert: {
          apy?: number | null
          commission: number
          created_at?: string | null
          description?: string | null
          id?: string
          identity_verified?: boolean | null
          name: string
          status?: string | null
          total_staked?: number | null
          updated_at?: string | null
          uptime?: number | null
          validator_address: string
          website?: string | null
        }
        Update: {
          apy?: number | null
          commission?: number
          created_at?: string | null
          description?: string | null
          id?: string
          identity_verified?: boolean | null
          name?: string
          status?: string | null
          total_staked?: number | null
          updated_at?: string | null
          uptime?: number | null
          validator_address?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
