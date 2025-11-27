// src/components/ContainerCards/ContainerCards.jsx
import { useState, useEffect } from 'react';
import CardProva from './CardProva';
import styles from './ContainerCards.module.css';
import { useNavigate } from 'react-router-dom';

function ContainerCards() {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  
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

  const handleProvaClick = (prova) => {
     navigate(`/professor/notas/${prova.id}`, { state: { prova } });
  };

  const provasFiltradas = provas.filter((prova) => 
    prova.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.feedback}>Carregando provas...</div>;
  }

  return (
    <div>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="🔍 Pesquisar prova por nome..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {provasFiltradas.length === 0 ? (
        <div className={styles.feedback}>Nenhuma prova encontrada.</div>
      ) : (
        <div className={styles.listaContainer}>
          {[...provasFiltradas].reverse().map(prova => (
            <CardProva
              key={prova.id}
              prova={prova}
              onClick={() => handleProvaClick(prova)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContainerCards;