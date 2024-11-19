import { useParams } from "react-router-dom";
import databaseService from "../../services/database-service";
import { useEffect, useState } from "react";


export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState("");
    const { username } = useParams();

    

    useEffect(() => {
        const getProfileData = async () => {
            const { data, error } = await databaseService.fetchProfile(username);
            if (!data) console.log(error);
            console.log(data);
            setUserProfile(data);
        };
        
        getProfileData();
    }, [username]);



    return (
        <h1>{userProfile.username}</h1>
    );
}


