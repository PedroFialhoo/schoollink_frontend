import { useState } from "react";
import LoginForm from "./components/LoginForm";
import LoginSideBar from "./components/LoginSideBar";
import styles from "./Login.module.css";

function Login() {
    const [userType, setUserType] = useState("aluno");

    return (
        <div className={styles.container}>
            <LoginForm userType={userType} />
            <LoginSideBar userType={userType} setUserType={setUserType} />
        </div>
    );
}

export default Login;
