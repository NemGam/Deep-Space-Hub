import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database-service";
import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import PopupWindow from "../../components/popup-window/PopupWindow";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "../../components/profile-picture/ProfilePicture";
import { useFetchProfile } from "../../hooks/useFetchProfile";

export default function ProfilePage() {
    const { username } = useParams();
    const { user, authProfile, authIsLoading, updateProfilePicture } = useAuth();
    const {data: displayedUser, isLoading: isUserLoading, error: displayedUserError, isFetching} = useFetchProfile(username);
    
    const [isProfileOwner, setIsProfileOwner] = useState();
    const navigate = useNavigate();
    const [newPfP, setNewPfp] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    
    
    useEffect(() => {
        setIsProfileOwner(authProfile && (authProfile.username === username));
        console.log("Looking at ", displayedUser?.data);
    }, [username, displayedUser, authProfile])
    
    if (isFetching){
        console.log("FETCHING THE USER");
    }

    if (displayedUserError) {
        console.error(displayedUserError);
        return;
    }
    if (isUserLoading || authIsLoading){
        console.log("Loading");
        return;
    }
    


    const handleLogOut = async () => {
        await databaseService.logOut();
        localStorage.clear();
        navigate("/auth");
        window.location.reload();
    }

    const handleUpdateProfilePicture = async () => {
        if (!isProfileOwner) return;

        if (newPfP.length == 0) return;
        
        //Update pfp
        await updateProfilePicture(user.id, newPfP);

        setIsPopupVisible(false);
    }

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>
                {!isUserLoading &&
                    <>
                        <div style={{width: "180px", height: "180px"}}>
                            <ProfilePicture src={displayedUser.data.profile_picture} 
                                            isClickable={isProfileOwner} 
                                            onClick={() => setIsPopupVisible(true)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </ProfilePicture>
                        </div>
                        
                        
                        <h1>{displayedUser.data.username}</h1>
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
                {isProfileOwner && <button onClick={handleLogOut} className={styles.logoutBtn}>Log out</button>}
            </div>
        </div>
    );
}


