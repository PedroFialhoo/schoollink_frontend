import { useState } from 'react';
import styles from './Cadastrar.module.css';
import Endereco from './Endereco';

function CadastrarProfessor() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
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
            <h2 className={styles.cardTitulo}>Cadastrar Professor</h2>
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
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="tel"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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

export default CadastrarProfessor
