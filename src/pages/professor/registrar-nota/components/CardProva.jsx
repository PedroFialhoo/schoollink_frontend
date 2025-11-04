import styles from './CardProva.module.css';

function CardProva({ prova, onClick }) {
  return (
    <button className={styles.cardContainer} onClick={onClick}>
      <div className={styles.icone}>📝</div>
      <div className={styles.info}>
        <h3 className={styles.nomeProva}>{prova.nome}</h3>
        <p className={styles.infoTurma}>
          {prova.materia} — <strong>Turma: {prova.turma}</strong>
        </p>
        <p className={`${styles.infoTurma} ${styles.bimestre}`}>
            {prova.bimestre.replace("_", " ").toLowerCase()}
        </p>
      </div>
      <div className={styles.seta}>
        <i className="bi bi-chevron-right"></i>
      </div>
    </button>
  );
}

export default CardProva;