import { Link } from "react-router-dom";
import Post from "../../components/post/Post";
import styles from "./FeedPage.module.css";
import { useEffect, useState } from "react";
import databaseService from "../../services/database-service";
import { useAuth } from "../../hooks/useAuth";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("time");
    const {user} = useAuth();

    const sortPosts = (arr) => {
        const temp = [...arr];

        switch (sort)
        {
            case "gravity":
                temp.sort((a, b) => b.gravity - a.gravity);
                break;
            case "time":
                temp.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case "name":
                temp.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }
        return temp;
    }

    //Sort
    useEffect(() => {
        setPosts(sortPosts(posts));

    }, [sort])


    useEffect(() => {

        const getPosts = async () => {
            //Fetch posts
            const res = await databaseService.getPosts();
            setPosts(sortPosts(res));
        }

        getPosts();

    }, [])


    return (
        <div className={styles.feedWrapper}>
            {user && <Link to="/createPost" className={styles.addPost}>+</Link>}
            <div className={styles.filters}>
                <h4>Filters</h4>
                <div>
                    <label htmlFor="search-filter">Search</label>
                    <input value={search} id="search-filter" onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <div>
                    <label>Order by:</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="time">New</option>
                        <option value="gravity">Gravity</option>
                        <option value="name">Title</option>
                    </select>
                </div>

            </div>
            <div className={styles.feed}>
                {posts.length > 0 && posts?.map((el, ind) => {
                    if (!el.title.toLowerCase().startsWith(search.toLowerCase())) return;

                    return <Post key={el.id}
                        title={el.title}
                        id={el.id}
                        gravity={el.gravity}
                        created_at={el.created_at} />;
                }) || "There are no posts. Be first to post!"}
            </div>
            <div className={styles.featuresVote}>
                <h4>Vote for new features!</h4>
                <div>

                </div>

            </div>
        </div>


    );
}