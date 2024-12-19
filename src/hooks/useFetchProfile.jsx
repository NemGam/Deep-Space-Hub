import { useQuery } from "@tanstack/react-query"
import databaseService from "../services/database-service"

export const useFetchProfile = (username) => {
    return useQuery({
        enabled: !!username,
        queryKey: ['profile', username], 
        queryFn: () => databaseService.fetchProfile(username),
        staleTime: 1000 * 60 * 30, //30 minutes
        cacheTime: 1000 * 60 * 60, //1 hour
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
}