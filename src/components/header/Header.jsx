import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../profile-picture/ProfilePicture";

export default function Header() {
    const { authProfile } = useAuth();
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link to="/" className={styles.logo}><h1>DeepSpaceHub 🚀</h1></Link>
                {authProfile &&
                    <div className={styles.profile}>
                        <ProfilePicture src={authProfile?.profile_picture} isClickable onClick={() => navigate(`/users/${authProfile?.username}`)}/>
                    </div>
                    
                }
                {!authProfile && <Link to={"/auth"}><button>Sign Up</button></Link>}
            </div>

        </header>
    );
}