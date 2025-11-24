import { useEffect, useState } from "react";
import axios from "axios";
import "./ChatPage.css";

export default function ChatDiretoriaPage() {
  const [conversas, setConversas] = useState([]);
  const [idConversa, setIdConversa] = useState(null);
  const [idAluno, setIdAluno] = useState(null);
  const [nomeAluno, setNomeAluno] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/conversa/buscarTodasConversas", {
        withCredentials: true,
      })
      .then((res) => {
        setConversas(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar conversas:", err);
      });
  }, []);

  const selecionarConversa = (conversa) => {
    setIdConversa(conversa.idConversa);
    setNomeAluno(conversa.nomeAluno);
    setIdAluno(conversa.idAluno); // 🔥 vem direto da API

    axios
      .get(`http://localhost:8080/conversa/buscarMensagens/${conversa.idConversa}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMensagens(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar mensagens:", err);
      });
  };

  const enviarMensagem = () => {
    if (texto.trim() === "" || !idAluno || !idConversa) return;

    const dto = {
      idMensagem: null,
      mensagem: texto,
      nomeAluno: nomeAluno,
      idAluno: idAluno,
      idRemetente: 1,
    };

    axios
      .post("http://localhost:8080/conversa/enviar", dto, {
        withCredentials: true,
      })
      .then(() => {
        setTexto("");

        // 🔥 RECARREGAR MENSAGENS APÓS ENVIAR
        axios
          .get(
            `http://localhost:8080/conversa/buscarMensagens/${idConversa}`,
            { withCredentials: true }
          )
          .then((res) => {
            setMensagens(res.data || []);
          });
      })
      .catch((err) => {
        console.error("Erro ao enviar mensagem:", err);
      });
  };

  return (
    <div className="chat-container-admin">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="sidebar-title">Conversas</h2>

        {conversas.length === 0 ? (
          <p className="nenhuma-msg">Nenhuma conversa</p>
        ) : (
          conversas.map((c) => (
            <div
              key={c.idConversa}
              className={`sidebar-item ${
                idConversa === c.idConversa ? "selected" : ""
              }`}
              onClick={() => selecionarConversa(c)}
            >
              {c.nomeAluno}
            </div>
          ))
        )}
      </div>

      {/* ÁREA DO CHAT */}
      <div className="chat-area">
        {idConversa ? (
          <>
            <h1 className="chat-title">Chat com {nomeAluno}</h1>

            <div className="chat-box">
              {mensagens.length === 0 ? (
                <p className="nenhuma-msg">Nenhuma mensagem encontrada</p>
              ) : (
                mensagens.map((msg, index) => (
                  <div
                    key={index}
                    className={`msg-item ${
                      msg.tipo === "ADMIN" ? "msg-diretoria" : "msg-aluno"
                    }`}
                  >
                    {msg.mensagem}
                  </div>
                ))
              )}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="chat-input"
              />
              <button
                className="chat-btn"
                onClick={enviarMensagem}
                disabled={!idAluno}
              >
                Enviar
              </button>
            </div>
          </>
        ) : (
          <h2 className="placeholder-select">Selecione um aluno ao lado</h2>
        )}
      </div>
    </div>
  );
}
