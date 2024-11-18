import { useState } from "react";
import PostContext from "./PostContext"; // Import the context

export function PostProvider({ children }) {
    const [post, setPost] = useState(null);

    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    );
}
