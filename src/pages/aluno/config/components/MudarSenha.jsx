import styles from './MudarSenha.module.css';
import { useState } from 'react';

function MudarSenha() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (novaSenha !== confirmarSenha) {
        //     setMensagem("As senhas não coincidem.");
        //     return;
        // }

        fetch("http://localhost:8080/aluno/editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ 
                user:{
                    nome: senhaAtual
                },
                statusMatricula : novaSenha
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
                    <input type="text" id="senha-atual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="nova-senha">Nova Senha</label>
                    <input type="text" id="nova-senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmar-senha">Confirmar Nova Senha</label>
                    <input type="text" id="confirmar-senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                </div>

                <button className={`${styles.botao} ${styles.botaoSalvar}`} onClick={handleSubmit}> 
                    Salvar Alterações
                </button>
            </form>
        </div>
    )
}

export default MudarSenha