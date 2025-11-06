// src/pages/ListaAlunos.jsx
import { useState, useEffect } from 'react';
import styles from './ListaAlunos.module.css';
// import { useParams } from 'react-router-dom'; // Em um app real

// --- Simulação de Dados ---
// Em um app real, você usaria o ID da URL (useParams) para buscar estes dados
const PROVA_ATUAL = {
  id: 1,
  nome: "P1 de Cálculo",
  materia: "Cálculo I",
  turma: "ES4A"
};

const ALUNOS_SIMULADOS = [
  { id: 1, matricula: "128", nome: "Allisson Castilho", nota: null },
  { id: 2, matricula: "129", nome: "Pedro Fialho", nota: 8.5 },
  { id: 3, matricula: "130", nome: "Ana Clara", nota: 9.0 },
  { id: 4, matricula: "131", nome: "Bruno Almeida", nota: null },
  { id: 5, matricula: "132", nome: "Carla Souza", nota: 7.0 },
  { id: 6, matricula: "133", nome: "Diogo Barroso", nota: 10.0 },
  { id: 7, matricula: "134", nome: "Elisa Fernandes", nota: null },
  { id: 8, matricula: "135", nome: "Fábio Gomes", nota: null },
];
// --- Fim da Simulação ---

function ListaAlunos() {
  // O estado 'notas' armazena as notas. Usamos um objeto (Map)
  // onde a chave é a matrícula do aluno.
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  // Efeito para carregar as notas iniciais (da simulação)
  useEffect(() => {
    // Transforma o array de alunos em um objeto de notas
    const notasIniciais = ALUNOS_SIMULADOS.reduce((acc, aluno) => {
      acc[aluno.matricula] = aluno.nota || ''; // Usa a nota existente ou string vazia
      return acc;
    }, {});
    
    setNotas(notasIniciais);
    setLoading(false);
  }, []);

  // Atualiza o estado quando o professor digita uma nota
  const handleNotaChange = (matricula, valor) => {
    // Remove mensagens de sucesso anteriores
    setMensagem(""); 

    // Limita o valor entre 0 e 10
    let nota = parseFloat(valor);
    if (isNaN(nota)) nota = '';
    if (nota > 10) nota = 10;
    if (nota < 0) nota = 0;

    setNotas(prevNotas => ({
      ...prevNotas,
      [matricula]: nota
    }));
  };

  // Simula o envio das notas para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salvando notas:", notas);
    // Aqui você faria a chamada para a API (ex: PUT /api/provas/1/notas)
    
    setMensagem("Notas salvas com sucesso!");
    // Esconde a mensagem após 3 segundos
    setTimeout(() => setMensagem(""), 3000);
  };

  if (loading) {
    return <h1 className={styles.feedback}>Carregando lista de alunos...</h1>;
  }

  return (
    <div className={styles.paginaContainer}>      
      <form className={styles.listaCard} onSubmit={handleSubmit}>
        <div className={styles.cardHeader}>
          <h2 className={styles.nomeProva}>{PROVA_ATUAL.nome}</h2>
          <p className={styles.infoTurma}>
            {PROVA_ATUAL.materia} — <strong>Turma: {PROVA_ATUAL.turma}</strong>
          </p>
        </div>

        <div className={styles.listaContainer}>
          {ALUNOS_SIMULADOS.map((aluno) => (
            <div key={aluno.matricula} className={styles.alunoItem}>
              <div className={styles.alunoInfo}>
                <span className={styles.alunoNome}>{aluno.nome}</span>
                <span className={styles.alunoMatricula}>Matrícula: {aluno.matricula}</span>
              </div>
              <div className={styles.notaInputContainer}>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className={styles.notaInput}
                  value={notas[aluno.matricula] || ''}
                  onChange={(e) => handleNotaChange(aluno.matricula, e.target.value)}
                  placeholder="-"
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cardFooter}>
          {mensagem && <p className={styles.mensagemSucesso}>{mensagem}</p>}
          <button type="submit" className={styles.botaoSalvar}>
            Salvar Notas
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListaAlunos;