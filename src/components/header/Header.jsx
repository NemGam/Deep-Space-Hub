import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function Header(){
    const {profile} = useAuth();
    console.log(profile);

    return(
        <header className={styles.header}>
            <div className={styles.content}> 
                <Link to="/" className={styles.logo}><h1>DeepSpaceHub 🚀</h1></Link>
                {profile && <Link to={`/users/${profile?.username}`}><img src={profile.profile_picture} className={styles.profile}></img></Link>}
                {!profile && <Link to={"/auth"}><button>Sign Up</button></Link>}
            </div>
            
        </header>
    );
}