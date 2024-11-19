import { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import styles from "./CommentsFeed.module.css"
import databaseService from "../../services/database-service";

export default function CommentsFeed({ postId }) {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        const fetchComments = async () => {
            const res = await databaseService.getComments(postId);

            setComments(res);
        }

        fetchComments();
    }, [postId]);

    return (
        <div className={styles.commentsFeed}>
            {
                comments?.map((comment, ind) => {
                    return <Comment key={comment.id} 
                                    content={comment.content} 
                                    author={comment.user || "Anonymous"} 
                                    postedAt={comment.created_at}/>
                })
            }

        </div>

    );
}