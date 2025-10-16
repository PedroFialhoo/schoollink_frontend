import { useState } from 'react';
import styles from './Cadastrar.module.css';

function CadastrarAdmin() {

    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setMensagem("Preencha todos os campos.");
            return;
        }
        setEmail("");
        setSenha("");
    }

  return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Cadastrar Administrador</h2>
                <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    {mensagem && (
                        <p
                            className={
                                mensagem.includes("sucesso")
                                    ? styles.mensagemSucesso
                                    : styles.mensagemErro
                            }
                        >
                            {mensagem}
                        </p>
                    )}

                    <button type="submit" className={`${styles.botao} ${styles.botaoSalvar}`}>
                        Cadastrar
                    </button>
                </form>
        </div>
    )
}

export default CadastrarAdmin;
