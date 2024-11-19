import { useEffect, useState } from "react";
import AuthContext from "./AuthContext"; // Import the context
import { useNavigate } from "react-router-dom";
import databaseService from "../services/database-service";
// import { supabase } from "@supabase/auth-ui-shared";

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const { data: authListener } = globalThis._supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state change:', event);
                setSession(session);
                setUser(session?.user ?? null);


                // if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')
                // {
                //     console.log("Trying to fetch");
                //     if (session?.user)
                //     {
                //         console.log(session);
                //         console.log(session.user);

                //         const data = await databaseService.fetchProfile('aee633f0-498f-4f50-8ce7-68368bb168e0');
                //         console.log(data);
                //         if (data.error)
                //         {
                //             console.error("Error fetching profile:", error.message);
                //         } else
                //         {
                //             console.log("Fetched profile data:", data);
                //             setProfile(data); // Assuming setProfile manages profile state
                //         }
                //     }
                // }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    return <AuthContext.Provider value={{ user, session, profile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
