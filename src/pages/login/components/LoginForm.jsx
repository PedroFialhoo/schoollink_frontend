import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import PasswordInput from "../../../components/passwordInput/PasswordInput";

function LoginForm({ userType }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mensagemType, setMessageType] = useState("");

    const endpoints = {
        aluno: "http://localhost:8080/auth/login/aluno",
        professor: "http://localhost:8080/auth/login/professor",
        admin: "http://localhost:8080/auth/login/admin",
    };
    const endpoint = endpoints[userType];

    function login() {
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })
            .then((response) =>
                response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            )
            .then(({ status, body }) => {
                if (status === 200) {
                    navigate(`/${userType}/home`, { state: body });
                } else if (status === 401) {
                    setMessage(body.message || "Email ou senha inválidos");
                    setMessageType("erro");
                } else {
                    setMessage("Erro inesperado. Tente novamente.");
                    setMessageType("erro");
                }
            })
            .catch((error) => {
                setMessage("Erro ao tentar logar. Tente novamente.");
                setMessageType("erro");
                console.error(error);
            });
    }

    const enviarCodigo = (e) => {
        e.preventDefault(); 
        setMessage("Enviando código...");
        setMessageType("loading");
        
        fetch("http://localhost:8080/password/esquecerSenha", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
        .then((response) => {
            if (response.ok) {
                setMessage("Código de recuperação enviado para o email.");
                setMessageType("sucesso");
                setTimeout(() => {
                    navigate(`/forgot-password?email=${email}`, { state: { email } });
                }, 2000);
            } else {
                return response.json().then((data) => {
                    setMessage(data.message || "Email não encontrado ou erro ao enviar o código.");
                    setMessageType("erro");
                });
            }
        })
        .catch((error) => {
            console.error("Erro na requisição:", error);
            setMessage("Erro de conexão. Tente novamente.");
            setMessageType("erro");
        });
    };


    return (
        <div className={styles.side}>
            <img src="/src/assets/images/logo.png" className={styles.logo} alt="Logo" />

            <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        className={styles.email}
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <PasswordInput
                    className={`${styles.formGroup} ${styles.password}`}
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Link
                    to="#"
                    className={styles.esqueceuSenha}
                    onClick={enviarCodigo}
                    style={{ pointerEvents: isLoading ? "none" : "auto" }}
                >
                    {isLoading ? "Enviando..." : "Esqueceu a senha?"}
                </Link>

                {message && <span className={`${styles[mensagemType]}`}>{message}</span>}

                <button
                    type="button"
                    className={styles.loginBtn}
                    onClick={login}
                    disabled={isLoading}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
