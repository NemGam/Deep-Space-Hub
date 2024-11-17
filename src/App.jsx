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
