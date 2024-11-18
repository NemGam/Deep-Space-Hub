import { useParams } from "react-router-dom";
import styles from "./FullPost.module.css";
import { useEffect, useState } from "react";
import GravityCounter from "../../components/gravity-counter/GravityCounter";
import timeService from "../../services/time-service";
import CommentsFeed from "../../components/comments-feed/CommentsFeed";

export default function FullPost() {
    const { postId } = useParams();
    const [id, setId] = useState(postId);
    const [post, setPost] = useState();
    const [gravity, setGravity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [showSubmitCommentBtn, setShowSubmitCommentBtn] = useState(false);

    const updateGravity = async (change) => {

        if (change === 1)
        {
            //Push to the db
            setGravity(gravity + 1);
            post.gravity = gravity + 1;
        }
        else if (change === -1)
        {
            setGravity(gravity - 1);
        }
    }

    useEffect(() => {
        const getPost = async () => {
            //fetch it
            const res = {
                title: "Why do we have tides?",
                id: "first-of-its-kind",
                content: "How does it even make sense?",
                gravity: 5,
                postedAt: 1731894131
            };
            setIsLoading(false);
            setPost(res.id === postId && res);
            setGravity(res.gravity);
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
                                <h3 className="less-important">Posted {timeService.convertRelative(post?.postedAt)}</h3>
                            </div>
                            <div className={styles.content}>
                                {/* Show content */}
                                <p>{post.content}</p>
                                <GravityCounter gravity={gravity} onUpvote={() => updateGravity(1)} />
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