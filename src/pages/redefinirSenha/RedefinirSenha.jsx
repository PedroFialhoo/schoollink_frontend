// src/pages/RedefinirSenha.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './RedefinirSenha.module.css';
import logo from "/src/assets/images/logo.png"; 
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';

function RedefinirSenha() {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    
    const query = new URLSearchParams(location.search);
    const email = query.get("email"); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        if (!code || !newPassword || !confirmPassword) {
            setMessage("Preencha todos os campos.");
            setMessageType("erro");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("As senhas não coincidem.");
            setMessageType("erro");
            return;
        }

        fetch("http://localhost:8080/password/alterarSenhaPeloCodigo", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, codigo: code, novaSenha: newPassword }),
        })
        .then((response) => {
            return response.text().then((text) => {
                if (response.ok) {
                    setMessage("Senha redefinida com sucesso!");
                    setMessageType("sucesso");
                    setTimeout(() => navigate("/"), 2000);
                } else {
                    setMessage(text || "Erro ao redefinir a senha.");
                    setMessageType("erro");
                }
            });
        })
        .catch((error) => {
            console.error("Erro na requisição:", error);
            setMessage("Erro de conexão. Tente novamente.");
            setMessageType("erro");
        });
    };

    return (
        <div className={styles.pageContainer}>
            <img src={logo} alt="SchoolLink Logo" className={styles.logo} />

            <div className={styles.resetCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.titulo}>Redefinir Senha</h2>
                    <p className={styles.subtitulo}>
                        Digite o código recebido por e-mail e sua nova senha.
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="code">Código de Verificação</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Cole o código aqui"
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword">Nova Senha</label>
                        <PasswordInput
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
                        <PasswordInput
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={`${styles.mensagem} ${messageType === 'sucesso' ? styles.mensagemSucesso : styles.mensagemErro}`}>
                            {message}
                        </p>
                    )}

                    <button type="submit" className={styles.botaoSalvar} >
                        Redefinir Senha
                    </button>
                </form>
                
                <div className={styles.footerLink}>
                    <Link to="/">Lembrou a senha? Voltar para o login</Link>
                </div>
            </div>
        </div>
    );
}

export default RedefinirSenha;