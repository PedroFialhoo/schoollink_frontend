import { useState } from 'react';
import styles from './Cadastrar.module.css';
import Endereco from './Endereco';

function CadastrarAluno() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [matricula, setMatricula] = useState("");
    const [dataMatricula, setDataMatricula] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("");
    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [telefone, setTelefone] = useState("");
    const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
    const [cep, setCep] = useState("");
    const [pais, setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");

    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !email || !senha) {
            setMensagem("Preencha pelo menos os campos nome, email e senha.");
            return;
        }

        const aluno = {
            nome,
            email,
            senha,
            // matricula,
            // dataMatricula,
            // statusMatricula,
            // telefone,
            // nomeResponsavel,
            // telefoneResponsavel,
            // endereco: {
            //     cep,
            //     pais,
            //     estado,
            //     cidade,
            //     rua,
            //     numero
            // }
        };

        fetch("http://localhost:8080/aluno/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
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

        setNome("");
        setEmail("");
        setSenha("");
        setMatricula("");
        setDataMatricula("");
        setStatusMatricula("");
        setTelefone("");
        setNomeResponsavel("");
        setTelefoneResponsavel("");
        setCep("");
        setPais("");
        setEstado("");
        setCidade("");
        setRua("");
        setNumero("");
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
                    <label htmlFor="dataMatricula">Data de Matrícula</label>
                    <input
                        type="text"
                        id="dataMatricula"
                        value={dataMatricula}
                        onChange={(e) => setDataMatricula(e.target.value)}
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

                <div className={styles.inputGroup}>
                    <label htmlFor="nomeResponsavel">Nome responsável</label>
                    <input
                        type="text"
                        id="nomeResponsavel"
                        value={nomeResponsavel}
                        onChange={(e) => setNomeResponsavel(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="telefoneResponsavel">Telefone responsável</label>
                    <input
                        type="tel"
                        id="telefoneResponsavel"
                        value={telefoneResponsavel}
                        onChange={(e) => setTelefoneResponsavel(e.target.value)}
                    />
                </div>

                <Endereco
                    cep={cep} setCep={setCep}
                    pais={pais} setPais={setPais}
                    estado={estado} setEstado={setEstado}
                    cidade={cidade} setCidade={setCidade}
                    rua={rua} setRua={setRua}
                    numero={numero} setNumero={setNumero}
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
    );
}

export default CadastrarAluno;
