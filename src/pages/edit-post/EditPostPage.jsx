import { usePost } from "../../hooks/usePost";
import { useState } from "react";
import databaseService from "../../services/database-service";
import { useNavigate } from "react-router-dom";
import styles from "./EditPostPage.module.css";

export default function EditPostPage() {
    const navigate = useNavigate()
    const { post, setPost } = usePost();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [imageUrl, setImageUrl] = useState(post.img_url);

    const updatePost = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await databaseService.updatePost(post.post_id, title, content, imageUrl);
        navigate(`/${post.post_id}/comments`);
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.post}>
                <h1>Edit Post</h1>
                <form className={styles.form} onSubmit={updatePost}>
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

                    <div>
                        <button className={styles.button} type="submit">Update</button>
                        <button className={styles.button} type="button" onClick={() => navigate(`/${post.id}/comments`)}>Cancel</button>
                    </div>

                </form>


            </div>
        </div>
    );
}