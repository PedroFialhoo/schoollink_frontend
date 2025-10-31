import { useEffect, useState } from "react";
import styles from "./Form.module.css";

function FormHorario({ onChange, values }) {
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);

  const anoAtual = new Date().getFullYear(); 

  useEffect(() => {
    fetch("http://localhost:8080/turma/listar")
      .then(res => res.json())
      .then(data => {
        let turmasArray = Array.isArray(data) ? data : data.content;
        turmasArray = turmasArray.filter(t => t.anoLetivo === anoAtual);
        setTurmas(turmasArray);
      })
      .catch(err => {
        console.error("Erro ao buscar turmas:", err);
        setTurmas([]);
      });
  }, []);

  useEffect(() => {
  if (values.turmaId) {
    fetch(`http://localhost:8080/disciplina/buscarDisciplinas?id=${values.turmaId}`)
      .then(res => res.json())
      .then(data => {
        const disciplinasFormatadas = Array.isArray(data) ? data.map(d => ({
          id: d.idDisciplina,
          nome: d.nomeDisciplina,
          professorId: d.idProfessor,
          professorNome: d.nomeProfessor
        })) : [];
        setDisciplinas(disciplinasFormatadas);
      })
      .catch(err => {
        console.error("Erro ao buscar disciplinas:", err);
        setDisciplinas([]);
      });
  } else {
    setDisciplinas([]);
  }
}, [values.turmaId]);

useEffect(() => {
  const disciplinaSelecionada = disciplinas.find(d => d.id === Number(values.disciplinaId));
  if (disciplinaSelecionada) {
    onChange("professorId", disciplinaSelecionada.professorId);
    onChange("professorNome", disciplinaSelecionada.professorNome);
  } else {
    onChange("professorId", "");
    onChange("professorNome", "");
  }
}, [values.disciplinaId, disciplinas]);


  return (
    <div className={styles.inputGroup}>
      <label>Turma:</label>
      <select value={values.turmaId} onChange={e => onChange("turmaId", e.target.value)}>
        <option value="">Selecione uma turma</option>
        {turmas.map(t => (
          <option key={t.id} value={t.id}>{t.nome}</option>
        ))}
      </select>

      {values.turmaId && (
        <>
          <label>Disciplina:</label>
          <select value={values.disciplinaId} onChange={e => onChange("disciplinaId", e.target.value)}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map(d => (
              <option className={styles.valor} key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </select>

          <label>Professor:</label>
          <input className={styles.valor} type="text" value={values.professorNome || ""} disabled />


          <label>Dia da semana:</label>
          <select value={values.diaSemana} onChange={e => onChange("diaSemana", e.target.value)}>
            <option value="">Selecione o dia</option>
            <option value="SUNDAY">Domingo</option>
            <option value="MONDAY">Segunda</option>
            <option value="TUESDAY">Terça</option>
            <option value="WEDNESDAY">Quarta</option>
            <option value="THURSDAY">Quinta</option>
            <option value="FRIDAY">Sexta</option>
            <option value="SATURDAY">Sábado</option>
          </select>

          <label>Hora de início:</label>
          <input type="time" value={values.horaInicio} onChange={e => onChange("horaInicio", e.target.value)} />

          <label>Hora de fim:</label>
          <input type="time" value={values.horaFim} onChange={e => onChange("horaFim", e.target.value)} />
        </>
      )}
    </div>
  );
}

export default FormHorario;
