import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import GravityCounter from "../gravity-counter/GravityCounter";
import timeService from "../../services/time-service";


export default function Post({ author, title, id, postedAt, gravity }) {

    return (
        <Link to={`/${id}/comments`} className={styles.post}>
            <h2>{title}</h2>
            <h5 className="less-important">{`Posted ${timeService.convertRelative(postedAt)} by ${author || 'Anonymous'}`}</h5>
            {/* <p>{attachments}</p> */}
            <div className={styles.gravityCounter}>
                <GravityCounter gravity={gravity} showDownvote={false} showUpvote={false} />
            </div>

        </Link>
    );
}