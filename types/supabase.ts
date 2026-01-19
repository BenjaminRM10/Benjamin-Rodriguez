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
            certifications: {
                Row: {
                    category: string
                    created_at: string | null
                    credential_url: string | null
                    id: string
                    image_path: string | null
                    issue_date: string | null
                    issuer: string
                    logo: string | null
                    name: string
                    sort_order: number | null
                }
                Insert: {
                    category: string
                    created_at?: string | null
                    credential_url?: string | null
                    id?: string
                    image_path?: string | null
                    issue_date?: string | null
                    issuer: string
                    logo?: string | null
                    name: string
                    sort_order?: number | null
                }
                Update: {
                    category?: string
                    created_at?: string | null
                    credential_url?: string | null
                    id?: string
                    image_path?: string | null
                    issue_date?: string | null
                    issuer: string
                    logo?: string | null
                    name: string
                    sort_order?: number | null
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
                        foreignKeyName: "fk_roi_calculation"
                        columns: ["roi_calculation_id"]
                        isOneToOne: false
                        referencedRelation: "roi_calculations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            course_registrations: {
                Row: {
                    attendee_type: Database["public"]["Enums"]["course_attendee_type"]
                    course_id: string
                    created_at: string | null
                    email: string
                    email_verification_token: string | null
                    email_verified_at: string | null
                    event_id: string | null
                    event_date: string | null
                    full_name: string
                    id: string
                    payment_id: string | null
                    phone: string | null
                    status: Database["public"]["Enums"]["course_registration_status"] | null
                }
                Insert: {
                    attendee_type: Database["public"]["Enums"]["course_attendee_type"]
                    course_id: string
                    created_at?: string | null
                    email: string
                    email_verification_token?: string | null
                    email_verified_at?: string | null
                    event_id?: string | null
                    event_date?: string | null
                    full_name: string
                    id?: string
                    payment_id?: string | null
                    phone?: string | null
                    status?: Database["public"]["Enums"]["course_registration_status"] | null
                }
                Update: {
                    attendee_type?: Database["public"]["Enums"]["course_attendee_type"]
                    course_id?: string
                    created_at?: string | null
                    email?: string
                    email_verification_token?: string | null
                    email_verified_at?: string | null
                    event_id?: string | null
                    event_date?: string | null
                    full_name?: string
                    id?: string
                    payment_id?: string | null
                    phone?: string | null
                    status?: Database["public"]["Enums"]["course_registration_status"] | null
                }
                Relationships: []
            }
            email_verifications: {
                Row: {
                    created_at: string | null
                    email: string
                    expires_at: string | null
                    id: string
                    token: string
                    verified: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    expires_at?: string | null
                    id?: string
                    token: string
                    verified?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    expires_at?: string | null
                    id?: string
                    token?: string
                    verified?: boolean | null
                }
                Relationships: []
            }
            events: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string | null
                    type: Database["public"]["Enums"]["event_type"]
                    start_date: string
                    end_date: string
                    location: string | null
                    capacity: number | null
                    price_config: Json | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description?: string | null
                    type: Database["public"]["Enums"]["event_type"]
                    start_date: string
                    end_date: string
                    location?: string | null
                    capacity?: number | null
                    price_config?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string | null
                    type?: Database["public"]["Enums"]["event_type"]
                    start_date?: string
                    end_date?: string
                    location?: string | null
                    capacity?: number | null
                    price_config?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            roi_calculations: {
                Row: {
                    created_at: string | null
                    hourly_cost: number
                    hours_per_week: number
                    id: string
                    monthly_cost_saved: number | null
                    people_count: number
                    task_description: string
                    weekly_hours_saved: number | null
                    yearly_roi: number | null
                }
                Insert: {
                    created_at?: string | null
                    hourly_cost: number
                    hours_per_week: number
                    id?: string
                    monthly_cost_saved?: number | null
                    people_count: number
                    task_description: string
                    weekly_hours_saved?: number | null
                    yearly_roi?: number | null
                }
                Update: {
                    created_at?: string | null
                    hourly_cost?: number
                    hours_per_week?: number
                    id?: string
                    monthly_cost_saved?: number | null
                    people_count?: number
                    task_description?: string
                    weekly_hours_saved?: number | null
                    yearly_roi?: number | null
                }
                Relationships: []
            }
            skills: {
                Row: {
                    category: string
                    certified: boolean | null
                    created_at: string | null
                    icon: string | null
                    id: string
                    name: string
                    proficiency: number | null
                    sort_order: number | null
                }
                Insert: {
                    category: string
                    certified?: boolean | null
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name: string
                    proficiency?: number | null
                    sort_order?: number | null
                }
                Update: {
                    category?: string
                    certified?: boolean | null
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name?: string
                    proficiency?: number | null
                    sort_order?: number | null
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
            course_attendee_type: "student" | "professional" | "company"
            course_registration_status:
            | "pending_email_verification"
            | "pending_payment"
            | "confirmed"
            | "rejected"
            event_type: "workshop" | "online" | "corporate" | "tec_saltillo"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database["public"]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Row: infer R
    }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Row: infer R
    }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
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
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
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
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
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
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
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
