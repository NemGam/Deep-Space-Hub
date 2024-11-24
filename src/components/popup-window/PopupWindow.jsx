import styles from "./PopupWindow.module.css";

export default function PopupWindow({ children, isVisible }) {


    return (
        <>
            {
                isVisible &&
                <div className={styles.darkener}>
                    <div className={styles.popupWindow}>
                        {children}
                    </div>

                </div>

            }
        </>
    );
}