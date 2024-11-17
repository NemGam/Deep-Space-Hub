import { Link } from "react-router-dom";
import styles from "./Post.module.css";


export default function Post({author, title, content, attachments, id, postedAt}){
    

    return(
        <Link to={`/${id}/comments`} className={styles.post}>
            <h2>{title}</h2>
            <h5>{`by ${author || 'Anonymous'}`}</h5>
            <p>{attachments || content}</p>
        </Link>
    );
}