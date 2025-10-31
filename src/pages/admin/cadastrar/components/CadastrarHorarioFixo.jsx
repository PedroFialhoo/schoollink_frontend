import { useState } from "react";
import FormHorario from "../../components/forms/FormHorario";
import styles from "./Cadastrar.module.css";

function CadastrarHorarioFixo() {
  const [formValues, setFormValues] = useState({
    turmaId: "",
    disciplinaId: "",
    professorId: "",
    diaSemana: "",
    horaInicio: "",
    horaFim: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const horario = {
      turma: { id: Number(formValues.turmaId) },
      disciplina: { id: Number(formValues.disciplinaId) },
      professor: { id: Number(formValues.professorId) },
      diaSemana: formValues.diaSemana,
      horaInicio: formValues.horaInicio,
      horaFim: formValues.horaFim,
    };

    fetch("http://localhost:8080/horarios-fixos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horario),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar horário");
        setMensagem("Horário cadastrado com sucesso!");
        setFormValues({
          turmaId: "",
          disciplinaId: "",
          professorId: "",
          diaSemana: "",
          horaInicio: "",
          horaFim: "",
        });
      })
      .catch(err => {
        console.error(err);
        setMensagem("Erro ao cadastrar horário.");
      });
  };

  return (
    <div className={styles.settingsCard}>
      <h2 className={styles.cardTitulo}>Cadastrar Horário</h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
        <FormHorario values={formValues} onChange={handleChange} />

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

export default CadastrarHorarioFixo;
