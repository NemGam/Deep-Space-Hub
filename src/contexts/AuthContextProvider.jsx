import { useEffect, useState } from "react";
import AuthContext from "./AuthContext"; // Import the context
import { useNavigate } from "react-router-dom";
import databaseService from "../services/database-service";
// import { supabase } from "@supabase/auth-ui-shared";

function AuthProvider ({ children }){
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { data: authListener } = globalThis._supabaseClient.auth.onAuthStateChange(
            (event, session) => {
              console.log('Auth state change:', event);
              setSession(session);
              setUser(session?.user ?? null);
            }
          );
      
          return () => {
            authListener.subscription.unsubscribe();
          };
        }, []);


    return <AuthContext.Provider value={{user, session}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
