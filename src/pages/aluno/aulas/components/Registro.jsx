import styles from "./Registro.module.css";

function Registro({ registrosDoDia, dataSelecionada }) {
  const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.paginaContainer}>
      <h2 className={styles.titulo}>Aula do dia {dataFormatada}</h2>

      {registrosDoDia.length === 0 ? (
        <p className={styles.semRegistros}>
          Nenhum registro encontrado para esta data.
        </p>
      ) : (
        registrosDoDia.map((registro) => (
          <div key={registro.id} className={styles.registroCard}>
            <div className={styles.cardBody}>
              <p>
                <strong>Conteúdo ministrado:</strong> {registro.conteudoMinistrado?.trim() || "-"}
              </p>
              <p>
                <strong>Resumo:</strong> {registro.resumoAula?.trim() || "-"}
              </p>

              {registro.tarefa && (
                <div className={styles.tarefaInfo}>
                  <p>
                    <strong>📝 Tarefa:</strong> {registro.descricaoTarefa?.trim() || "-"}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Registro;
