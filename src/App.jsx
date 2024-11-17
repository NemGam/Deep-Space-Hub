import styles from './App.module.css'
import Feed from './components/feed/Feed'

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

    return (
        <>
            <div className={styles.app}>
                <Feed posts={posts} />
            </div>
            
        </>
    )
}

export default App
