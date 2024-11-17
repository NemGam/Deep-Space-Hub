import styles from "./GravityCounter.module.css"

// A.k.a. karma
export default function GravityCounter({gravity, showUpvote = true, onUpvote, showDownvote = true, onDownvote}){

    const handleGravityChange = (e, change) =>{
        e.preventDefault();
        e.stopPropagation();

        if (change == 1) onUpvote();
        else if (change == -1) onDownvote();
    }

    return(
        <div className={styles.counter}>
            {showUpvote && <button onClick={(e) => handleGravityChange(e, 1)}>&uarr;</button>}
            <span>{`${gravity || 0} gravity`}</span>
            {showDownvote && <button onClick={(e) => handleGravityChange(e, -1)}>&darr;</button>}
        </div>
    );
}