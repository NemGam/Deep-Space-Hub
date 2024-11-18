import { Link } from "react-router-dom";
import Post from "../../components/post/Post";
import styles from "./Feed.module.css";
import { useEffect, useState } from "react";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("time");

    const sortPosts = (arr) => {
        const temp = [...arr];

        switch (sort)
        {
            case "gravity":
                temp.sort((a, b) => b.gravity - a.gravity);
                break;
            case "time":
                temp.sort((a, b) => b.postedAt - a.postedAt);
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
            const res = [
                {
                    title: "Why do we have tides?",
                    id: "first-of-its-kind",
                    content: "How does it even make sense?",
                    gravity: 5,
                    postedAt: 1731893231
                },
                {
                    title: "Hello World 2!",
                    id: "second-of-its-kind",
                    content: "egijwrgiowrjg iowjg oijwrgoijweiog jweig weoig jjwe gjweig owejg iowej gioweg jweiog jweoigj weiogj weg wrgyuiolkijuhgf engjoergn erogneroirngoie goinrogneroignero gnegoirnoiroiren goern eoirng oreing oernig eriog neroig neriog neroi ngreoin  oiengoier  niorege rgojn eroinre wnoer wein weoin noi ewiong ",
                    gravity: 0,
                    postedAt: 1731899211
                },
                {
                    title: "Hello World 2!",
                    id: "secondt34yu6uy-of-its-kind",
                    gravity: 15,
                    postedAt: 1731892231
                },
                {
                    title: "Hello World 2!",
                    id: "seco42tet34tnd-of-its-kind",
                    gravity: 0,
                    postedAt: 1731893731
                },
                {
                    title: "Hello World 2!",
                    id: "second-of-itjhgfds-kind",
                    gravity: 0,
                    postedAt: 1731893291
                },
            ];
            
            

            setPosts(sortPosts(res));
        }

        getPosts();

    }, [])


    return (
        <div className={styles.feedWrapper}>
            <Link to="/createPost" className={styles.addPost}>+</Link>
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
                {posts?.map((el, ind) => {
                    if (!el.title.toLowerCase().startsWith(search.toLowerCase())) return;
                    return <Post key={el.id}
                        title={el.title}
                        id={el.id}
                        gravity={el.gravity}
                        postedAt={el.postedAt} />;
                })}
            </div>
            <div className={styles.featuresVote}>
                <h4>Vote for new features!</h4>
                <div>

                </div>

            </div>
        </div>


    );
}