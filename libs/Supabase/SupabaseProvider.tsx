"use client";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/libs/Supabase/client";
import { createContext, useState, useContext } from "react";

type SupabaseContext = {
    client: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined)


export default function SupabaseProvider({ children }: { children: React.ReactNode }) {

    const [supabase] = useState(() => createClient())

    return (
        <SupabaseContext.Provider value={{ client: supabase }}>
            {children}
        </SupabaseContext.Provider>
    )
}

export const useSupabase = () => {
    const context = useContext(SupabaseContext)
    if (context === undefined) {
        throw new Error('useSupabase must be used within a SupabaseProvider')
    }
    return context
}