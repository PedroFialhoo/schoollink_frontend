import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function login() {
        fetch("http://localhost:8080/auth/login/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",                
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                body: data
            }));
        })
        .then(({ status, body }) => {
            if (status === 200) {
                navigate("/aluno/home", { state: body });
            } else if (status === 401) {
                setMessage(body.message || "Email ou senha inválidos");
            } else {
                setMessage("Erro inesperado. Tente novamente.");
            }
        })
        .catch(error => {
            setMessage("Erro ao tentar logar. Tente novamente.");
            console.error(error);
        });
    }


    return (
        <div className={styles.side}>
            <img src="/src/assets/images/logo.png" className={styles.logo} alt="" />
            <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        className={styles.email}
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        className={styles.password}
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>                
                <span className={styles.message}>{message}</span>
                <button type="button" className={styles.loginBtn} onClick={login}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
