import styles from './Notas.module.css';
import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';


const materiasComNotas = [
    {
    id: 1,
    nome: "Cálculo I",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 9.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 6.0 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.5 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 9.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 9.5 }
    ]
  },
  {
    id: 2,
    nome: "Programação Orientada a Objetos",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 10.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 9.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 8.5 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 9.5 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.5 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 9.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 9.0 }
    ]
  },
  {
    id: 3,
    nome: "Banco de Dados",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 4.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 6.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 5.0 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 7.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.5 }
    ]
  },
  {
    id: 4,
    nome: "Engenharia de Requisitos",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 8.5 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 7.5 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 7.0 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.5 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 9.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 9.0 }
    ]
  },
  {
    id: 5,
    nome: "Cálculo Numérico",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 9.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 8.5 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 9.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.5 }
    ]
  },
  {
    id: 6,
    nome: "Sistemas Operacionais",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 7.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 6.5 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.0 }
    ]
  },
  {
    id: 7,
    nome: "Redes de Computadores",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 6.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 7.0 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 6.5 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 7.5 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.5 }
    ]
  },
  {
    id: 8,
    nome: "Matemática Discreta",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 7.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 6.5 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 6.0 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 7.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.5 }
    ]
  },
  {
    id: 9,
    nome: "Inteligência Artificial",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 6.0 },
      { periodo: "1º Bimestre", tipo: "P2", valor: 7.0 },
      { periodo: "1º Bimestre", tipo: "AF", valor: 10.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 6.5 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 5.5 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 6.0 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 7.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 7.5 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 7.5 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 8.0 }
    ]
  },
  {
    id: 10,
    nome: "Linguagens Formais e Autômatos",
    notas: [
      { periodo: "1º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "1º Bimestre", tipo: "AC", valor: 8.5 },
      { periodo: "2º Bimestre", tipo: "P1", valor: 8.0 },
      { periodo: "2º Bimestre", tipo: "AC", valor: 8.5 },
      { periodo: "3º Bimestre", tipo: "P1", valor: 9.0 },
      { periodo: "3º Bimestre", tipo: "AC", valor: 9.0 },
      { periodo: "4º Bimestre", tipo: "P1", valor: 9.5 },
      { periodo: "4º Bimestre", tipo: "AC", valor: 9.5 }
    ]
  }
];

const calcularMedia = (notas) => {
  if (!notas || notas.length === 0) return 0;
  const somaProdutos = notas.reduce((acc, nota) => acc + (nota.valor), 0);
  return somaProdutos > 0 ? (somaProdutos / notas.length) : 0;
};

const getStatusNota = (nota) => {
  if (nota >= 7.5) return 'aprovado';
  if (nota >= 6) return 'atencao';
  return 'reprovado';
};

function Notas() {
  const { id } = useParams();
  const materia = materiasComNotas.find(m => m.id === Number(id));

  if (!materia) {
    return <p className={styles.mensagemErro}>Matéria não encontrada.</p>;
  }

  const notasPorPeriodo = materia.notas.reduce((acc, nota) => {
    const periodo = nota.periodo;
    if (!acc[periodo]) acc[periodo] = [];
    acc[periodo].push(nota);
    return acc;
  }, {});

  const mediasPorPeriodo = Object.keys(notasPorPeriodo).map(periodo => {
    return calcularMedia(notasPorPeriodo[periodo]);
  });

  const mediaFinal = mediasPorPeriodo.length > 0 
    ? mediasPorPeriodo.reduce((acc, media) => acc + media, 0) / mediasPorPeriodo.length
    : 0;

  const statusFinal = getStatusNota(mediaFinal);

  const detalhesRef = useRef(null);
  const [aberto, setAberto] = useState(false);

  const verificarOpen = () => {
    if (detalhesRef.current) {
      setAberto(detalhesRef.current.open);
    }
  };

  return (
    <details ref={detalhesRef} onToggle={verificarOpen} className={styles.painelContainer} open>
      <summary className={styles.cabecalho}>
        <span className={styles.nomeMateria}>{materia.nome}</span>
        <i className={`${`bi bi-arrow-bar-${aberto ? "up" : "down"}`} ${styles.arrow}`}></i>
        <div className={styles.mediaFinalContainer}>
          <span>Média Final</span>
          <strong className={`${styles.mediaTag} ${styles[statusFinal]}`}>
            {mediaFinal.toFixed(1)}
          </strong>
        </div>
      </summary>

      <div className={styles.corpoDetalhes}>
        {Object.keys(notasPorPeriodo).map(periodo => {
          const notasDoPeriodo = notasPorPeriodo[periodo];
          const mediaDoPeriodo = calcularMedia(notasDoPeriodo);
          const statusPeriodo = getStatusNota(mediaDoPeriodo);

          return (
            <div key={periodo} className={styles.periodoCard}>
              <div className={styles.periodoHeader}>
                <h4>{periodo}</h4>
                <strong className={`${styles.mediaTag} ${styles[statusPeriodo]}`}>
                  Média: {mediaDoPeriodo.toFixed(1)}
                </strong>
              </div>
              <ul className={styles.listaNotas}>
                {notasDoPeriodo.map((nota, index) => (
                  <li key={index}>
                    <span>{nota.tipo}</span>
                    <span className={`${styles[getStatusNota(nota.valor)]} ${styles.nota}`}>
                      {nota.valor.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export default Notas;
