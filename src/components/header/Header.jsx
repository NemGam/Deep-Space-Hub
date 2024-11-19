import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useAuth } from "../../hooks/useAuth";

export default function Header(){
    const {user, session} = useAuth();
    console.log(user);

    return(
        <header className={styles.header}>
            <div className={styles.content}> 
                <Link to="/" className={styles.logo}><h1>DeepSpaceHub 🚀</h1></Link>
                {user && <Link to={`/users/${125}`}><div className={styles.profile}></div></Link>}
                {!user && <Link to={"/auth"}><button>Sign Up</button></Link>}
            </div>
            
        </header>
    );
}