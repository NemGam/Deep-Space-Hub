import styles from "./Header.module.css";

export default function Header(){

    return(
        <header className={styles.header}>
            <div className={styles.content}> 
                <h1>DeepSpaceHub 🚀</h1>
            </div>
            
        </header>
    );
}