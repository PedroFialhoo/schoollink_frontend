import styles from './Config.module.css';
import MudarFoto from './components/MudarFoto';
import MudarSenha from './components/MudarSenha';
import { useState, useEffect } from 'react';

function Config() {
  const [userName, setUserName] = useState("Usuário");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null); // <- novo

  useEffect(() => {
    fetch(`http://localhost:8080/aluno/me`, {
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
          setFoto(body.caminhoFoto); // <- foto recebida
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
        avatarUrl={foto} // <- enviando para o componente
      />
      <MudarSenha />
    </div>
  );
}

export default Config;
