import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import MateriaCard from "../components/MateriaCard";
import styles from "./CarregarDisciplinas.module.css";

function CarregarDisciplinas() {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get("http://localhost:8080/aluno/buscarDisciplinas", {
                    withCredentials: true,
                });

                const dadosAdaptados = response.data.map((item) => ({
                    idDisciplina: item.idDisciplina,
                    nome: item.nomeDisciplina,
                    idProfessor: item.idProfessor,
                    professor: item.nomeProfessor,
                    idTurmaDisciplina: item.idTurmaDisciplina,
                    icone: "📘",
                }));

                setMaterias(dadosAdaptados);
            } catch (error) {
                console.error("Erro ao buscar disciplinas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterias();
    }, []);

    if (loading) {
        return <p className={styles.loading}>Carregando disciplinas...</p>;
    }

    return (
        <div>
            <div className={styles.paginaContainer}>
                <h1 className={styles.titulo}>📚 Disciplinas</h1>
                <div className={styles.gridMaterias}>
                    {materias.length > 0 ? (
                        materias.map((materia) => (
                            <Link
                                key={materia.idDisciplina}
                                to={`materia/${materia.idDisciplina}?idTurmaDisciplina=${materia.idTurmaDisciplina}`}
                                className={styles.linkMateria}
                            >
                                <MateriaCard materia={materia} />
                            </Link>
                        ))
                    ) : (
                        <p>Nenhuma disciplina encontrada.</p>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );


}

export default CarregarDisciplinas;
