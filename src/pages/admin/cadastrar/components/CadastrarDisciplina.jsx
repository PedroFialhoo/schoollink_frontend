import { useState } from 'react';
import styles from './Cadastrar.module.css'
import FormDisciplina from '../../components/forms/FormDisciplina';

function CadastrarDisciplina() {

    const [nome, setNome] = useState("");    
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        const disciplina = {
            nome,
        };

        fetch("http://localhost:8080/disciplina/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(disciplina),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        })
        .then(data => {
            setMensagem(data.mensagem || "Disciplina cadastrada com sucesso!");
        })
        .catch(error => {
            setMensagem("Erro ao tentar cadastrar. Tente novamente.");
            console.error(error);
        });

        setNome("");
    }

  return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Cadastrar Disciplina</h2>
                <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                    <FormDisciplina
                        nome={nome} setNome={setNome}
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

export default CadastrarDisciplina;
