import { Outlet, Link } from "react-router-dom";
import MateriaCard from "../components/CardAula";
import styles from "./ContainerAulas.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ContainerAulas() {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const fetchAulas = async () => {
            try {
                const response = await axios.get("http://localhost:8080/professor/buscar/turmasDisciplinas", {
                    withCredentials: true
                });
                setMaterias(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar aulas:", error);
            }
        };

        fetchAulas();
    }, []);

    return (
        <div>
            <div className={styles.paginaContainer}>
                <h1 className={styles.titulo}>📚 Disciplinas</h1>
                <div className={styles.gridMaterias}>
                    {materias.length > 0 ? (
                        materias.map((materia) => (
                            <Link
                                key={materia.idDisciplina}
                                to={`materia/${materia.idTurmaDisciplina}`}
                                state={{
                                    idProfessor: materia.idProfessor
                                }}
                                className={styles.linkMateria}
                            >
                                <MateriaCard materia={materia} />
                            </Link>
                        ))
                    ) : (
                        <p>Carregando aulas...</p>
                    )}
                </div>
            </div>

            <Outlet />
        </div>
    );
}

export default ContainerAulas;
