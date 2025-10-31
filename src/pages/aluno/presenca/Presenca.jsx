import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Presenca.module.css";

function Presenca() {
  const { id } = useParams(); 
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idTurmaDisciplina = query.get("idTurmaDisciplina"); 

  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(
          `http://localhost:8080/aluno/buscarTodasPresencas?idTurmaDisciplina=${idTurmaDisciplina}`,
          { credentials: "include" }
        );


        if (!resposta.ok) {
          if (resposta.status === 404) {
            throw new Error("Disciplina não encontrada.");
          } else {
            throw new Error(`Erro ao buscar dados: ${resposta.status}`);
          }
        }

        const json = await resposta.json();
        setDados(json);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    if (idTurmaDisciplina) {
      carregarDados();
    }

  }, [idTurmaDisciplina]);

  if (carregando) return <p className={styles.mensagemErro}>Carregando...</p>;
  if (erro) return <p className={styles.mensagemErro}>{erro}</p>;
  if (!dados) return <p className={styles.mensagemErro}>Dados não disponíveis.</p>;

  const { nomeDisciplina, totalAulas, presencas } = dados;
  const ausencias = totalAulas - presencas;

  const frequencia = totalAulas > 0 ? (presencas / totalAulas) * 100 : 0;
  const frequenciaFormatada = Math.round(frequencia);

  let status = "ok";
  if (frequencia < 75) status = "perigo";
  else if (frequencia < 80) status = "atencao";

  return (<div className={styles.painelContainer}> <h2 className={styles.titulo}>Frequência - {nomeDisciplina}</h2>


    <div className={styles.conteudo}>
      <div className={styles.graficoContainer}>
        <div
          className={`${styles.circuloProgresso} ${styles[status]}`}
          style={{ "--frequencia-percent": `${frequenciaFormatada}%` }}
        >
          <div className={styles.textoProgresso}>
            <span>{frequenciaFormatada}%</span>
            <small>Frequência</small>
          </div>
        </div>
      </div>

      <ul className={styles.estatisticas}>
        <li>
          <span>Aulas Totais</span>
          <strong>{totalAulas}</strong>
        </li>
        <li>
          <span>Presenças</span>
          <strong>{presencas}</strong>
        </li>
        <li>
          <span>Ausências</span>
          <strong>{ausencias}</strong>
        </li>
      </ul>
    </div>
  </div>


  );
}

export default Presenca;
