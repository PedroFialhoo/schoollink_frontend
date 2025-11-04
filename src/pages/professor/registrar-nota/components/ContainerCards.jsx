// src/components/ContainerCards/ContainerCards.jsx
import { useState, useEffect } from 'react';
import CardProva from './CardProva';
import styles from './ContainerCards.module.css';
// import { useNavigate } from 'react-router-dom'; // Para uso real

function ContainerCards() {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    // Busca as provas do professor
    fetch("http://localhost:8080/prova/buscar/professor", {
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar provas");
        }
        return response.json();
      })
      .then(data => {
        // Mapeia os dados retornados do backend para o formato esperado pelo CardProva
        const provasMapeadas = data.map(prova => ({
          id: prova.idProva,
          nome: prova.nome,
          materia: prova.nomeDisciplina, // ou outro campo, se quiser exibir diferente
          turma: prova.nomeTurma,    // aqui você pode ajustar o texto exibido no card
          bimestre: prova.bimestre,
        }));
        setProvas(provasMapeadas);
      })
      .catch(error => {
        console.error("Erro ao carregar provas:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProvaClick = (provaId) => {
    // Em uma aplicação real:
    // navigate(`/professor/registrar-nota/${provaId}`);
    alert(`Navegando para registrar notas da prova ID: ${provaId}`);
  };

  if (loading) {
    return <div className={styles.feedback}>Carregando provas...</div>;
  }

  if (provas.length === 0) {
    return <div className={styles.feedback}>Nenhuma prova cadastrada.</div>;
  }

  return (
    <div className={styles.listaContainer}>
      {provas.map(prova => (
        <CardProva
          key={prova.id}
          prova={prova}
          onClick={() => handleProvaClick(prova.id)}
        />
      ))}
    </div>
  );
}

export default ContainerCards;
