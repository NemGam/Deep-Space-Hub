import { Link } from "react-router-dom";
import Post from "../../components/post/Post";
import styles from "./Feed.module.css";
import { useEffect, useState } from "react";

export default function Feed() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const getPosts = async() => {
            //Fetch posts
            const res = [
                {
                    title: "Why do we have tides?",
                    id: "first-of-its-kind",
                    content: "How does it even make sense?",
                    gravity: 5
                },
                {
                    title: "Hello World 2!",
                    id: "second-of-its-kind",
                    content: "egijwrgiowrjg iowjg oijwrgoijweiog jweig weoig jjwe gjweig owejg iowej gioweg jweiog jweoigj weiogj weg wrgyuiolkijuhgf engjoergn erogneroirngoie goinrogneroignero gnegoirnoiroiren goern eoirng oreing oernig eriog neroig neriog neroi ngreoin  oiengoier  niorege rgojn eroinre wnoer wein weoin noi ewiong "
                },
                {
                    title: "Hello World 2!",
                    id: "secondt34yu6uy-of-its-kind"
                },
                {
                    title: "Hello World 2!",
                    id: "seco42tet34tnd-of-its-kind"
                },
                {
                    title: "Hello World 2!",
                    id: "second-of-itjhgfds-kind"
                },
            ];

            setPosts(res);
        }
        
        getPosts();
        
    }, [])


    const handleGravityChange = async(id, change) =>{
        //Post the change to db
        console.log(id);
        posts.find((post) => post.id === id).gravity += change;
    }


    return (
        <div className={styles.feedWrapper}>
            <Link to="/createPost" className={styles.addPost}>+</Link>
            <div className={styles.feed}>
                {posts?.map((el, ind) => {
                    return <Post key={el.id} 
                                title={el.title} 
                                id={el.id} 
                                gravity={el.gravity}
                                postedAt={el.postedAt}/>;
                })}
            </div>
        </div>


    );
}