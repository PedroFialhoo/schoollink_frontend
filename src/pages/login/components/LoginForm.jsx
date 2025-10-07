import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function login() {
        try {
            const response = await fetch("http://localhost:8080/auth/login/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Login bem-sucedido
                navigate("/aluno");
            } else if (response.status === 401) {
                // Login falhou
                setMessage(data.message || "Email ou senha inválidos");
            } else {
                setMessage("Erro inesperado. Tente novamente.");
            }
        } catch (error) {
            setMessage("Erro ao tentar logar. Tente novamente.");
            console.error(error);
        }
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
                <button type="button" className={styles.loginBtn} onClick={login}>
                    Entrar
                </button>
            </form>
            <p className={styles.Message}>{message}</p>
        </div>
    );
}

export default LoginForm;
