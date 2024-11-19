import timeService from "../../services/time-service";
import styles from "./Comment.module.css"

export default function Comment({ author, pfp, content, postedAt }) {

    return (
        <div className={styles.comment}>
            
            <div className={styles.header}>
            <img src={pfp} />
                {/* <span>{`${author} `}</span> */}
                <span className={`less-important ${styles.postTime}`}>{timeService.convertRelative(postedAt)}</span>
            </div>
            <p>{content}</p>

        </div>

    );
}