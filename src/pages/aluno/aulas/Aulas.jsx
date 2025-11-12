import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Importe useLocation
import Calendar from "react-calendar";
import Registro from "./components/Registro";
import styles from "./Aulas.module.css";

function Aulas() {
  const { id } = useParams();
  const location = useLocation(); // Use o hook useLocation
  const query = new URLSearchParams(location.search);
  const idTurmaDisciplina = query.get("idTurmaDisciplina");

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [aulasDoDia, setAulasDoDia] = useState([]);
  const [registroSelecionado, setRegistroSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErro(null);
    setAulasDoDia([]); // Limpa a lista ao trocar de dia
    setRegistroSelecionado(null); // Limpa o registro selecionado

    const ano = dataSelecionada.getFullYear();
    const mes = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
    const dia = String(dataSelecionada.getDate()).padStart(2, "0");
    const dataFormatada = `${ano}-${mes}-${dia}`;

    fetch("http://localhost:8080/aluno/buscar/aulas/dia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dia: dataFormatada,
        idTurmaDisciplina: Number(idTurmaDisciplina),
      }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar aulas do dia.");
        }
        return res.json();
      })
      .then((dados) => {
        setAulasDoDia(dados);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setErro("Não foi possível carregar as aulas do dia.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataSelecionada, idTurmaDisciplina]);

  const buscarRegistro = (idHorarioAula) => {
    setLoading(true);
    setErro(null);
    setRegistroSelecionado(null);

    fetch(`http://localhost:8080/historicoAula/buscar/historicoAula/${idHorarioAula}`,
      { credentials: "include" }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sem registro de aula.");
        }
        return res.json();
      })
      .then((registro) => {
        const registroFormatado = {
          id: idHorarioAula,
          dataAula: registro.dataAula,
          conteudoMinistrado: registro.conteudoMinistrado,
          resumoAula: registro.resumoAula,
          tarefa: registro.tarefa,
          descricaoTarefa: registro.descricaoTarefa,
        };
        setRegistroSelecionado(registroFormatado);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setErro("Sem registro de aula.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainCardContainer}>
        <div className={styles.leftColumn}>
          <h2 className={styles.titulo}>Selecione o dia</h2>
          <Calendar 
            onChange={setDataSelecionada} 
            value={dataSelecionada}
            locale="pt-BR"
          />
        </div>

        <div className={styles.rightColumn}>
          
          {!loading && aulasDoDia.length > 0 && (
            <div className={styles.listaHorarios}>
              <h3 className={styles.subtitulo}>Aulas disponíveis:</h3>
              {aulasDoDia.map((aula) => (
                <button
                  key={aula.idHorarioAula}
                  onClick={() => buscarRegistro(aula.idHorarioAula)}
                  className={`${styles.horarioBtn} ${
                    registroSelecionado?.id === aula.idHorarioAula ? styles.horarioBtnActive : ""
                  }`}
                >
                  {aula.nomeDisciplina}
                  <span>
                    {aula.horarioInicio} - {aula.horarioTermino}
                  </span>
                </button>
              ))}
            </div>
          )}

          {registroSelecionado && (
            <Registro
              registrosDoDia={[registroSelecionado]}
              dataSelecionada={dataSelecionada}
            />
          )}
          {loading && <p className={styles.feedback}>Carregando...</p>}
          {erro && <p className={styles.erro}>{erro}</p>}
          
          {!loading && !erro && aulasDoDia.length === 0 && (
             <p className={styles.semRegistros}>Nenhuma aula registrada para este dia.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Aulas;