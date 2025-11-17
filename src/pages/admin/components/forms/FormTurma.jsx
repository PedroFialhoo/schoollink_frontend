import Select from "react-select";
import styles from "./Form.module.css";

function FormTurma({
  nome, setNome,
  anoEscolar, setAnoEscolar,
  anoLetivo, setAnoLetivo,
  alunosSelecionados, setAlunosSelecionados,
  disciplinasSelecionadas, setDisciplinasSelecionadas,
  disciplinasProfessores, handleProfessorChange,
  opcoesAlunos, opcoesDisciplinas, opcoesProfessores,
  customSelectStyles
}) {
  return (
    <>
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
          styles={customSelectStyles}
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
          styles={customSelectStyles}
          placeholder="Selecione as disciplinas..."
        />
      </div>

      {disciplinasSelecionadas.length > 0 && (
        <div>
          {disciplinasSelecionadas.map((disciplina) => {
            const professorVinculado = disciplinasProfessores.find(
              (dp) => dp.idDisciplina === disciplina.value
            );
            return (
              <div key={disciplina.value} className={styles.inputGroup}>
                <label>{disciplina.label}</label>
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
    </>
  );
}

export default FormTurma;
