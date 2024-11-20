import { useEffect, useState } from "react";
import AuthContext from "./AuthContext"; // Import the context
import databaseService from "../services/database-service";
// import { supabase } from "@supabase/auth-ui-shared";

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(() => {
        const cachedProfile = localStorage.getItem("profile");
        return cachedProfile ? JSON.parse(cachedProfile) : null;
    });

    useEffect(() => {

        const getProfile = async () => {
            if (session?.user && (!profile || session.user.id !== profile.user_id))
            {

                const { data, error } = await databaseService.fetchAuthUserProfile(session.user.id);
                if (data.error)
                {
                    console.error("Error fetching profile:", error.message);
                }
                else
                {
                    console.log("Fetched profile data:", data);
                    setProfile(data);
                    localStorage.setItem("profile", JSON.stringify(data));
                    console.log(data);
                }
            }
        }
        // if ()
        getProfile();


    }, [session, user]);

    useEffect(() => {
        const { data: authListener } = globalThis._supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state change:', event);
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    return <AuthContext.Provider value={{ user, session, profile, setProfile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
