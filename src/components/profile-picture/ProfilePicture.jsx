import styles from "./ProfilePicture.module.css";

export default function ProfilePicture({ children, src, isClickable, onClick }) {

    const fallback = (e) => {
        e.target.src = "/noimg.jpg";
    }

    return (
        <div className={styles.profilePicture}>
            <img src={src} onError={fallback} />
            {isClickable &&
                <button onClick={onClick}>
                    {children}
                </button>}

        </div>
    );
}