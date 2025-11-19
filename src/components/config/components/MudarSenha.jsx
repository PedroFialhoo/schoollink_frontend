import PasswordInput from '../../passwordInput/passwordInput';
import styles from './MudarSenha.module.css';
import { useState } from 'react';

function MudarSenha() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (novaSenha !== confirmarSenha) {
            setMensagem("As senhas não coincidem.");
            return;
        }

        fetch("http://localhost:8080/auth/alterarSenha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ 
                "userId":null,
                "senhaAtual": senhaAtual,
                "novaSenha" : novaSenha
            }),
        })
        .then(response => {
            if (response.ok) {
                setMensagem("Senha alterada com sucesso.");
            } else {
                setMensagem("Erro ao alterar a senha.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            setMensagem("Erro ao alterar a senha.");
        });
    }

    return(
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Alterar Senha</h2>
            <form className={styles.senhaForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="senha-atual">Senha Atual</label>
                    <PasswordInput id="senha-atual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="nova-senha">Nova Senha</label>
                    <PasswordInput id="nova-senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmar-senha">Confirmar Nova Senha</label>
                    <PasswordInput id="confirmar-senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                </div>

                <button className={`${styles.botao} ${styles.botaoSalvar}`} onClick={handleSubmit}> 
                    Salvar Alterações
                </button>
            </form>
            <p>{mensagem}</p>
        </div>
    )
}

export default MudarSenha