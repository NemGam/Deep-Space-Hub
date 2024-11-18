import { useParams } from "react-router-dom";
import styles from "./FullPost.module.css";
import { useEffect, useState } from "react";
import GravityCounter from "../../components/gravity-counter/GravityCounter";
import timeService from "../../services/time-service";
import CommentsFeed from "../../components/comments-feed/CommentsFeed";
import databaseService from "../../services/database-service";

export default function FullPost() {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [gravity, setGravity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isGravityChangeLoading, setIsGravityChangeLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [showSubmitCommentBtn, setShowSubmitCommentBtn] = useState(false);

    const updateGravity = async (change) => {

        setIsGravityChangeLoading(true);
        if (change === 1)
        {
            //Push to the db
            console.log(gravity);
            await databaseService.updateGravity(postId, gravity + 1);
            setGravity(gravity + 1);
        }
        else
        {
            setGravity(gravity - 1);
        }

        setIsGravityChangeLoading(false);
    }

    useEffect(() => {
        const getPost = async () => {
            //fetch it
            const res = await databaseService.getFullPost(postId);
            // const res = {
            //     title: "Why do we have tides?",
            //     id: "first-of-its-kind",
            //     content: "How does it even make sense?",
            //     gravity: 5,
            //     postedAt: "2024-11-18T07:35:42.529342+00:00"
            // };
            setIsLoading(false);
            setPost(res[0]);
            setGravity(res[0].gravity);
            setIsGravityChangeLoading(false);
        }

        getPost();
    }, [postId]);

    const enableSubmitCommentButton = (state) => {
        setShowSubmitCommentBtn(state);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (newComment.length == 0) return;
        //Post to DB
        
        //Clear
        setNewComment("");
    }

    const handleCancelComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setNewComment("");
    }

    //Load comments

    return (
        <>
            <div className={styles.postWrapper}>

                <div className={styles.userProfile}>
                    <img className={styles.profilePicture}></img>
                    <h3 className="less-important">{post?.author || "Anonymous"}</h3>
                </div>
                {
                    post && <div className={styles.post}>
                        <div className={styles.mainPart}>
                            <div className={styles.title}>
                                {/* Show title and author */}
                                <h1>{post.title}</h1>
                                <h3 className="less-important">Posted {timeService.convertRelative(post?.created_at)}</h3>
                            </div>
                            <div className={styles.content}>
                                {/* Show content */}
                                <p>{post.content}</p>
                                <img src={post.img_url} className={styles.image} />
                                <GravityCounter gravity={gravity} isLoading={isGravityChangeLoading} onUpvote={() => updateGravity(1)} />
                            </div>
                        </div>

                        <div className={styles.comments}>
                            <div>
                                <textarea type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onFocus={() => enableSubmitCommentButton(true)}
                                    onBlur={() => enableSubmitCommentButton(false)} />
                                {showSubmitCommentBtn && <button className={styles.submitBtn} onMouseDown={handleSubmitComment}>Submit</button>}
                                {showSubmitCommentBtn && <button className={styles.cancelBtn} onMouseDown={handleCancelComment}>Cancel</button>}
                            </div>
                            <CommentsFeed />
                        </div>
                    </div>
                }


            </div>

        </>


    );
}