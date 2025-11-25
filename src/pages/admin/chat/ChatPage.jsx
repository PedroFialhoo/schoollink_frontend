import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatPageAdmin.module.css";

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
    setIdAluno(conversa.idAluno); 

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
  
  useEffect(() => {
    if (!idConversa) return;
    axios
      .get(`http://localhost:8080/conversa/buscarMensagens/${conversa.idConversa}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMensagens([]);
        setMensagens(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar mensagens:", err);
      });
  }, []);

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
      <div className={styles['chat-container-admin']}> 
        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <h2 className={styles['sidebar-title']}>Conversas</h2>

          {conversas.length === 0 ? (
            <p className={styles['nenhuma-msg']}>Nenhuma conversa</p>
          ) : (
            conversas.map((c) => (
              <div
                key={c.idConversa}
                className={`${styles['sidebar-item']} ${
                  idConversa === c.idConversa ? styles.selected : ""
                }`}
                onClick={() => selecionarConversa(c)}
              >
                <img
                src={`http://localhost:8080/${c.caminhoFoto}`}
                onError={(e) => {
                  e.currentTarget.src = "/src/assets/images/favicon.ico";
                }}
                alt=""
              />
                <p>{c.nomeAluno}</p>
              </div>
            ))
          )}
        </div>

        {/* ÁREA DO CHAT */}
        <div className={styles['chat-area']}>
          {idConversa ? (
            <>
              <div className={styles['chat-box']}>
                {mensagens.length === 0 ? (
                  <p className={styles['nenhuma-msg']}>Nenhuma mensagem encontrada</p>
                ) : (
                  mensagens.map((msg, index) => (
                    <div
                      key={index}
                      className={`${styles['msg-item']} ${
                        msg.tipo === "ADMIN" ? styles['msg-diretoria'] : styles['msg-aluno']
                      }`}
                    >
                      {msg.mensagem}
                    </div>
                  ))
                )}
              </div>

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
                  disabled={!idAluno}
                >
                  Enviar
                </button>
              </div>
            </>
          ) : (
            <h2 className={styles['placeholder-select']}>Selecione um aluno ao lado</h2>
          )}
        </div>
      </div>
    );
  }