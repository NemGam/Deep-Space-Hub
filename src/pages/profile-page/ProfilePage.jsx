import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database-service";
import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
    const { username } = useParams();
    const { profile } = useAuth();
    const [userProfile, setUserProfile] = useState((profile && (username === profile.username)) ? profile : null);
    const [profileOwner, setProfileOwner] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setProfileOwner(profile && (profile.username === username));
    }, [username, profile])

    useEffect(() => {
        if (userProfile)
        {
            setIsLoading(false);
            return;
        }

        console.log("Fetching");
        const getProfileData = async () => {
            setIsLoading(true);
            const { data, error } = await databaseService.fetchProfile(username);
            if (!data) console.log(error);
            console.log(data);
            setUserProfile(data);
            setIsLoading(false);
        };

        getProfileData();
    }, [username]);

    const handleLogOut = async () => {
        await databaseService.logOut();
        localStorage.clear();
        navigate("/auth");
        window.location.reload();
    }

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>
                { !isLoading &&
                    <>
                        <img className={styles.profilePicture} src={userProfile.profile_picture}></img>
                        <h1>{userProfile.username}</h1>
                    </>

                }

                {profileOwner && <button onClick={handleLogOut}>Log out</button>}
            </div>
        </div>
    );
}


