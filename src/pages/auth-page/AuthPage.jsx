import { useEffect, useState } from "react";
import styles from "./AuthPage.module.css";
import databaseService from "../../services/database-service";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("register");

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/");
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mode === "register")
        {
            const data = await databaseService.signUp(userName, email, password);
            if (data) navigate("/");
            console.log(data);
        }
        else
        {
            const data = await databaseService.logIn(email, password);
        }


    }


    return (
        <div className={styles.authPage}>
            <div className={styles.postWrapper}>
                <div className={styles.post}>
                    <h1>{mode === "register" ? "Register" : "Log In"}</h1>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <div>
                            {
                                mode === "register" &&
                                <div className={styles.usernameInput}>
                                    <label htmlFor="username">Username</label>
                                    <input id="username"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required />
                                </div>
                            }

                            <div className={styles.emailInput}>
                                <label htmlFor="email">Email</label>
                                <input id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    required />
                            </div>



                            <div className={styles.passwordInput}>
                                <label htmlFor="password">Password</label>
                                <input id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    placeholder="Min 6 characters..."
                                    required />
                            </div>
                        </div>

                        <div>
                            <button className={styles.button} type="submit">{mode == "register" ? "Sign Up" : "Log In"}</button>
                        </div>

                    </form>

                    {
                        mode == "register" ?
                            <span>Already have an account? <a onClick={() => setMode("login")}> <u>Log in</u></a></span>
                            :
                            <span>Do not have an account? <a onClick={() => setMode("register")}> <u>Register</u></a></span>
                    }


                </div>
            </div>
        </div>
    );
}