import styles from "./Form.module.css";

function FormDisciplina({ nome, setNome}) {
  return (
    <>
      <div className={styles.inputGroup}>
        <label htmlFor="nome">Nome da Disciplina</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      </>
)}

 export default FormDisciplina;