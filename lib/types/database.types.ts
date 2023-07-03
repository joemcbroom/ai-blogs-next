export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          is_published: boolean
          slug: string
          space_id: number
          tag_ids: number[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          is_published?: boolean
          slug: string
          space_id: number
          tag_ids?: number[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          is_published?: boolean
          slug?: string
          space_id?: number
          tag_ids?: number[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_space_id_fkey"
            columns: ["space_id"]
            referencedRelation: "space"
            referencedColumns: ["id"]
          }
        ]
      }
      post_previous_version: {
        Row: {
          content: string
          created_at: string | null
          id: number
          post_id: number
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          post_id: number
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_previous_version_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      space: {
        Row: {
          about_us: string | null
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          is_published: boolean
          primary_color: string | null
          secondary_color: string | null
          slug: string
          tertiary_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          about_us?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          is_published?: boolean
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          tertiary_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          about_us?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          is_published?: boolean
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          tertiary_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: number
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
        }
        Relationships: []
      }
      tag: {
        Row: {
          blog_space_id: number
          created_at: string | null
          id: number
          tag_name: string
        }
        Insert: {
          blog_space_id: number
          created_at?: string | null
          id?: number
          tag_name: string
        }
        Update: {
          blog_space_id?: number
          created_at?: string | null
          id?: number
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_blog_space_id_fkey"
            columns: ["blog_space_id"]
            referencedRelation: "space"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
