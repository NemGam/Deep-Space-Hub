import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({onSearchChange}){

    return(
        <header className={styles.header}>
            <div className={styles.content}> 
                <Link to="/" className={styles.logo}><h1>DeepSpaceHub 🚀</h1></Link>
                <div className={styles.profile}></div>
            </div>
            
        </header>
    );
}