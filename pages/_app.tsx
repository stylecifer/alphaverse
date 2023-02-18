import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app'
import { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Box } from '@/components/box';
import Navbar from '@/components/NavbarComponent';
import { Auth } from "@supabase/auth-ui-react";
//Provide (providing a Superbase to our application, nextui providers )
// Navbar 
function MyApp ({ Component, pageProps } : AppProps) {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    // Supabase URL? Supabase anon key?     CREATE SUPABASE ACCOUNT
    
    return ( 
    
        <SessionContextProvider
            supabaseClient={supabaseClient}
        >
            <NextUIProvider>
                <Navbar />
                
                <Box css={{px: "$12", py:"$15", mt:"$12","@xsMax":{px:"$10"}, maxWidth:"800px", margin:"0 auto"}}>
                    
                    <Component {...pageProps} />
                </Box>
            </NextUIProvider>
        </SessionContextProvider>

    )
}
export default MyApp;