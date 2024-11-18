import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header(){

    return(
        <header className={styles.header}>
            <div className={styles.content}> 
                <Link to="/"><h1>DeepSpaceHub 🚀</h1></Link>
            </div>
            
        </header>
    );
}