import { useState, useEffect } from "react";
import styles from "./CriarAviso.module.css";


function CriarAviso({ isOpen, onClose, onSubmit, turmas = [] }) {
  const [mensagem, setMensagem] = useState("");
  const [idTurma, setIdTurma] = useState("all"); // 'all' é o ID para "Todas as turmas"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensagem) {
      setError("A mensagem não pode estar vazia.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onSubmit({ idTurma, mensagem });
      setMensagem("");
      setIdTurma("all");
    } catch (err) {
      setError("Falha ao enviar aviso. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modalContainer} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.titulo}>Criar Novo Aviso</h3>
          <button onClick={onClose} className={styles.botaoFechar}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.inputGroup}>
              <label htmlFor="turma">Postar para:</label>
              <select
                id="turma"
                value={idTurma}
                onChange={(e) => setIdTurma(e.target.value)}
              >
                <option value="all">Todas as turmas</option>
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                rows="5"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Escreva seu aviso aqui..."
              />
            </div>
            {error && <p className={styles.erro}>{error}</p>}
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={`${styles.botao} ${styles.botaoCancelar}`}>
              Cancelar
            </button>
            <button type="submit" className={`${styles.botao} ${styles.botaoPostar}`} disabled={loading}>
              {loading ? "Postando..." : "Postar Aviso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarAviso;