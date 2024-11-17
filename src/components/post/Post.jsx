import styles from "./Post.module.css";


export default function Post({title, content, attachments, id, postedAt}){
    

    return(
        <a className={styles.post} href={`/post/${id}`}>
            <h2>{title}</h2>
            <h3>{attachments? attachments : content}</h3>
        </a>
    );
}