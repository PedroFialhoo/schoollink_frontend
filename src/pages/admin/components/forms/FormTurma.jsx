import { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css"

const FormTurma = () => {
    const [nome, setNome] = useState("");
    const [anoLetivo, setAnoLetivo] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/turmas/cadastrar", {
                nome,
                anoLetivo,
                anoEscolar,
            });
            setMensagem("Turma cadastrada com sucesso!");
            setNome("");
            setAnoLetivo("");
            setAnoEscolar("");
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao cadastrar turma. Tente novamente.");
        }
    };

    return (
        <div className={styles.form-container}>
            <h2>Cadastrar Turma</h2>
            {mensagem && <p>{mensagem}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Ano Letivo:</label>
                    <input
                        type="text"
                        value={anoLetivo}
                        onChange={(e) => setAnoLetivo(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Ano Escolar:</label>
                    <input
                        type="text"
                        value={anoEscolar}
                        onChange={(e) => setAnoEscolar(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default FormTurma;
