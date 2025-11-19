import { useState, useEffect } from "react";
import styles from "./BuscarEntidade.module.css";

const FILTROS_CONFIG = {
  aluno: [
    { id: "email", label: "Email", type: "email" },
    { id: "nome", label: "Nome do Aluno", type: "text" },
    { id: "matricula", label: "Matrícula", type: "text" },
  ],
  professor: [
    { id: "nome", label: "Nome do Professor", type: "text" },
    { id: "cpf", label: "CPF", type: "text" },
    { id: "disciplina", label: "Disciplina", type: "text" },
  ],
  funcionario: [
    { id: "nome", label: "Nome do Funcionário", type: "text" },
    { id: "setor", label: "Setor", type: "text" },
  ],
};

function BuscarEntidade({ entidade, searchActive, setSearchActive, onResultado }) {
  const [formData, setFormData] = useState({});
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const filtrosAtuais = FILTROS_CONFIG[entidade] || [];
  const titulo = `Buscar ${entidade.charAt(0).toUpperCase() + entidade.slice(1)}`;

  useEffect(() => {
    setFormData({});
    setResultados([]);
    setErro("");
  }, [entidade]);

  // Atualiza os campos do formulário dinamicamente
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setResultados([]);

    const params = new URLSearchParams(formData).toString();

    fetch(`http://localhost:8080/${entidade}/buscar?${params}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        return response.json();
        })
        .then((data) => {
        setResultados(Array.isArray(data) ? data : [data]); // garante que seja array
        })
        .catch((error) => {
        console.error(error);
        setErro("Erro ao buscar dados. Verifique os filtros.");
        })
        .finally(() => {
        setLoading(false);
        });
    };


  return (
    <div className={styles.popupContainer}>
        <div className={styles.card}>
            <h3>{titulo}</h3>
            <button className={styles.botaoFechar} onClick={() => setSearchActive(searchActive === "desactive" ? "active" : "desactive")}>x</button>
        </div>
      
      <form onSubmit={handleBuscar} className={styles.form}>
        {filtrosAtuais.map((filtro) => (
          <div key={filtro.id} className={styles.formGroup}>
            <label htmlFor={filtro.id}>{filtro.label}</label>
            <input
              id={filtro.id}
              type={filtro.type}
              value={formData[filtro.id] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className={styles.botaoBuscar} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && <p className={styles.erro}>{erro}</p>}

      {resultados.length > 0 && (
        <div className={styles.resultados}>
          <h4>Resultados:</h4>
          <ul>
            {resultados.map((item) => (
                <li
                key={item.id || Math.random()}
                onClick={() => {
                    onResultado && onResultado([item]); 
                }}
                style={{ cursor: "pointer" }}
                >
                {entidade === "aluno" && (
                    <>
                    <strong>{item.userDto?.nome}</strong> — Matrícula: {item.matricula}
                    </>
                )}
                {entidade === "professor" && (
                    <>
                    <strong>{item.nome}</strong> — Disciplina: {item.disciplina}
                    </>
                )}
                {entidade === "funcionario" && (
                    <>
                    <strong>{item.nome}</strong> — Setor: {item.setor}
                    </>
                )}
                </li>
            ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default BuscarEntidade;
