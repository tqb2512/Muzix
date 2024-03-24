"use client";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createContext, useState, useEffect, useContext } from "react";

type SupabaseContext = {
    client: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined)


export default function SupabaseProvider({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const [supabase] = useState(() => createClient())

    // useEffect(() => {
    //     const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
    //         router.refresh()
    //     })

    //     return () => {
    //         subscription.unsubscribe()
    //     }
    // }, [router, supabase])

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