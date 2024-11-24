import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database-service";
import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import PopupWindow from "../../components/popup-window/PopupWindow";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "../../components/profile-picture/ProfilePicture";

export default function ProfilePage() {
    const { username } = useParams();
    const { user, profile, setProfile } = useAuth();
    const [userProfile, setUserProfile] = useState((profile && (username === profile.username)) ? profile : null);
    const [profileOwner, setProfileOwner] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [newPfP, setNewPfp] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        setProfileOwner(profile && (profile.username === username));
    }, [username, profile])

    useEffect(() => {
        console.log("Looking at user");
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
        setUserProfile({ ...profile, profile_picture: newPfP });
        setProfile({ ...profile, profile_picture: newPfP });
        localStorage.setItem("profile", JSON.stringify({ ...profile, profile_picture: newPfP }));
        setNewPfp("");
        setIsPopupVisible(false);
        console.log("Updated!");
    }

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>
                {!isLoading &&
                    <>
                        <div style={{width: "180px", height: "180px"}}>
                            <ProfilePicture src={userProfile.profile_picture} 
                                            isClickable={profileOwner} 
                                            onClick={() => setIsPopupVisible(true)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </ProfilePicture>
                        </div>
                        
                        
                        <h1>{userProfile.username}</h1>
                    </>
                }
                <PopupWindow isVisible={isPopupVisible}>
                    <div style={{ width: "400px", height: "250px", textAlign: "center", display: "flex", flexDirection:"column", alignItems: "center" }}>
                        <h2 style={{marginTop: 0}}>Enter new image URL</h2>
                            <input type="url" value={newPfP} onChange={(e) => setNewPfp(e.target.value)} style={{maxWidth: "230px"}}/>
                        <div style={{marginTop: "auto"}}>
                            <button onClick={handleUpdateProfilePicture} style={{margin: "0px 10px"}}>Update</button>
                            <button onClick={() => setIsPopupVisible(false)} style={{margin: "0px 10px"}}>Cancel</button>
                        </div>
                    </div>
                </PopupWindow>
                {profileOwner && <button onClick={handleLogOut} className={styles.logoutBtn}>Log out</button>}
            </div>
        </div>
    );
}


