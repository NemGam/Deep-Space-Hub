import { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import styles from "./CommentsFeed.module.css"
import databaseService from "../../services/database-service";

export default function CommentsFeed({ postId }) {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        const fetchComments = async () => {
            //Fetch

            // const res = [
            //     {
            //         user: "Anonymous",
            //         postedAt: Date.now(),
            //         content: "Hello, this is my first very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long comment!",
            //         postId: postId,
            //         id: 124092354683
            //     },
            //     {
            //         user: "Anonymous",
            //         postedAt: Date.now() + 1,
            //         content: "Hello, this is my second comment!",
            //         postId: postId,
            //         id: 1212332682
            //     },
            //     {
            //         user: "Anonymous",
            //         postedAt: Date.now() + 1,
            //         content: "Hello, this is my second comment!",
            //         postId: postId,
            //         id: 124065332682
            //     },
            //     {
            //         user: "Anonymous",
            //         postedAt: Date.now() + 1,
            //         content: "Hello, this is my second comment!",
            //         postId: postId,
            //         id: 12409212432682
            //     },
            //     {
            //         user: "Anonymous",
            //         postedAt: Date.now() + 1,
            //         content: "Hello, this is my second comment!",
            //         postId: postId,
            //         id: 1240982
            //     },
            // ]

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