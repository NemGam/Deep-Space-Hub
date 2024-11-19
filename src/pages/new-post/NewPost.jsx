import { useState } from "react";
import styles from "./NewPost.module.css"
import databaseService from "../../services/database-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NewPost() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {user} = useAuth();

    const createPost = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await databaseService.createPost(title, content, imageUrl, user.id);
        if (res) navigate("/");
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.post}>
                <h1>Create a new Post</h1>
                <form className={styles.form} onSubmit={createPost}>
                    <div>
                        <div className={styles.titleInput}>
                            <label htmlFor="title">Title</label><br />
                            <input id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                placeholder="Post title..."
                                required />
                        </div>

                        <div className={styles.contentInput}>
                            <label htmlFor="content">Content</label><br />
                            <textarea id="content"
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                name="content"
                                placeholder="Post content... (Optional)" />
                        </div>

                        <div className={styles.imgUrlInput}>
                            <label htmlFor="imgUrl">Image URL</label><br />
                            <input id="imgUrl"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                name="imageUrl"
                                placeholder="Image URL... (Optional)" />
                        </div>
                    </div>


                    <button className={styles.postButton}>Post</button>
                </form>


            </div>
        </div>
    );
}