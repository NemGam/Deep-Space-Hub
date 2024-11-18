import { useRoutes } from 'react-router-dom';
import styles from './App.module.css'
import FeedPage from './pages/feed/FeedPage'
import FullPost from './pages/full-post/FullPost';
import NewPost from './pages/new-post/NewPost';
import EditPostPage from './pages/edit-post/EditPostPage';
import { PostProvider } from './contexts/PostContextProvider';

function App() {

    const routes = useRoutes([
        {
            path: "/",
            element: <FeedPage />,
        },
        {
            path: "/:postId/comments",
            element: <FullPost />
        },
        {
            path: "/:postId/edit",
            element: <EditPostPage />
        },
        {
            path: "/createPost",
            element: <NewPost />
        }
    ]);

    return (
        <>
            <PostProvider>
                <div className={styles.app}>
                    {routes}
                </div>
            </PostProvider>
        </>
    )
}

export default App
