// src/pages/CriarProva.jsx
import { useEffect, useState } from 'react';
import styles from './CriarProva.module.css';

// Mock de turmas (viria da API)
const TURMAS_EXEMPLO = [
  { id: 1, nome: "1A" },
  { id: 2, nome: "2A" },
  { id: 3, nome: "3A" },
  { id: 4, nome: "4A" },
];

// Mock de matérias por turma (simulando o backend)
const MATERIAS_POR_TURMA = {
  1: [
    { id: 1, nome: "Matemática Básica" },
    { id: 2, nome: "Português I" },
  ],
  2: [
    { id: 3, nome: "Cálculo I" },
    { id: 4, nome: "Programação Orientada a Objetos" },
  ],
  3: [
    { id: 5, nome: "Banco de Dados" },
    { id: 6, nome: "Engenharia de Software" },
  ],
  4: [
    { id: 7, nome: "Inteligência Artificial" },
    { id: 8, nome: "Redes de Computadores" },
  ],
};

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

  // Buscar turmas (simulação de API)
  useEffect(() => {
    // Aqui você faria: axios.get("/api/turmas")
    setTurmas(TURMAS_EXEMPLO);
  }, []);

  // Buscar matérias da turma selecionada
  useEffect(() => {
    if (!turmaId) {
      setMaterias([]);
      setMateriaId("");
      return;
    }

    // Aqui seria a requisição real:
    // axios.get(`/api/materias/turma/${turmaId}`)
    //      .then(res => setMaterias(res.data))
    //      .catch(() => setMaterias([]));

    // Simulação com mock
    const materiasTurma = MATERIAS_POR_TURMA[turmaId] || [];
    setMaterias(materiasTurma);
    setMateriaId("");
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
          
          {/* Turma */}
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

          {/* Matéria */}
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
