// @ts-nocheck
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
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            app_config: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    key: string
                    updated_at: string | null
                    value: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    key: string
                    updated_at?: string | null
                    value?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    key?: string
                    updated_at?: string | null
                    value?: string | null
                }
                Relationships: []
            }
            contact_messages: {
                Row: {
                    company: string | null
                    created_at: string | null
                    email: string
                    id: string
                    message: string
                    name: string
                    read: boolean | null
                    responded: boolean | null
                    roi_calculation_id: string | null
                    service: string
                    source: string | null
                }
                Insert: {
                    company?: string | null
                    created_at?: string | null
                    email: string
                    id?: string
                    message: string
                    name: string
                    read?: boolean | null
                    responded?: boolean | null
                    roi_calculation_id?: string | null
                    service: string
                    source?: string | null
                }
                Update: {
                    company?: string | null
                    created_at?: string | null
                    email?: string
                    id?: string
                    message?: string
                    name?: string
                    read?: boolean | null
                    responded?: boolean | null
                    roi_calculation_id?: string | null
                    service?: string
                    source?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "contact_messages_roi_calculation_id_fkey"
                        columns: ["roi_calculation_id"]
                        isOneToOne: false
                        referencedRelation: "roi_calculations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            roi_calculations: {
                Row: {
                    ai_response: Json | null
                    annual_roi: number | null
                    created_at: string | null
                    feasibility: string | null
                    hourly_cost: number
                    hours_per_week: number
                    id: string
                    implementation_weeks: number | null
                    ip_address: unknown | null
                    monthly_cost_saved: number | null
                    payback_period_months: number | null
                    people_count: number
                    recommended_solution: string | null
                    search_results: Json | null
                    task_description: string
                    tools_suggested: string[] | null
                    user_agent: string | null
                    weekly_hours_saved: number | null
                }
                Insert: {
                    ai_response?: Json | null
                    annual_roi?: number | null
                    created_at?: string | null
                    feasibility?: string | null
                    hourly_cost: number
                    hours_per_week: number
                    id?: string
                    implementation_weeks?: number | null
                    ip_address?: unknown | null
                    monthly_cost_saved?: number | null
                    payback_period_months?: number | null
                    people_count: number
                    recommended_solution?: string | null
                    search_results?: Json | null
                    task_description: string
                    tools_suggested?: string[] | null
                    user_agent?: string | null
                    weekly_hours_saved?: number | null
                }
                Update: {
                    ai_response?: Json | null
                    annual_roi?: number | null
                    created_at?: string | null
                    feasibility?: string | null
                    hourly_cost?: number
                    hours_per_week?: number
                    id?: string
                    implementation_weeks?: number | null
                    ip_address?: unknown | null
                    monthly_cost_saved?: number | null
                    payback_period_months?: number | null
                    people_count?: number
                    recommended_solution?: string | null
                    search_results?: Json | null
                    task_description?: string
                    tools_suggested?: string[] | null
                    user_agent?: string | null
                    weekly_hours_saved?: number | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_decrypted_config: {
                Args: {
                    p_key: string
                    p_enc_key: string
                }
                Returns: string
            }
            set_config_config: {
                Args: {
                    p_key: string
                    p_value: string
                    p_enc_key: string
                    p_description?: string
                }
                Returns: undefined
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

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
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
