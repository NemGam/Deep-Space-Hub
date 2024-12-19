import { useEffect, useState } from "react";
import AuthContext from "./AuthContext"; // Import the context
import databaseService from "../services/database-service";
import { useFetchProfile } from "../hooks/useFetchProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const queryClient = useQueryClient();


    const { data: authProfile, isLoading: authIsLoading, error: authError } = useFetchProfile(session?.user.user_metadata.username);

    const updateProfilePicture = (userId, newUrl) => {
        console.log("Update pfp: " + userId + " " + newUrl);
        mutation.mutate({userId, newUrl});
    }

    //Mutation for updating the user pfp
    const mutation = useMutation(
        {
            mutationFn: databaseService.changeProfilePicture,
            onMutate: async ({ userId, newUrl }) => {
                console.log("onMutate: " + newUrl);
                await queryClient.cancelQueries(['profile', session.user.user_metadata.username]);

                const previousProfile = queryClient.getQueryData(['profile', session.user.user_metadata.username]);

                //Optimistic update
                queryClient.setQueryData(['profile', session.user.user_metadata.username], (old) => ({
                    ...old,
                    profile_picture: newUrl,
                }));

                return { previousProfile };
            },
            onError: (err, variables, context) => {
                // Rollback to the previous profile on error
                queryClient.setQueryData(['profile', session.user.user_metadata.username], context.previousProfile);
            },
            onSettled: () => {
                // Refetch the profile after mutation
                queryClient.invalidateQueries(['profile', session.user.user_metadata.username]);
            },
        })

    useEffect(() => {
        const { data: authListener } = globalThis._supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state change:', event);

                console.log('I am: ', session?.user);
                setSession(session);
            }
        );

        //Cleanup on unmount 
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    return <AuthContext.Provider value={{
        user: session?.user ?? null,
        session,
        authProfile: authProfile?.data ?? null,
        authIsLoading,
        authError,
        updateProfilePicture: updateProfilePicture,
    }}
    >
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
