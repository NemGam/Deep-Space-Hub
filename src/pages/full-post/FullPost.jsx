import { useLoaderData, useParams } from "react-router-dom";
import styles from "./FullPost.module.css";
import { useEffect, useState } from "react";

export default function FullPost() {
    const { postId } = useParams();
    const [id, setId] = useState(postId);
    const [post, setPost] = useState();

    useEffect(() => {
        const getPost = async () => {
            //fetch it
            const res=  {
                title: "Why do we have tides?",
                id: "first-of-its-kind",
                content: "How does it even make sense?",
                gravity: 5
            };
            setPost(res.id === postId && res);
        }

        getPost();
    }, [postId]);


    //Load comments

    return (
        <div className={styles.postWrapper}>
            {post && <div className={styles.post}>
                <div className={styles.title}>
                    {/* Show title and author */}
                    <h1>{post.title}</h1>
                    <span className={styles.user}>
                        <img className={styles.profilePicture}></img>
                        <h3 className="less-important">{post.author || "Anonymous"}</h3>
                    </span>
                </div>
                <div className={styles.content}>
                    {/* Show content */}
                    <p>{post.content}</p>
                </div>
                <div className={styles.comments}>
                    {/* Show comments */}
                </div>

            </div>
}
        </div>

    );
}