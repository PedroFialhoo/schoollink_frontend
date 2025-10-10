import styles from './Registro.module.css';

function Registro({ registrosDoDia, dataSelecionada }) {
  const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR", {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={styles.paginaContainer}>
      <h2 className={styles.titulo}>Aulas do dia {dataFormatada}</h2>

      {registrosDoDia.length === 0 ? (
        <p className={styles.semRegistros}>Nenhuma aula registrada para esta data.</p>
      ) : (
        <div className={styles.listaRegistros}>
          {registrosDoDia.map((registro) => (
            <div key={registro.id} className={styles.registroCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.materiaNome}>{registro.materiaNome}</h3>
                <p className={styles.professor}>{registro.professor}</p>
              </div>
              
              <div className={styles.cardBody}>
                <p><strong>Conteúdo:</strong> {registro.conteudo}</p>
                
                {registro.teveTarefa && (
                  <div className={styles.tarefaInfo}>
                    <p><strong>📝 Tarefa:</strong> {registro.tarefa}</p>
                  </div>
                )}

                <p><strong>Resumo:</strong> {registro.resumo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Registro;