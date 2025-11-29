import { useState } from "react";
import styles from "./BuscarEntidade.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


function BuscarEntidade({ onSelecionar }) {
  const [tipo, setTipo] = useState("aluno"); 
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;


  const handleBuscar = (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = tipo === "aluno" 
        ? `http://localhost:8080/aluno/buscar?nome=${busca}`
        : `http://localhost:8080/funcionario/buscar?nome=${busca}`;

    axios.get(endpoint, { withCredentials: true })
        .then(res => {
            const normalizados = res.data.map(item => ({
                ...item,
                id: item.idAluno ?? item.idFuncionario ?? item.id,
                nome: item.nome ?? item.userDto?.nome ?? "",   // <-- AQUI
                email: item.email ?? item.userDto?.email ?? "" // <-- AQUI
            }));
            setResultados(normalizados);
            console.log("Dados", normalizados);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false)); 

   
  };

  const handleTrocarTipo = (novoTipo) => {
    setTipo(novoTipo);
    setBusca("");
    setResultados([]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Buscar {tipo === "aluno" ? "Aluno" : "Funcionário"}</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${tipo === "aluno" ? styles.active : ""}`}
          onClick={() => handleTrocarTipo("aluno")}
        >
          <i className="bi bi-mortarboard-fill"></i> Alunos
        </button>
        <button
          className={`${styles.tabButton} ${tipo === "funcionario" ? styles.active : ""}`}
          onClick={() => handleTrocarTipo("funcionario")}
        >
          <i className="bi bi-briefcase-fill"></i> Funcionários
        </button>
      </div>

      <form onSubmit={handleBuscar} className={styles.searchBox}>
        <div className={styles.inputWrapper}>
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder={`Digite o nome do ${tipo}...`}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.btnBuscar} disabled={loading}>
          {loading ? "..." : "Buscar"}
        </button>
      </form>

      <div className={styles.listaResultados}>
        {resultados.length > 0 ? (
          resultados.map((item) => (
            <div
              key={item.id}
              className={styles.cardItem}
              onClick={() => navigate(`${currentPath}/${tipo}/${item.id}`)}
            >
              <div className={styles.avatar}>
                {item.nome.charAt(0)}
              </div>
              <div className={styles.info}>
                <strong className={styles.nome}>{item.nome}</strong>
                
                {tipo === "aluno" ? (
                  <span className={styles.detalhe}>
                    Matrícula: {item.matricula}
                  </span>
                ) : (
                  <span className={styles.detalhe}>
                    {item.email}
                  </span>
                )}
              </div>
              <i className={`bi bi-chevron-right ${styles.seta}`}></i>
            </div>
          ))
        ) : (
          !loading && busca && <p className={styles.empty}></p>
        )}
      </div>
    </div>
  );
}

export default BuscarEntidade;