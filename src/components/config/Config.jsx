import styles from './Config.module.css';
import MudarFoto from './components/MudarFoto';
import MudarSenha from './components/MudarSenha';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Config() {
  const [userName, setUserName] = useState("Usuário");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null); 

  const location = useLocation();
  const path = location.pathname.split("/");

  const userType = path[1]; 


  useEffect(() => {
    fetch(`http://localhost:8080/${userType}/me`, {
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
          setEmail(body.email);
          setFoto(body.caminhoFoto); 
          console.log("Caminho da foto do usuário:", body.caminhoFoto);
        } else {
          console.log("Erro inesperado.");
        }
      })
      .catch((error) => {
        console.log("Erro ao tentar buscar dados.");
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.paginaContainer}>
      <MudarFoto
        nome={userName}
        email={email}
        avatarUrl={foto} 
      />
      <MudarSenha />
    </div>
  );
}

export default Config;
