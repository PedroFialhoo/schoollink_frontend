import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar"; // ou o componente de calendário do seu projeto
import "react-calendar/dist/Calendar.css"; // apenas se usar react-calendar
import "./ProfessorPontosPage.css";

export default function ProfessorPontosPage() {
  const [semana, setSemana] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [infoDia, setInfoDia] = useState(null);

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
    try {
      const response = await axios.get(
        "http://localhost:8080/professor/buscarPontos-semana",
        { withCredentials: true }
      );
      setSemana(response.data);
    } catch (e) {
      console.error("Erro ao buscar semana:", e);
    }
  };

  const buscarPorDia = async (data) => {
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
    <div className="pontos-container">
      <h2>Pontos da Semana</h2>

      <div className="semana-cards">
        {semana.map((d, i) => (
          <div
            key={i}
            className={`dia-card ${d.existe ? "registrado" : "sem-ponto"}`}
          >
            <strong>{diasPt[d.diaDaSemana]}</strong>
            <p>Entrada: {d.horaEntrada ?? "-"}</p>
            <p>Saída: {d.horaSaida ?? "-"}</p>
            <p>{d.existe ? "Registrado" : "Sem ponto"}</p>
          </div>
        ))}
      </div>

      <h2>Ponto por dia</h2>

      <div className="ponto-dia-container">
        <div className="calendario">
          <Calendar
            onChange={onChangeCalendar}
            value={diaSelecionado}
            locale="pt-BR"
          />
        </div>

        <div className="card-dia">
          {infoDia ? (
            <>
              <h3>{diasPt[infoDia.diaDaSemana]}</h3>
              <p>Data: {infoDia.data}</p>
              <p>Entrada: {infoDia.horaEntrada ?? "-"}</p>
              <p>Saída: {infoDia.horaSaida ?? "-"}</p>
              <p>{infoDia.existe ? "Ponto registrado" : "Sem ponto"}</p>
            </>
          ) : (
            <p>Selecione um dia para ver as informações</p>
          )}
        </div>
      </div>
    </div>
  );
}
