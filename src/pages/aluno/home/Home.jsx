import MuralAvisos from "./components/MuralAvisos";
import styles from "./Home.module.css";
import { useLocation } from "react-router-dom";

function HomeAluno() {
  const avisos = [
  {
    id: 1,
    professor: "Prof. João",
    mensagem: "Atenção, turma! A prova de Matemática foi adiada para a próxima quarta-feira devido a um feriado inesperado na escola. Aproveitem este tempo extra para revisar todos os capítulos, especialmente os exercícios de geometria analítica e funções polinomiais. Lembrem-se de que a prova terá questões abertas e de múltipla escolha."
  },
  {
    id: 2,
    professor: "Prof. Ana",
    mensagem: "Levem o material de História amanhã. Vamos iniciar a análise detalhada da Revolução Francesa, incluindo causas, consequências e impactos sociais. Cada aluno deverá trazer um resumo de uma página sobre o tema para discussão em sala de aula. Não esquecer de consultar livros e artigos confiáveis."
  },
  {
    id: 3,
    professor: "Prof. Carlos",
    mensagem: "Tragam calculadora científica, caderno e caneta azul. A aula de Física será prática e envolverá a montagem de circuitos elétricos simples. É extremamente importante seguir todas as instruções de segurança. Qualquer dúvida deve ser esclarecida antes do início do experimento."
  },
  {
    id: 4,
    professor: "Prof. Marina",
    mensagem: "Olá, pessoal! Esta semana teremos diversas atividades: uma apresentação de projeto interdisciplinar, entrega de trabalhos de Geografia e revisões para as provas. Recomendo organizar bem o tempo e priorizar as tarefas mais urgentes. O planejamento semanal estará disponível no mural da sala e no Google Classroom."
  },
  {
    id: 5,
    professor: "Prof. Rafael",
    mensagem: "Simulado surpresa de Física na próxima aula! Serão cobrados conteúdos desde o início do semestre, incluindo cinemática, leis de Newton e energia mecânica. É fundamental rever os exercícios feitos em sala e tirar dúvidas com antecedência. Boa sorte!"
  },
  {
    id: 6,
    professor: "Prof. Beatriz",
    mensagem: "Atenção: a aula de hoje foi cancelada devido à reunião pedagógica. Aproveitem para revisar os conteúdos passados e atualizar anotações. Sugiro que cada um faça resumos dos capítulos 3 e 4 de Biologia, destacando os principais conceitos sobre ecossistemas e cadeias alimentares."
  },
  {
    id: 7,
    professor: "Prof. Lucas",
    mensagem: "Aviso rápido: amanhã teremos debate sobre ética. Cada grupo deve preparar argumentos, exemplos e contra-argumentos. O objetivo é exercitar pensamento crítico e comunicação clara. A participação será avaliada, então estejam preparados!"
  },
  {
    id: 8,
    professor: "Prof. Gabriela",
    mensagem: "Levem caderno, caneta, régua, compasso e lápis de cor. A aula será prática e bastante detalhada, abordando a construção de mapas temáticos e análise de dados geográficos. A atenção aos detalhes é fundamental para o sucesso na atividade. Lembrem-se de que a precisão nos desenhos e gráficos contará pontos na avaliação."
  },
  {
    id: 9,
    professor: "Prof. Fernando",
    mensagem: "A prova de Química será impressa em duas folhas. Serão cobradas fórmulas, equações químicas e interpretação de gráficos. Lembrem-se de trazer caneta azul ou preta. O tempo será cronometrado, então pratiquem a resolução de exercícios em casa para garantir agilidade."
  },
  {
    id: 10,
    professor: "Prof. Helena",
    mensagem: "Hoje teremos apresentação de projetos. Cada grupo terá 10 minutos para apresentar e 5 minutos para perguntas. É importante que todos participem e que cada membro saiba explicar sua parte do trabalho. O uso de recursos visuais é recomendado e a postura durante a apresentação será avaliada."
  }
];

  const location = useLocation();
  const dados = location.state;

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>Bem-vindo, <span className={styles.nome}>{dados?.nome || "Aluno"}</span>!</h1>      
      <MuralAvisos avisos={avisos} />
    </div>
  );
}

export default HomeAluno;
