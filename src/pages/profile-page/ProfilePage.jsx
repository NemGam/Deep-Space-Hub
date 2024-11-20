import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database-service";
import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
    const { username } = useParams();
    const { user, profile, setProfile } = useAuth();
    const [userProfile, setUserProfile] = useState((profile && (username === profile.username)) ? profile : null);
    const [profileOwner, setProfileOwner] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [newPfP, setNewPfp] = useState("");

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

    const handleUpdateProfilePicture = async () => {
        if (newPfP.length == 0) return;
        await databaseService.changeProfilePicture(user.id, newPfP);
        //TODO: FIX THIS MESS!
        setUserProfile({...profile, profile_picture: newPfP});
        setProfile({...profile, profile_picture: newPfP});
        localStorage.setItem("profile", JSON.stringify({...profile, profile_picture: newPfP}));
        console.log("Updated!");
    }

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>
                { !isLoading &&
                    <>
                        <img className={styles.profilePicture} src={userProfile.profile_picture}></img>
                        {
                            profileOwner && 
                            <div className={styles.updatePfp}>
                                <input type="url" value={newPfP} onChange={(e) => setNewPfp(e.target.value)} />
                                <button onClick={handleUpdateProfilePicture}>Update PfP</button>
                            </div>
                        }
                        
                        <h1>{userProfile.username}</h1>
                    </>

                }

                {profileOwner && <button onClick={handleLogOut}>Log out</button>}
            </div>
        </div>
    );
}


