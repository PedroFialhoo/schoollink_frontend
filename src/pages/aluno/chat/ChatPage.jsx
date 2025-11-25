import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatPage.module.css";

export default function ChatPage() {

  const [idConversa, setIdConversa] = useState(null);
  const [idAluno, setIdAluno] = useState(null);
  const [nomeAluno, setNomeAluno] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/aluno/me", { withCredentials: true })
      .then((res) => {
        setIdAluno(res.data.idAluno);
        setNomeAluno(res.data.nome);
      })
      .catch((err) => {
        console.error("Erro ao buscar aluno:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/conversa/buscarConversaAluno", {
        withCredentials: true,
      })
      .then((res) => {
        setIdConversa(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar conversa:", err);
      });
  }, []);

  useEffect(() => {
    if (!idConversa) return;

    axios
      .get(`http://localhost:8080/conversa/buscarMensagens/${idConversa}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMensagens(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar mensagens:", err);
      });
  }, [idConversa]);

  useEffect(() => {
    if (!idConversa) return;
    axios
      .get(`http://localhost:8080/conversa/buscarMensagens/${idConversa}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMensagens(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar mensagens:", err);
      });
  }, []);

  const enviarMensagem = () => {
    if (texto.trim() === "" || !idAluno) return;

    const dto = {
      idMensagem: null,
      mensagem: texto,
      nomeAluno: nomeAluno,
      idAluno: idAluno,
      idRemetente: idAluno,
    };

    axios
      .post("http://localhost:8080/conversa/enviar", dto, {
        withCredentials: true,
      })
      .then(() => {
        setMensagens((prev) => [...prev, dto]);
        setTexto("");
      })
      .catch((err) => {
        console.error("Erro ao enviar mensagem:", err);
      });
  };

  return (
      <div className={styles['chat-container']}> 
        <h1 className={styles['chat-title']}>
          Secretária
        </h1>

        <div className={styles['chat-box']}>
          {mensagens.length === 0 ? (
            <p className={styles['nenhuma-msg']}>Nenhuma mensagem encontrada</p>
          ) : (
            mensagens.map((msg, index) => (
              <div
                key={index}
                className={`${styles['msg-item']} ${
                  // Mensagem do Aluno: se idRemetente for igual ao idAluno
                  msg.idRemetente === msg.idAluno
                    ? styles['msg-aluno']
                    // Mensagem da Diretoria (Secretaria): caso contrário
                    : styles['msg-diretoria'] 
                }`}
              >
                {msg.mensagem}
              </div>
            ))
          )}
        </div>

        {/* Campo enviar mensagem */}
        <div className={styles['chat-input-area']}>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua mensagem..."
            className={styles['chat-input']}
          />
          <button 
            className={styles['chat-btn']} 
            onClick={enviarMensagem}
            // Desabilita se não tiver ID do aluno (ainda carregando)
            disabled={!idAluno} 
          >
            Enviar
          </button>
        </div>
      </div>
    );
  }