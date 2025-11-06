import { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Cadastrar.module.css";

function CadastrarTurma() {
    const [nome, setNome] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [anoLetivo, setAnoLetivo] = useState("");
    const [alunosSelecionados, setAlunosSelecionados] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [disciplinasProfessores, setDisciplinasProfessores] = useState([]); // [{idDisciplina, idProfessor}]
    const [opcoesAlunos, setOpcoesAlunos] = useState([]);
    const [opcoesDisciplinas, setOpcoesDisciplinas] = useState([]);
    const [opcoesProfessores, setOpcoesProfessores] = useState([]);
    const [mensagem, setMensagem] = useState("");

    // Adicione isso dentro do seu componente CadastrarTurma
    const customSelectStyles = {
    // Estiliza o valor selecionado
    singleValue: (provided) => ({
        ...provided,
        textTransform: "capitalize",
    }),
    // Estiliza os itens do menu
    option: (provided) => ({
        ...provided,
        textTransform: "capitalize",
    }),
    // Se quiser nos múltiplos valores selecionados
    multiValueLabel: (provided) => ({
        ...provided,
        textTransform: "capitalize",
    }),
    };

    // Buscar alunos
    useEffect(() => {
        fetch("http://localhost:8080/aluno/buscar-todos")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesAlunos(
                    data.map((a) => ({
                        value: a.id,
                        label: a.nome,
                    }))
                )
            )
            .catch((err) => console.error("Erro ao buscar alunos:", err));
    }, []);

    // Buscar professores
    useEffect(() => {
        fetch("http://localhost:8080/professor/buscar-todos")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesProfessores(
                    data.map((p) => ({
                        value: p.id,
                        label: p.nome, // ajustado para DTO
                    }))
                )
            )
            .catch((err) => console.error("Erro ao buscar professores:", err));
    }, []);

    // Buscar disciplinas
    useEffect(() => {
        fetch("http://localhost:8080/disciplina/buscar-todas")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesDisciplinas(
                    data.map((d) => ({
                        value: d.id,
                        label: d.nome, // ajustado para DTO
                    }))
                )
            )
            .catch((err) => console.error("Erro ao buscar disciplinas:", err));
    }, []);

    // Limpar vínculos antigos de professores quando disciplinas mudarem
    useEffect(() => {
        setDisciplinasProfessores((prev) =>
            prev.filter((dp) =>
                disciplinasSelecionadas.some((d) => d.value === dp.idDisciplina)
            )
        );
    }, [disciplinasSelecionadas]);

    const handleProfessorChange = (disciplinaId, professor) => {
        setDisciplinasProfessores((prev) => {
            const semAntiga = prev.filter((dp) => dp.idDisciplina !== disciplinaId);
            return [
                ...semAntiga,
                { idDisciplina: disciplinaId, idProfessor: professor.value },
            ];
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const turmaDto = {
            nome,
            anoEscolar,
            anoLetivo: Number(anoLetivo),
            idAlunos: alunosSelecionados.map((a) => a.value),
            disciplinas: disciplinasProfessores, // [{idDisciplina, idProfessor}]
        };

        fetch("http://localhost:8080/turma/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turmaDto),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) =>
                setMensagem(data.mensagem || "Turma cadastrada com sucesso!")
            )
            .catch((err) => {
                console.error("Erro ao cadastrar turma:", err);
                setMensagem("Erro ao cadastrar turma.");
            });

        // Resetar campos
        setNome("");
        setAnoEscolar("");
        setAnoLetivo("");
        setAlunosSelecionados([]);
        setDisciplinasSelecionadas([]);
        setDisciplinasProfessores([]);
    };

    return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Cadastrar Turma</h2>

            <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                {/* Nome */}
                <div className={styles.inputGroup}>
                    <label>Nome da Turma</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                {/* Ano Escolar */}
                <div className={styles.inputGroup}>
                    <label>Ano Escolar</label>
                    <select
                        value={anoEscolar}
                        onChange={(e) => setAnoEscolar(e.target.value)}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="PRIMEIRO_FUNDAMENTAL">1º Ano Fundamental</option>
                        <option value="SEGUNDO_FUNDAMENTAL">2º Ano Fundamental</option>
                        <option value="TERCEIRO_FUNDAMENTAL">3º Ano Fundamental</option>
                        <option value="QUARTO_FUNDAMENTAL">4º Ano Fundamental</option>
                        <option value="QUINTO_FUNDAMENTAL">5º Ano Fundamental</option>
                        <option value="SEXTO_FUNDAMENTAL">6º Ano Fundamental</option>
                        <option value="SETIMO_FUNDAMENTAL">7º Ano Fundamental</option>
                        <option value="OITAVO_FUNDAMENTAL">8º Ano Fundamental</option>
                        <option value="NONO_FUNDAMENTAL">9º Ano Fundamental</option>
                        <option value="PRIMEIRO_MEDIO">1º Ano Médio</option>
                        <option value="SEGUNDO_MEDIO">2º Ano Médio</option>
                        <option value="TERCEIRO_MEDIO">3º Ano Médio</option>
                    </select>
                </div>

                {/* Ano Letivo */}
                <div className={styles.inputGroup}>
                    <label>Ano Letivo</label>
                    <input
                        type="number"
                        value={anoLetivo}
                        onChange={(e) => setAnoLetivo(e.target.value)}
                        min="2000"
                        required
                    />
                </div>

                {/* Alunos */}
                <div>
                    <label>Alunos</label>
                    <Select
                        isMulti
                        options={opcoesAlunos}
                        value={alunosSelecionados}
                        onChange={setAlunosSelecionados}
                        placeholder="Selecione os alunos..."
                        styles={customSelectStyles}
                    />
                </div>

                {/* Disciplinas */}
                <div>
                    <label>Disciplinas</label>
                    <Select
                        isMulti
                        options={opcoesDisciplinas}
                        value={disciplinasSelecionadas}
                        onChange={setDisciplinasSelecionadas}
                        placeholder="Selecione as disciplinas..."
                        styles={customSelectStyles}
                    />
                </div>

                {/* Professores vinculados às disciplinas */}
                {disciplinasSelecionadas.length > 0 && (
                    <div>
                        <label>Vincular Professores às Disciplinas</label>
                        {disciplinasSelecionadas.map((disciplina) => {
                            const professorVinculado = disciplinasProfessores.find(
                                (dp) => dp.idDisciplina === disciplina.value
                            );
                            return (
                                <div
                                    key={disciplina.value}
                                    className={styles.disciplinaProfessorRow}
                                >
                                    <span>{disciplina.label}</span>
                                    <Select
                                        options={opcoesProfessores}
                                        value={
                                            professorVinculado
                                                ? opcoesProfessores.find(
                                                    (p) => p.value === professorVinculado.idProfessor
                                                )
                                                : null
                                        }
                                        onChange={(prof) =>
                                            handleProfessorChange(disciplina.value, prof)
                                        }
                                        placeholder="Selecione o professor..."
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Mensagem */}
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

                <button
                    type="submit"
                    className={`${styles.botao} ${styles.botaoSalvar}`}
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default CadastrarTurma;
