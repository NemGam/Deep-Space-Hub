import styles from "./ProfilePicture.module.css";

export default function ProfilePicture({ children, src, isClickable, onClick }) {

    //In case of an error, fallback to the default image
    const fallback = (e) => {
        e.target.src = "/noimg.jpg";
    }

    return (
        <div className={styles.profilePicture}>
            <img src={src || "/noimg.jpg"} onError={fallback} />
            {isClickable &&
                <button onClick={onClick}>
                    {children}
                </button>}
        </div>
    );
}