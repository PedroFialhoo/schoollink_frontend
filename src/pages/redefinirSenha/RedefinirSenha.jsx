// src/pages/RedefinirSenha.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './RedefinirSenha.module.css';
import logo from "/src/assets/images/logo.png"; 

function RedefinirSenha() {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 

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
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
                        <input
                            type="password"
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