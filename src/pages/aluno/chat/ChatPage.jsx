import { useEffect, useState } from "react";
import axios from "axios";
import "./ChatPage.css";

export default function ChatPage() {

  const [idConversa, setIdConversa] = useState(null);
  const [idAluno, setIdAluno] = useState(null);
  const [nomeAluno, setNomeAluno] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  // ----------------------------
  // 1) Buscar dados do aluno logado
  // ----------------------------
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

  // ----------------------------
  // 2) Buscar id da conversa
  // ----------------------------
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

  // ----------------------------
  // 3) Buscar mensagens da conversa
  // ----------------------------
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

  // ----------------------------
  // 4) Enviar mensagem
  // ----------------------------
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
    <div className="chat-container">
      <h1 className="chat-title">
        {idConversa ? `Conversa #${idConversa}` : "Iniciar Conversa"}
      </h1>

      <div className="chat-box">
        {mensagens.length === 0 ? (
          <p className="nenhuma-msg">Nenhuma mensagem encontrada</p>
        ) : (
          mensagens.map((msg, index) => (
            <div
              key={index}
              className={`msg-item ${
                msg.idRemetente === msg.idAluno
                  ? "msg-aluno"
                  : "msg-diretoria"
              }`}
            >
              {msg.mensagem}
            </div>
          ))
        )}
      </div>

      {/* Campo enviar mensagem */}
      <div className="chat-input-area">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />
        <button className="chat-btn" onClick={enviarMensagem}>
          Enviar
        </button>
      </div>
    </div>
  );
}
