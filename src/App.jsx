import { Route, useRoutes } from 'react-router-dom';
import styles from './App.module.css'
import Feed from './components/feed/Feed'
import Header from './components/header/Header';

function App() {
    const posts = [
        {
            title: "Hello World!",
            id: "first-of-its-kind",
            content: "This is my first post!"
        },
        {
            title: "Hello World 2!",
            id: "second-of-its-kind"
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

    const routes = useRoutes([
        {
            path: "/",
            element: <Feed posts={posts} />,
        },
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
