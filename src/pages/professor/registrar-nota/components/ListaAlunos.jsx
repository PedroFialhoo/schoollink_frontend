import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ListaAlunos.module.css';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  
  const location = useLocation();
  const { id } = useParams();
  const { prova } = location.state || {};

  useEffect(() => {
    const provaId = id || prova?.id;
    if (!provaId) return;

    fetch(`http://localhost:8080/prova/buscar/AlunoProva/${provaId}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar alunos');
        return res.json();
      })
      .then((data) => {
        setAlunos(data);
        const notasIniciais = data.reduce((acc, aluno) => {
          acc[aluno.idAluno] = aluno.nota ?? '';
          return acc;
        }, {});
        setNotas(notasIniciais);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, prova]);

  const handleNotaChange = (idAluno, valor) => {
    setMensagem('');
    let nota = parseFloat(valor);
    if (isNaN(nota)) nota = '';
    if (nota > 10) nota = 10;
    if (nota < 0) nota = 0;
    setNotas((prev) => ({ ...prev, [idAluno]: nota }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alunos.length || !prova?.id) {
      setMensagem('Nenhum aluno ou prova selecionada.');
      return;
    }
    const notasParaEnviar = alunos.map((aluno) => ({
      idAluno: aluno.idAluno, 
      idProva: prova.id,
      nota: parseFloat(notas[aluno.idAluno]) || 0
    }));

    fetch('http://localhost:8080/prova/lancar-notas/turma', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notasParaEnviar),
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao salvar notas');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Resposta do servidor:', data);
        setMensagem('✅ Notas salvas com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
      })
      .catch((err) => {
        console.error(err);
        setMensagem('❌ Erro ao salvar notas. Tente novamente.');
        setTimeout(() => setMensagem(''), 3000);
      });
  };


  if (loading) {
    return <h1 className={styles.feedback}>Carregando lista de alunos...</h1>;
  }

  return (
    <div className={styles.paginaContainer}>
      <form className={styles.listaCard} onSubmit={handleSubmit}>
        <div className={styles.cardHeader}>
          <h2 className={styles.nomeProva}>{prova?.nome || 'Prova'}</h2>
          <p className={styles.infoTurma}>
            {prova?.materia} — <strong>Turma: {prova?.turma}</strong>
          </p>
        </div>

        <div className={styles.listaContainer}>
          {alunos.map((aluno) => (
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
                  value={notas[aluno.idAluno] ?? ''}
                  onChange={(e) => handleNotaChange(aluno.idAluno, e.target.value)}
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
