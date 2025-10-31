import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import styles from "./Editar.module.css";

function EditarTurma() {
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [anoLetivo, setAnoLetivo] = useState("");
    const [alunosSelecionados, setAlunosSelecionados] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [disciplinasProfessores, setDisciplinasProfessores] = useState([]);
    const [opcoesAlunos, setOpcoesAlunos] = useState([]);
    const [opcoesDisciplinas, setOpcoesDisciplinas] = useState([]);
    const [opcoesProfessores, setOpcoesProfessores] = useState([]);
    const [mensagem, setMensagem] = useState("");

    // Buscar listas base
    useEffect(() => {
        fetch("http://localhost:8080/aluno/buscar-todos")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesAlunos(data.map((a) => ({ value: a.id, label: a.nome })))
            );
        fetch("http://localhost:8080/professor/buscar-todos")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesProfessores(data.map((p) => ({ value: p.id, label: p.nome })))
            );
        fetch("http://localhost:8080/disciplina/buscar-todas")
            .then((res) => res.json())
            .then((data) =>
                setOpcoesDisciplinas(data.map((d) => ({ value: d.id, label: d.nome })))
            );
    }, []);

    // Buscar dados da turma
    useEffect(() => {
        fetch(`http://localhost:8080/turma/buscar/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setNome(data.nome);
                setAnoEscolar(data.anoEscolar);
                setAnoLetivo(data.anoLetivo);
                setAlunosSelecionados(
                    data.alunos.map((a) => ({ value: a.id, label: a.nome }))
                );
                setDisciplinasSelecionadas(
                    data.turmaDisciplinas.map((td) => ({
                        value: td.disciplina.id,
                        label: td.disciplina.nome,
                    }))
                );
                setDisciplinasProfessores(
                    data.turmaDisciplinas.map((td) => ({
                        idDisciplina: td.disciplina.id,
                        idProfessor: td.professor.id,
                    }))
                );
            })
            .catch((err) => console.error("Erro ao buscar turma:", err));
    }, [id]);

    // Atualizar vínculos de professor
    const handleProfessorChange = (disciplinaId, professor) => {
        setDisciplinasProfessores((prev) => {
            const semAntiga = prev.filter((dp) => dp.idDisciplina !== disciplinaId);
            return [
                ...semAntiga,
                { idDisciplina: disciplinaId, idProfessor: professor.value },
            ];
        });
    };

    // Se remover disciplina, remove vínculo
    useEffect(() => {
        setDisciplinasProfessores((prev) =>
            prev.filter((dp) =>
                disciplinasSelecionadas.some((d) => d.value === dp.idDisciplina)
            )
        );
    }, [disciplinasSelecionadas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const turmaDto = {
            nome,
            anoEscolar,
            anoLetivo: Number(anoLetivo),
            idAlunos: alunosSelecionados.map((a) => a.value),
            disciplinas: disciplinasProfessores,
        };

        fetch(`http://localhost:8080/turma/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turmaDto),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
                return res.json();
            })
            .then((data) => setMensagem(data.mensagem))
            .catch((err) => {
                console.error("Erro ao editar turma:", err);
                setMensagem("Erro ao editar turma.");
            });
    };

    return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Editar Turma</h2>

            <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Nome da Turma</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Ano Escolar</label>
                    <select
                        value={anoEscolar}
                        onChange={(e) => setAnoEscolar(e.target.value)}
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

                <div className={styles.inputGroup}>
                    <label>Ano Letivo</label>
                    <input
                        type="number"
                        value={anoLetivo}
                        onChange={(e) => setAnoLetivo(e.target.value)}
                        min="2000"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Alunos</label>
                    <Select
                        isMulti
                        options={opcoesAlunos}
                        value={alunosSelecionados}
                        onChange={setAlunosSelecionados}
                        placeholder="Selecione os alunos..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Disciplinas</label>
                    <Select
                        isMulti
                        options={opcoesDisciplinas}
                        value={disciplinasSelecionadas}
                        onChange={setDisciplinasSelecionadas}
                        placeholder="Selecione as disciplinas..."
                    />
                </div>

                {disciplinasSelecionadas.length > 0 && (
                    <div className={styles.inputGroup}>
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
                                                    (p) =>
                                                        p.value ===
                                                        professorVinculado.idProfessor
                                                )
                                                : null
                                        }
                                        onChange={(prof) =>
                                            handleProfessorChange(
                                                disciplina.value,
                                                prof
                                            )
                                        }
                                        placeholder="Selecione o professor..."
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {mensagem && <p>{mensagem}</p>}

                <button
                    type="submit"
                    className={`${styles.botao} ${styles.botaoSalvar}`}
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}

export default EditarTurma;
