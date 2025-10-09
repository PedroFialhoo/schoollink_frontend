import styles from './Presenca.module.css';
import { useParams } from 'react-router-dom';

function Presenca() {
  const { id } = useParams();

  const materias = [
    {
      id: 1,
      nome: "Cálculo I",
      dadosFrequencia: {
        aulasTotais: 100,
        presencas: 65,
        ausencias: 35
      }
    },
    {
      id: 2,
      nome: "Programação Orientada a Objetos",
      dadosFrequencia: {
        aulasTotais: 90,
        presencas: 69,
        ausencias: 21
      }
    },
    {
      id: 3,
      nome: "Banco de Dados",
      dadosFrequencia: {
        aulasTotais: 95,
        presencas: 88,
        ausencias: 7
      }
    },
    {
      id: 4,
      nome: "Estruturas de Dados",
      dadosFrequencia: {
        aulasTotais: 100,
        presencas: 92,
        ausencias: 8
      }
    },
    {
      id: 5,
      nome: "Engenharia de Software",
      dadosFrequencia: {
        aulasTotais: 80,
        presencas: 75,
        ausencias: 5
      }
    },
    {
      id: 6,
      nome: "Redes de Computadores",
      dadosFrequencia: {
        aulasTotais: 85,
        presencas: 70,
        ausencias: 15
      }
    },
    {
      id: 7,
      nome: "Sistemas Operacionais",
      dadosFrequencia: {
        aulasTotais: 90,
        presencas: 85,
        ausencias: 5
      }
    },
    {
      id: 8,
      nome: "Matemática Discreta",
      dadosFrequencia: {
        aulasTotais: 100,
        presencas: 80,
        ausencias: 20
      }
    },
    {
      id: 9,
      nome: "Arquitetura de Computadores",
      dadosFrequencia: {
        aulasTotais: 85,
        presencas: 82,
        ausencias: 3
      }
    },
    {
      id: 10,
      nome: "Desenvolvimento Web",
      dadosFrequencia: {
        aulasTotais: 100,
        presencas: 95,
        ausencias: 5
      }
    }
  ];

  const materia = materias.find(m => m.id === Number(id));

  if (!materia) {
    return <p className={styles.mensagemErro}>Matéria não encontrada.</p>;
  }

  const { nome, dadosFrequencia } = materia;
  const { aulasTotais, presencas, ausencias } = dadosFrequencia;

  const frequencia = aulasTotais > 0 ? (presencas / aulasTotais) * 100 : 0;
  const frequenciaFormatada = Math.round(frequencia);

  let status = 'ok';
  if (frequencia < 75) {
    status = 'perigo';
  } else if (frequencia < 80) {
    status = 'atencao';
  }

  return (
    <div className={styles.painelContainer}>
      <h2 className={styles.titulo}>Frequência - {nome}</h2>

      <div className={styles.conteudo}>
        <div className={styles.graficoContainer}>
          <div
            className={`${styles.circuloProgresso} ${styles[status]}`}
            style={{ '--frequencia-percent': `${frequenciaFormatada}%` }}
          >
            <div className={styles.textoProgresso}>
              <span>{frequenciaFormatada}%</span>
              <small>Frequência</small>
            </div>
          </div>
        </div>

        <ul className={styles.estatisticas}>
          <li>
            <span>Aulas Totais</span>
            <strong>{aulasTotais}</strong>
          </li>
          <li>
            <span>Presenças</span>
            <strong>{presencas}</strong>
          </li>
          <li>
            <span>Ausências</span>
            <strong>{ausencias}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Presenca;
