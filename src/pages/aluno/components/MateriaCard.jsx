import styles from "./MateriaCard.module.css";

function MateriaCard({ materia }) {
    if (!materia) return <div style={{ color: "red" }}></div>

    return (
        <div 
            className={styles.card} 
            role="button"
        >
            <h3 className={styles.nomeMateria}>
                {materia.nome}
            </h3>
            <p className={styles.nomeProfessor}>
                {materia.professor}
            </p>
        </div>
    );
}

export default MateriaCard;
