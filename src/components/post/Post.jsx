import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import GravityCounter from "../gravity-counter/GravityCounter";
import { useEffect } from "react";


export default function Post({ author, title, id, postedAt, gravity }) {

    return (
        <Link to={`/${id}/comments`} className={styles.post}>
            <h2>{title}</h2>
            <h5 className="less-important">{`by ${author || 'Anonymous'}`}</h5>
            {/* <p>{attachments}</p> */}
            <div className={styles.gravityCounter}>
                <GravityCounter gravity={gravity} showDownvote={false} showUpvote={false} />
            </div>

        </Link>
    );
}