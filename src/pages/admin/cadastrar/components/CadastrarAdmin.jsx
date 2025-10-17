import { useState } from 'react';
import styles from './Cadastrar.module.css'
import FormAdmin from '../../components/forms/FormAdmin';

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
                    <FormAdmin
                        email={email} setEmail={setEmail}
                        senha={senha} setSenha={setSenha}
                    />

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
