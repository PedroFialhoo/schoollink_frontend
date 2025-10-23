import styles from "./CardAula.module.css";

function CardAula({ materia }) {
    if (!materia) return <div style={{ color: "red" }}></div>

    return (
        <div 
            className={styles.card} 
            role="button"
        >
            <h3 className={styles.nomeMateria}>
                {materia.nomeDisciplina }
            </h3>
            <p className={styles.horario}>
                {materia.horarioInicio.slice(0, -3)} - {materia.horarioTermino.slice(0, -3)}
            </p>
        </div>
    );
}

export default CardAula;
