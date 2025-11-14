import { useState, useEffect } from "react";
import MuralAvisos from "../../../components/muralAvisos/MuralAvisos";
import styles from "./Home.module.css";

function HomeAluno() {
  const [avisos, setAvisos] = useState([])
  const [userName, setUserName] = useState("Aluno")
  const [message, setMessage] = useState("")
  const [idTurma, setIdTurma] = useState(null)

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
          setUserName(body.nome);
          setIdTurma(body.idTurma);
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
    fetch("http://localhost:8080/mural/buscarAvisos", {
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
        if (status === 200 && Array.isArray(body)) {
          const avisosConvertidos = body.map((a) => ({
            id: a.id,
            autor: a.nomeProfessor ? a.nomeProfessor : "Coordenação",
            mensagem: a.mensagem,
          }));

          setAvisos(avisosConvertidos.reverse());
        } else {
          setAvisos([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar avisos:", error);
        setAvisos([]);
      });
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>Bem-vindo, <span className={styles.nome}>{userName}</span>!</h1>      
      <MuralAvisos avisos={avisos} />
    </div>
  );
}

export default HomeAluno;
