import styles from "./MuralAvisos.module.css";

function MuralAvisos({ avisos }) {
    return (
        <div className={styles.muralContainer}>
            <h2 className={styles.titulo}>📌 Mural de Avisos</h2>
            <div className={styles.conteudoAvisos}>
                {avisos.length > 0 ? (
                    <ul className={styles.listaAvisos}>
                        {avisos.map((aviso) => (
                            <li key={aviso.id} className={styles.aviso}>
                                <strong className={styles.autor}>{aviso.autor}</strong>
                                <p className={styles.mensagem}>{aviso.mensagem}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.semAvisos}>Nenhum aviso no momento.</p>
                )}
            </div>
        </div>
    );
}

export default MuralAvisos;