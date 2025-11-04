// src/pages/CriarProva.jsx
import { useEffect, useState } from 'react';
import styles from './CriarProva.module.css';


function CriarProva() {
  const [turmas, setTurmas] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [nomeProva, setNomeProva] = useState("");
  const [tipoProva, setTipoProva] = useState("");
  const [bimestre, setBimestre] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // 'sucesso' ou 'erro'

  useEffect(() => {

  fetch(`http://localhost:8080/turma/listar/professor/`,
    {
      credentials: "include",
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar turmas");
      }
      return response.json();
    })
    .then(data => {
      const turmasUnicas = [...new Map(data.map((t) => [t.id, t])).values()];
      console.log("Turmas", turmasUnicas)
      setTurmas(turmasUnicas);
    })
    .catch(error => {
      console.error(error);
      setTurmas([]);
    });
}, []);

  useEffect(() => {
    if (!turmaId) {
      setMaterias([]);
      setMateriaId("");
      return;
    }

    fetch(`http://localhost:8080/disciplina/buscar/turma/${turmaId}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar matérias");
        }
        return response.json();
      })
      .then((data) => {
        setMaterias(data), 
        console.log("Materias recebidas",materias)
      })
      .catch((error) => {
        console.error("erro", error);
        setMaterias([]);
      });
  }, [turmaId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem("");

    if (!nomeProva || !tipoProva || !bimestre || !materiaId || !turmaId) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("erro");
      return;
    }

    const novaProva = {
      turmaId: Number(turmaId),
      materiaId: Number(materiaId),
      nome: nomeProva,
      tipo: tipoProva,
      bimestre,
    };

    console.log("Enviando prova:", novaProva);

    setMensagem("Prova criada com sucesso!");
    setTipoMensagem("sucesso");

    setNomeProva("");
    setTipoProva("");
    setBimestre("");
    setMateriaId("");
    setTurmaId("");
  };

  return (
    <div className={styles.paginaContainer}>
      <div className={styles.provaCard}>
        <h2 className={styles.cardTitulo}>Criar Nova Prova</h2>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          
          <div className={styles.inputGroup}>
            <label htmlFor="turma">Turma</label>
            <select
              id="turma"
              value={turmaId}
              onChange={(e) => setTurmaId(e.target.value)}
            >
              <option value="">Selecione a turma...</option>
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {turma.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="materia">Matéria</label>
            <select
              id="materia"
              value={materiaId}
              onChange={(e) => setMateriaId(e.target.value)}
              disabled={!turmaId}
            >
              <option value="">
                {turmaId ? "Selecione a matéria..." : "Selecione uma turma primeiro"}
              </option>
              {materias.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {materia.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Nome da prova */}
          <div className={styles.inputGroup}>
            <label htmlFor="nomeProva">Nome da Prova</label>
            <input
              type="text"
              id="nomeProva"
              value={nomeProva}
              onChange={(e) => setNomeProva(e.target.value)}
              placeholder="Ex: Avaliação mensal"
            />
          </div>

          {/* Tipo */}
          <div className={styles.inputGroup}>
            <label htmlFor="tipoProva">Tipo da Prova</label>
            <select
              id="tipoProva"
              value={tipoProva}
              onChange={(e) => setTipoProva(e.target.value)}
            >
              <option value="">Selecione o tipo...</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="AC">AC (Atividade Contínua)</option>
              <option value="AF">AF (Avaliação Formativa)</option>
            </select>
          </div>

          {/* Bimestre */}
          <div className={styles.inputGroup}>
            <label htmlFor="bimestre">Bimestre</label>
            <select
              id="bimestre"
              value={bimestre}
              onChange={(e) => setBimestre(e.target.value)}
            >
              <option value="">Selecione o bimestre...</option>
              <option value="1B">1º Bimestre</option>
              <option value="2B">2º Bimestre</option>
              <option value="3B">3º Bimestre</option>
              <option value="4B">4º Bimestre</option>
            </select>
          </div>

          {/* Mensagem */}
          {mensagem && (
            <p
              className={`${styles.mensagem} ${
                tipoMensagem === "sucesso"
                  ? styles.mensagemSucesso
                  : styles.mensagemErro
              }`}
            >
              {mensagem}
            </p>
          )}

          <button type="submit" className={styles.botaoSalvar}>
            Salvar Prova
          </button>
        </form>
      </div>
    </div>
  );
}

export default CriarProva;
