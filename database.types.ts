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
            album: {
                Row: {
                    album_id: string
                    artist_id: string
                    name: string
                }
                Insert: {
                    album_id?: string
                    artist_id: string
                    name: string
                }
                Update: {
                    album_id?: string
                    artist_id?: string
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_album_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artist"
                        referencedColumns: ["artist_id"]
                    },
                ]
            }
            artist: {
                Row: {
                    artist_id: string
                    name: string
                }
                Insert: {
                    artist_id?: string
                    name: string
                }
                Update: {
                    artist_id?: string
                    name?: string
                }
                Relationships: []
            }
            artist_contribute_song: {
                Row: {
                    artist_id: string
                    song_id: string
                }
                Insert: {
                    artist_id: string
                    song_id: string
                }
                Update: {
                    artist_id?: string
                    song_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_artist_contribute_song_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artist"
                        referencedColumns: ["artist_id"]
                    },
                    {
                        foreignKeyName: "public_artist_contribute_song_song_id_fkey"
                        columns: ["song_id"]
                        isOneToOne: false
                        referencedRelation: "song"
                        referencedColumns: ["song_id"]
                    },
                ]
            }
            playlist: {
                Row: {
                    created_at: string
                    description: string | null
                    name: string | null
                    playlist_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    name?: string | null
                    playlist_id?: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    name?: string | null
                    playlist_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_playlist_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            playlist_song: {
                Row: {
                    created_at: string
                    playlist_id: string
                    song_id: string
                }
                Insert: {
                    created_at?: string
                    playlist_id: string
                    song_id: string
                }
                Update: {
                    created_at?: string
                    playlist_id?: string
                    song_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_playlist_song_playlist_id_fkey"
                        columns: ["playlist_id"]
                        isOneToOne: false
                        referencedRelation: "playlist"
                        referencedColumns: ["playlist_id"]
                    },
                    {
                        foreignKeyName: "public_playlist_song_song_id_fkey"
                        columns: ["song_id"]
                        isOneToOne: false
                        referencedRelation: "song"
                        referencedColumns: ["song_id"]
                    },
                ]
            }
            section: {
                Row: {
                    created_at: string | null
                    name: string | null
                    section_id: string
                }
                Insert: {
                    created_at?: string | null
                    name?: string | null
                    section_id?: string
                }
                Update: {
                    created_at?: string | null
                    name?: string | null
                    section_id?: string
                }
                Relationships: []
            }
            section_albums: {
                Row: {
                    album_id: string
                    created_at: string | null
                    section_id: string
                }
                Insert: {
                    album_id: string
                    created_at?: string | null
                    section_id: string
                }
                Update: {
                    album_id?: string
                    created_at?: string | null
                    section_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_section_albums_album_id_fkey"
                        columns: ["album_id"]
                        isOneToOne: false
                        referencedRelation: "album"
                        referencedColumns: ["album_id"]
                    },
                    {
                        foreignKeyName: "public_section_albums_section_id_fkey"
                        columns: ["section_id"]
                        isOneToOne: false
                        referencedRelation: "section"
                        referencedColumns: ["section_id"]
                    },
                ]
            }
            section_artists: {
                Row: {
                    artist_id: string
                    created_at: string | null
                    section_id: string
                }
                Insert: {
                    artist_id: string
                    created_at?: string | null
                    section_id: string
                }
                Update: {
                    artist_id?: string
                    created_at?: string | null
                    section_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_section_artists_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artist"
                        referencedColumns: ["artist_id"]
                    },
                    {
                        foreignKeyName: "public_section_artists_section_id_fkey"
                        columns: ["section_id"]
                        isOneToOne: false
                        referencedRelation: "section"
                        referencedColumns: ["section_id"]
                    },
                ]
            }
            section_playlists: {
                Row: {
                    created_at: string | null
                    playlist_id: string
                    section_id: string
                }
                Insert: {
                    created_at?: string | null
                    playlist_id: string
                    section_id: string
                }
                Update: {
                    created_at?: string | null
                    playlist_id?: string
                    section_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_section_playlists_playlist_id_fkey"
                        columns: ["playlist_id"]
                        isOneToOne: false
                        referencedRelation: "playlist"
                        referencedColumns: ["playlist_id"]
                    },
                    {
                        foreignKeyName: "public_section_playlists_section_id_fkey"
                        columns: ["section_id"]
                        isOneToOne: false
                        referencedRelation: "section"
                        referencedColumns: ["section_id"]
                    },
                ]
            }
            song: {
                Row: {
                    album_id: string
                    duration_ms: number
                    lyrics: string | null
                    name: string
                    song_id: string
                }
                Insert: {
                    album_id: string
                    duration_ms?: number
                    lyrics?: string | null
                    name: string
                    song_id?: string
                }
                Update: {
                    album_id?: string
                    duration_ms?: number
                    lyrics?: string | null
                    name?: string
                    song_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_song_album_id_fkey"
                        columns: ["album_id"]
                        isOneToOne: false
                        referencedRelation: "album"
                        referencedColumns: ["album_id"]
                    },
                ]
            }
            user: {
                Row: {
                    name: string
                    user_id: string
                }
                Insert: {
                    name: string
                    user_id?: string
                }
                Update: {
                    name?: string
                    user_id?: string
                }
                Relationships: []
            }
            user_following_artist: {
                Row: {
                    artist_id: string
                    created_at: string
                    user_id: string
                }
                Insert: {
                    artist_id: string
                    created_at?: string
                    user_id: string
                }
                Update: {
                    artist_id?: string
                    created_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_user_following_artist_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artist"
                        referencedColumns: ["artist_id"]
                    },
                    {
                        foreignKeyName: "public_user_following_artist_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_following_playlist: {
                Row: {
                    created_at: string
                    playlist_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    playlist_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    playlist_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_user_following_playlist_playlist_id_fkey"
                        columns: ["playlist_id"]
                        isOneToOne: false
                        referencedRelation: "playlist"
                        referencedColumns: ["playlist_id"]
                    },
                    {
                        foreignKeyName: "public_user_following_playlist_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_following_user: {
                Row: {
                    created_at: string
                    user1_id: string
                    user2_id: string
                }
                Insert: {
                    created_at?: string
                    user1_id: string
                    user2_id: string
                }
                Update: {
                    created_at?: string
                    user1_id?: string
                    user2_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_user_following_user_user1_id_fkey"
                        columns: ["user1_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "public_user_following_user_user2_id_fkey"
                        columns: ["user2_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_like_album: {
                Row: {
                    album_id: string
                    created_at: string
                    user_id: string
                }
                Insert: {
                    album_id: string
                    created_at?: string
                    user_id: string
                }
                Update: {
                    album_id?: string
                    created_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_user_like_album_album_id_fkey"
                        columns: ["album_id"]
                        isOneToOne: false
                        referencedRelation: "album"
                        referencedColumns: ["album_id"]
                    },
                    {
                        foreignKeyName: "public_user_like_album_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
            }
            user_like_song: {
                Row: {
                    created_at: string
                    song_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    song_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    song_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_user_like_song_song_id_fkey"
                        columns: ["song_id"]
                        isOneToOne: false
                        referencedRelation: "song"
                        referencedColumns: ["song_id"]
                    },
                    {
                        foreignKeyName: "public_user_like_song_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "user"
                        referencedColumns: ["user_id"]
                    },
                ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
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
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
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
    PublicEnumNameOrOptions extends | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
        : never
