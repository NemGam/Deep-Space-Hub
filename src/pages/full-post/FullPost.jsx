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
import { useAuth } from "../../hooks/useAuth";

export default function FullPost() {
    const { postId } = useParams();
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const { post, setPost } = usePost();
    const [gravity, setGravity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isGravityChangeLoading, setIsGravityChangeLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [showSubmitCommentBtn, setShowSubmitCommentBtn] = useState(false);
    const [isPostOwner, setIsPostOwner] = useState();

    const updateGravity = async (change) => {

        setIsGravityChangeLoading(true);
        if (change === 1)
        {
            //Push to the db
            await databaseService.updateGravity(postId, gravity + 1);
            setGravity(gravity + 1);
        }
        else
        {
            //Not used for now
            setGravity(gravity - 1);
        }

        setIsGravityChangeLoading(false);
    }

    useEffect(() => {
        const getPost = async () => {
            console.log("Fetching the post");
            const res = await databaseService.getFullPost(postId);
            setIsLoading(false);
            setPost(res);
            setGravity(res.gravity);
            setIsGravityChangeLoading(false);
            setIsPostOwner(profile && (post?.username == profile?.username));
        }

        getPost();
    }, [postId]);

    //Allow the modification if the user is author
    useEffect(() => {
        setIsPostOwner(profile && (post?.username == profile?.username));
    }, [profile, post])

    const enableSubmitCommentButton = (state) => {
        setShowSubmitCommentBtn(state);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (newComment.length == 0) return;

        await databaseService.createComment(postId, newComment, user.id);
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

                {post && <><div className={styles.userProfile}>
                    <img className={styles.profilePicture} src={`${post.profile_picture}` || null} />
                    <h3 className="less-important">{post?.username || "Anonymous"}</h3>
                </div>

                    <div className={styles.post}>
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
                                    {isPostOwner && <div className={styles.manipulateButtons}>
                                        <Link to="../edit" relative="path"><button><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <button onClick={handleDeletePost}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.comments}>
                            {user && <div>
                                <textarea type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onFocus={() => enableSubmitCommentButton(true)}
                                    onBlur={() => enableSubmitCommentButton(false)} />
                                {showSubmitCommentBtn && <button className={styles.submitBtn} onMouseDown={handleSubmitComment}>Submit</button>}
                                {showSubmitCommentBtn && <button className={styles.cancelBtn} onMouseDown={handleCancelComment}>Cancel</button>}
                            </div>}
                            <CommentsFeed postId={postId} />
                        </div>
                    </div>
                </>
                }

            </div>

        </>


    );
}