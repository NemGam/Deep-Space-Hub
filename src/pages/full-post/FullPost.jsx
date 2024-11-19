import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./FullPost.module.css";
import { useEffect, useState } from "react";
import GravityCounter from "../../components/gravity-counter/GravityCounter";
import timeService from "../../services/time-service";
import CommentsFeed from "../../components/comments-feed/CommentsFeed";
import databaseService from "../../services/database-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../../hooks/usePost";

export default function FullPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const {post, setPost} = usePost();
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
        await databaseService.createComment(postId, newComment);
        //Clear
        setNewComment("");


    }

    const handleCancelComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setNewComment("");
    }

    const handleDeletePost = async () => {
        await databaseService.deletePost(postId);
        navigate("/");
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
                                <div>
                                    <GravityCounter gravity={gravity} isLoading={isGravityChangeLoading} onUpvote={() => updateGravity(1)} />
                                    <div className={styles.manipulateButtons}>
                                        <Link to="../edit" relative="path"><button><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <button onClick={handleDeletePost}><FontAwesomeIcon icon={faTrash}/></button>
                                    </div>
                                </div>
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
                            <CommentsFeed postId={postId} />
                        </div>
                    </div>
                }

            </div>

        </>


    );
}