import styles from './Entidade.module.css';

function Entidades({ type }) {
    return (
        <div className={styles.entidade}>
            <h1 className={styles.titulo}>{type}</h1>
        </div>
    );
}

export default Entidades;
