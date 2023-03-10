"use client"
import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth, ThemeSupa  } from "@supabase/auth-ui-react";



const Login: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    if (user) {
        router.push("/main-feed");

    }
    return (
        <>
        
          <Auth 
            appearance={{theme: ThemeSupa}}
            supabaseClient={supabaseClient} 

        />
        </>
    )
}
export default Login;