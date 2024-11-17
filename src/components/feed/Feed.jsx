import Post from "../post/Post";
import styles from "./Feed.module.css";

export default function Feed({ posts }) {


    return (
        <div className={styles.feedWrapper}>
            <div className={styles.feed}>
                {posts?.map((el, ind) => {
                    return <Post key={el.id} title={el.title} id={el.id} content={el.content}/>;
                })}
            </div>
        </div>


    );
}