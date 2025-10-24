import styles from './ResumoAula.module.css';
import { useState } from 'react';

function ResumoAula({ conteudo, onConteudoChange, resumo, onResumoChange }) {
  const [fechado, setFechado] = useState(true);

  return (
    <details className={styles.resumoCard}>
      <summary className={styles.cardHeader} onClick={() => setFechado(!fechado)}>
        <h3 className={styles.cardTitulo}>📖 Detalhes da Aula</h3>
        <i
          className={`bi bi-chevron-${fechado ? "down " : "up"}`}
        ></i>
      </summary>

      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="conteudo">Conteúdo</label>
          <input
            type="text"
            id="conteudo"
            value={conteudo}
            onChange={onConteudoChange}
            placeholder="Ex: Introdução a Equação"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="resumo">Resumo da Aula</label>
          <textarea
            id="resumo"
            rows="4"
            value={resumo}
            onChange={onResumoChange}
            placeholder="Descreva o que foi feito em sala, exemplos, etc..."
          />
        </div>
      </div>
    </details>
  );
}

export default ResumoAula;
