import { Route, useParams, useRoutes } from 'react-router-dom';
import styles from './App.module.css'
import Feed from './pages/feed/Feed'
import Header from './components/header/Header';
import FullPost from './pages/full-post/FullPost';
import NewPost from './pages/new-post/NewPost';

function App() {
    

    const postLoader = async ({params}) => {
        const post = posts.find((item) => item.id === params.postId);

        if (!post){
            return null;
        }
        else{
            return post;
        }
    }

    const routes = useRoutes([
        {
            path: "/",
            element: <Feed />,
        },
        {
            path: "/:postId/comments",
            element: <FullPost />
        },
        {
            path: "/createPost",
            element: <NewPost />
        }
    ]);

    return (
        <>
            <div className={styles.app}>
                {routes}
            </div>

        </>
    )
}

export default App
