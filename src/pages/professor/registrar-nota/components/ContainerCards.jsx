// src/components/ContainerCards/ContainerCards.jsx
import { useState, useEffect } from 'react';
import CardProva from './CardProva';
import styles from './ContainerCards.module.css';
import { useNavigate } from 'react-router-dom'

function ContainerCards() {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
        const provasMapeadas = data.map(prova => ({
          id: prova.idProva,
          nome: prova.nome,
          materia: prova.nomeDisciplina, 
          turma: prova.nomeTurma,    
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
     navigate(`/professor/notas/${provaId}`);
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
