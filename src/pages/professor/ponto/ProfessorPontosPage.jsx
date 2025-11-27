import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./ProfessorPontosPage.module.css";

export default function ProfessorPontosPage() {
  const [semana, setSemana] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [infoDia, setInfoDia] = useState(null);
  const [loadingSemana, setLoadingSemana] = useState(true);
  const [totalSemanal, setTotalSemanal] = useState(null);

  const diasPt = {
    MONDAY: "Segunda-feira",
    TUESDAY: "Terça-feira",
    WEDNESDAY: "Quarta-feira",
    THURSDAY: "Quinta-feira",
    FRIDAY: "Sexta-feira",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
  };

  useEffect(() => {
    carregarSemana();
    buscarPorDia(formatDate(diaSelecionado));
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const carregarSemana = async () => {
    setLoadingSemana(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/professor/buscarPontos-semana",
        { withCredentials: true }
      );
      setSemana(response.data.pontos);
      setTotalSemanal(response.data.totalHoras);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSemana(false);
    }
  };

  const buscarPorDia = async (data) => {
    setInfoDia(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/professor/buscarPonto/${data}`,
        { withCredentials: true }
      );
      setInfoDia(response.data);
    } catch (e) {
      setInfoDia(null);
    }
  };

  const onChangeCalendar = (date) => {
    setDiaSelecionado(date);
    buscarPorDia(formatDate(date));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.tituloPrincipal}>Registro de pontos</h1>

      <section className={styles.sectionSemana}>
        <div className={styles.headerRow}>
          <h2 className={styles.subtitulo}>Resumo da Semana</h2>
          {totalSemanal && (
            <span className={styles.totalBadge}>
              Total semanal: {totalSemanal}
            </span>
          )}
        </div>

        {loadingSemana ? (
          <p className={styles.loadingText}>Carregando dados da semana...</p>
        ) : (
          <div className={styles.gridSemana}>
            {semana.map((d, i) => (
              <div
                key={i}
                className={`${styles.diaCard} ${
                  d.existe ? styles.presente : styles.ausente
                }`}
              >
                <div className={styles.cardHeader}>
                  <strong>{diasPt[d.diaDaSemana] || d.diaDaSemana}</strong>
                  <span
                    className={d.existe ? styles.badgeOk : styles.badgeMiss}
                  >
                    {d.existe ? "OK" : "Ausente"}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.horarioRow}>
                    <span>Entrada:</span>
                    <strong>{d.horaEntrada ?? "--:--"}</strong>
                  </div>
                  <div className={styles.horarioRow}>
                    <span>Saída:</span>
                    <strong>{d.horaSaida ?? "--:--"}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.sectionConsulta}>
        <h2 className={styles.subtitulo}>Consultar Data Específica</h2>

        <div className={styles.consultaContainer}>
          <div>
            <Calendar
              onChange={onChangeCalendar}
              value={diaSelecionado}
              locale="pt-BR"
            />
          </div>

          <div className={styles.detalhesWrapper}>
            {infoDia ? (
              <div
                className={`${styles.detalheCard} ${
                  infoDia.existe ? styles.borderGreen : styles.borderRed
                }`}
              >
                <h3 className={styles.detalheTitulo}>
                  {diasPt[infoDia.diaDaSemana]} <br />
                  <small>
                    {new Date(infoDia.data + "T00:00:00").toLocaleDateString(
                      "pt-BR"
                    )}
                  </small>
                </h3>

                <div className={styles.statusGeral}>
                  Status:{" "}
                  <span
                    className={
                      infoDia.existe ? styles.textGreen : styles.textRed
                    }
                  >
                    {infoDia.existe
                      ? "Ponto Registrado ✅"
                      : "Não há registro ❌"}
                  </span>
                </div>

                <div className={styles.horariosBig}>
                  <div className={styles.timeBox}>
                    <span>Entrada</span>
                    <div className={styles.clock}>
                      🕗 {infoDia.horaEntrada ?? "--:--"}
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.timeBox}>
                    <span>Saída</span>
                    <div className={styles.clock}>
                      🕔 {infoDia.horaSaida ?? "--:--"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>Nenhum registro encontrado para a data:</p>
                <strong>
                  {diaSelecionado.toLocaleDateString("pt-BR")}
                </strong>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}