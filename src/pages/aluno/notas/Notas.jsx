import styles from "./Notas.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const calcularMedia = (notas) => {
  if (!notas || notas.length === 0) return 0;
  const soma = notas.reduce((acc, n) => acc + n.nota, 0);
  return soma / notas.length;
};

const getStatusNota = (nota) => {
  if (nota >= 7.5) return "aprovado";
  if (nota >= 6) return "atencao";
  return "reprovado";
};

function Notas() {
  const { id } = useParams(); // id do aluno vindo pela rota
  const [idAluno, setIdAluno] = useState(null);
  const [notas, setNotas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const query = new URLSearchParams(location.search);
  const idTurmaDisciplina = query.get("idTurmaDisciplina"); 

  const detalhesRef = useRef(null);
  const [aberto, setAberto] = useState(false);

  const verificarOpen = () => {
    if (detalhesRef.current) {
      setAberto(detalhesRef.current.open);
    }
  };
  useEffect(() => {
    fetch("http://localhost:8080/aluno/me", {
      method: "GET",
      credentials: "include",
    })
      .then((response) =>
        response.json().then((data) => ({
          status: response.status,
          body: data,
        }))
      )
      .then(({ status, body }) => {
        if (status === 200 && body !== null) {
            setIdAluno(body.idAluno);
            console.log("ID do aluno:", body.idAluno);
        } else {
          setMessage("Erro inesperado. Tente novamente.");
        }
      })
      .catch((error) => {
        setMessage("Erro ao tentar buscar dados. Tente novamente.");
        console.error(error);
      });
  }, []);  

  useEffect(() => {
    async function carregarNotas() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(
          `http://localhost:8080/prova/buscar/notasAluno/${idTurmaDisciplina}`,
          { credentials: "include" }
        );

        if (!resposta.ok) {
          if (resposta.status === 404) {
            throw new Error("Nenhuma prova registrada.");
          } else {
            throw new Error(`Erro ao buscar dados: ${resposta.status}`);
          }
        }

        const json = await resposta.json();
        setNotas(json);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarNotas();
  }, [id]);

  if (carregando) return <p className={styles.mensagemErro}>Carregando...</p>;
  if (erro) return <p className={styles.mensagemErro}>{erro}</p>;
  if (!notas || notas.length === 0)
    return <p className={styles.mensagemErro}>Nenhuma nota encontrada.</p>;

  // Agrupa notas por bimestre
  const notasPorBimestre = notas.reduce((acc, nota) => {
    const bimestre = nota.bimestre.replace("_", " ");
    if (!acc[bimestre]) acc[bimestre] = [];
    acc[bimestre].push(nota);
    return acc;
  }, {});

  const mediasPorBimestre = Object.keys(notasPorBimestre).map(
    (b) => calcularMedia(notasPorBimestre[b])
  );

  const mediaFinal =
    mediasPorBimestre.length > 0
      ? mediasPorBimestre.reduce((acc, m) => acc + m, 0) / mediasPorBimestre.length
      : 0;

  const statusFinal = getStatusNota(mediaFinal);

  return (
    <>
      <a className={styles.btnPDF} href={`http://localhost:8080/alunos/${idAluno}/historico/pdf`} target="_blank" rel="noopener noreferrer">
        Baixar boletim
        <i class="bi bi-download"></i>
      </a>
      <details
        ref={detalhesRef}
        onToggle={verificarOpen}
        className={styles.painelContainer}
        open
      >
        <summary className={styles.cabecalho}>
          <span className={styles.nomeMateria}>Notas</span>
          <i
            className={`${`bi bi-arrow-bar-${aberto ? "up" : "down"}`} ${
              styles.arrow
            }`}
          ></i>
          <div className={styles.mediaFinalContainer}>
            <span>Média Final</span>
            <strong className={`${styles.mediaTag} ${styles[statusFinal]}`}>
              {mediaFinal.toFixed(1)}
            </strong>
          </div>
        </summary>

        <div className={styles.corpoDetalhes}>
          {Object.keys(notasPorBimestre).map((bimestre) => {
            const notasDoBimestre = notasPorBimestre[bimestre];
            const media = calcularMedia(notasDoBimestre);
            const status = getStatusNota(media);

            return (
              <div key={bimestre} className={styles.periodoCard}>
                <div className={styles.periodoHeader}>
                  <h4>{bimestre.replace("_", " ").toLowerCase()}</h4>
                  <strong className={`${styles.mediaTag} ${styles[status]}`}>
                    Média: {media.toFixed(1)}
                  </strong>
                </div>
                <ul className={styles.listaNotas}>
                  {notasDoBimestre.map((nota, i) => (
                    <li key={i} className={styles.notaItem}>
                      <span>{nota.tipo}</span>
                      <span
                        className={`${styles[getStatusNota(nota.nota)]} ${
                          styles.nota
                        }`}
                      >
                        {nota.nota.toFixed(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </details>
    </>
  );
}

export default Notas;
