import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PontosAdminPage.module.css";

export default function PontosAdminPage() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        fetch("http://localhost:8080/funcionario/buscar-todos", {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            setFuncionarios(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
        });
    }, []);

    const funcionariosFiltrados = funcionarios.filter((func) =>
        func.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const handleFuncionarioClick = (id, nome) => {
        const currentPath = location.pathname.replace(/\/$/, "");
        navigate(`${currentPath}/${id}?name=${encodeURIComponent(nome)}`);
    };

    const getIniciais = (nome) => {
        const nomes = nome.split(' ');
        if (nomes.length >= 2) {
            return `${nomes[0][0]}${nomes[1][0]}`.toUpperCase();
        }
        return nome[0].toUpperCase();
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.tituloPrincipal}>Controle de Ponto</h1>
                <p className={styles.subtitulo}>Selecione um funcionário para visualizar o histórico de pontos.</p>
                
                <div className={styles.searchContainer}>
                    <i className="bi bi-search"></i>
                    <input 
                        type="text" 
                        placeholder="Pesquisar funcionário por nome..." 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Carregando funcionários...</div>
            ) : (
                <div className={styles.gridFuncionarios}>
                    {funcionariosFiltrados.length > 0 ? (
                        funcionariosFiltrados.map((func) => (
                            <div 
                                key={func.idFuncionario} 
                                className={styles.cardFuncionario}
                                onClick={() => handleFuncionarioClick(func.idFuncionario, func.nome)}
                            >
                                <div className={styles.avatar}>
                                    {getIniciais(func.nome)}
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.nome}>{func.nome}</h3>
                                    <p className={styles.email}>{func.email}</p>
                                    <span className={styles.verDetalhes}>
                                        Ver pontos <i className="bi bi-arrow-right"></i>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semResultados}>
                            <p>Nenhum funcionário encontrado com o nome "{busca}".</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}