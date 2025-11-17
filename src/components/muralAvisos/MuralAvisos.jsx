import styles from "./MuralAvisos.module.css";

function MuralAvisos({ avisos, userId }) {

    function formatMensagem(texto) {
        if (!texto) return "";
        // transformar links em <a>
        let formatado = texto.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        formatado = formatado.replace(/\n/g, "<br>");

        return formatado;
    }

    return (
        <div className={styles.muralContainer}>
            <h2 className={styles.titulo}>📌 Mural de Avisos</h2>
            <div className={styles.conteudoAvisos}>
                {avisos.length > 0 ? (
                    <ul className={styles.listaAvisos}>
                        {avisos.map((aviso) => (
                            <li key={aviso.id} className={styles.aviso}>
                                <strong className={styles.autor}>{aviso.autor}</strong>
                                <p
                                    className={styles.mensagem}
                                    dangerouslySetInnerHTML={{ __html: formatMensagem(aviso.mensagem) }}
                                ></p>
                                {(aviso.userId === userId || userId === "admin") && (
                                    <div className={styles.acoes}>
                                        <i className="bi bi-pencil"></i>
                                        <i className="bi bi-trash3"></i>
                                    </div>
                                )}
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
