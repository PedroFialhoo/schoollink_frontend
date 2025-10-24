// src/components/Tarefa/Tarefa.jsx
import styles from './Tarefa.module.css';

function Tarefa({ teveTarefa, onToggleTarefa, descricao, onDescricaoChange }) {
  return (
    <div className={styles.tarefaCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitulo}>📝 Tarefa</h3>
        
        <label className={styles.switch}>
          <input 
            type="checkbox" 
            checked={teveTarefa}
            onChange={onToggleTarefa}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      {teveTarefa && (
        <div className={styles.descricaoContainer}>
          <label htmlFor="descricaoTarefa">Descrição da Tarefa</label>
          <textarea
            id="descricaoTarefa"
            rows="3"
            value={descricao}
            onChange={onDescricaoChange}
            placeholder="Ex: Resolver lista de exercícios 1, páginas 5-7."
          />
        </div>
      )}
    </div>
  );
}

export default Tarefa;