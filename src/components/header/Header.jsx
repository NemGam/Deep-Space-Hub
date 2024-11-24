import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../profile-picture/ProfilePicture";

export default function Header() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    console.log(profile);

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link to="/" className={styles.logo}><h1>DeepSpaceHub 🚀</h1></Link>
                {profile &&
                    <div className={styles.profile}>
                        <ProfilePicture src={profile?.profile_picture} isClickable onClick={() => navigate(`/users/${profile?.username}`)}/>
                    </div>
                    
                }
                {!profile && <Link to={"/auth"}><button>Sign Up</button></Link>}
            </div>

        </header>
    );
}