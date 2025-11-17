import { useState, useEffect } from "react";
import styles from "./Cadastrar.module.css";
import FormTurma from "../../components/forms/FormTurma";

function CadastrarTurma() {
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

  const customSelectStyles = {
    singleValue: (p) => ({ ...p, textTransform: "capitalize" }),
    option: (p) => ({ ...p, textTransform: "capitalize" }),
    multiValueLabel: (p) => ({ ...p, textTransform: "capitalize" }),
  };

  useEffect(() => {
    fetch("http://localhost:8080/aluno/buscar-todos")
      .then((res) => res.json())
      .then((data) =>
        setOpcoesAlunos(
          data
            .filter((a) => !a.turma)
            .map((a) => ({ value: a.id, label: a.nome }))
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/professor/buscar-todos")
      .then((res) => res.json())
      .then((data) =>
        setOpcoesProfessores(data.map((p) => ({ value: p.id, label: p.nome })))
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/disciplina/buscar-todas")
      .then((res) => res.json())
      .then((data) =>
        setOpcoesDisciplinas(data.map((d) => ({ value: d.id, label: d.nome })))
      );
  }, []);

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
      return [...semAntiga, { idDisciplina: disciplinaId, idProfessor: professor.value }];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const turmaDto = {
      nome,
      anoEscolar,
      anoLetivo: Number(anoLetivo),
      idAlunos: alunosSelecionados.map((a) => a.value),
      disciplinas: disciplinasProfessores,
    };

    fetch("http://localhost:8080/turma/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turmaDto),
    })
      .then((res) => res.json())
      .then((data) => setMensagem(data.mensagem || "Turma cadastrada com sucesso!"))
      .catch(() => setMensagem("Erro ao cadastrar turma."));

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
        <FormTurma
          nome={nome}
          setNome={setNome}
          anoEscolar={anoEscolar}
          setAnoEscolar={setAnoEscolar}
          anoLetivo={anoLetivo}
          setAnoLetivo={setAnoLetivo}
          alunosSelecionados={alunosSelecionados}
          setAlunosSelecionados={setAlunosSelecionados}
          disciplinasSelecionadas={disciplinasSelecionadas}
          setDisciplinasSelecionadas={setDisciplinasSelecionadas}
          disciplinasProfessores={disciplinasProfessores}
          handleProfessorChange={handleProfessorChange}
          opcoesAlunos={opcoesAlunos}
          opcoesDisciplinas={opcoesDisciplinas}
          opcoesProfessores={opcoesProfessores}
          customSelectStyles={customSelectStyles}
        />

        {mensagem && (
          <p className={mensagem.includes("sucesso") ? styles.mensagemSucesso : styles.mensagemErro}>
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

export default CadastrarTurma;
