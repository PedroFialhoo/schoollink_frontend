import { useState } from 'react';
import styles from './Aluno.module.css';

function Aluno() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [matricula, setMatricula] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !matricula || !statusMatricula || !telefone) {
            setMensagem("Preencha todos os campos.");
            return;
        }
        const aluno = { nome, email, senha, matricula, statusMatricula, telefone };

        fetch("http://localhost:8080/aluno/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                matricula: matricula,
                statusMatricula: statusMatricula,
                telefone: telefone
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        })
        .then(data => {
            setMensagem(data.mensagem || "Aluno cadastrado com sucesso!");
        })
        .catch(error => {
            setMensagem("Erro ao tentar cadastrar. Tente novamente.");
            console.error(error);
        });

        setEmail("");
        setNome("");
        setSenha("");
        setMatricula("");
        setStatusMatricula("");
        setTelefone("");
    };

    return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Cadastrar Aluno</h2>
            <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

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

                <div className={styles.inputGroup}>
                    <label htmlFor="matricula">Matrícula</label>
                    <input
                        type="text"
                        id="matricula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="statusMatricula">Status da Matrícula</label>
                    <select
                        id="statusMatricula"
                        value={statusMatricula}
                        onChange={(e) => setStatusMatricula(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="Ativa">Ativa</option>
                        <option value="Trancada">Trancada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="tel"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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
    );
}

export default Aluno;
