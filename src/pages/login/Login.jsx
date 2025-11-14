import { useState } from "react";
import LoginForm from "./components/LoginForm";
import LoginSideBar from "./components/LoginSideBar";
import styles from "./Login.module.css";

function Login() {
    const [userType, setUserType] = useState("aluno");

    return (
        <div className={styles.container}>
            <LoginSideBar userType={userType} setUserType={setUserType} />
            <LoginForm userType={userType} />
        </div>
    );
}

export default Login;
