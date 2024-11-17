import { Link } from "react-router-dom";
import styles from "./Post.module.css";


export default function Post({title, content, attachments, id, postedAt}){
    

    return(
        <Link to={`/${id}/comments`} className={styles.post}>
            <h2>{title}</h2>
            <h3>{attachments? attachments : content}</h3>
        </Link>
    );
}