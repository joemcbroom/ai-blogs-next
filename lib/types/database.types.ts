export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_space: {
        Row: {
          about_us: string | null
          created_at: string
          description: string | null
          id: number
          is_published: boolean
          name: string
          primary_color: string | null
          secondary_color: string | null
          slug: string
          tertiary_color: string | null
          updated_at: string | null
        }
        Insert: {
          about_us?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_published?: boolean
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          tertiary_color?: string | null
          updated_at?: string | null
        }
        Update: {
          about_us?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_published?: boolean
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          tertiary_color?: string | null
          updated_at?: string | null
        }
      }
      post: {
        Row: {
          blog_space_id: number
          content: string | null
          created_at: string | null
          description: string | null
          id: number
          is_published: boolean
          slug: string
          tag_ids: number[] | null
          title: string
        }
        Insert: {
          blog_space_id: number
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_published?: boolean
          slug: string
          tag_ids?: number[] | null
          title: string
        }
        Update: {
          blog_space_id?: number
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_published?: boolean
          slug?: string
          tag_ids?: number[] | null
          title?: string
        }
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
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
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
