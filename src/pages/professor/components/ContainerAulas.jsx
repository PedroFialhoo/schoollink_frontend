import { Outlet, Link } from "react-router-dom";
import MateriaCard from "../components/CardAula";
import styles from "./ContainerAulas.module.css"; // Importando o CSS Module
import { useEffect } from "react";

function ContainerAulas() {
    const materias = [
        {
            "idHorarioAula": 4,
            "idDisciplina": 4,
            "idProfessor": 3,
            "nomeDisciplina": "Banco de dados",
            "horarioInicio": "10:00:00",
            "horarioTermino": "12:00:00"
        },
    {
            "idHorarioAula": 4,
            "idDisciplina": 4,
            "idProfessor": 3,
            "nomeDisciplina": "Banco de dados",
            "horarioInicio": "10:00:00",
            "horarioTermino": "12:00:00"
        },
    {
            "idHorarioAula": 4,
            "idDisciplina": 4,
            "idProfessor": 3,
            "nomeDisciplina": "Banco de dados",
            "horarioInicio": "10:00:00",
            "horarioTermino": "12:00:00"
        },
    {
            "idHorarioAula": 4,
            "idDisciplina": 4,
            "idProfessor": 3,
            "nomeDisciplina": "Banco de dados",
            "horarioInicio": "10:00:00",
            "horarioTermino": "12:00:00"
        }
    ]

    // useEffect(
    //     fetch("http://localhost:8080/")
    // )

    return (
        <div>
        <div className={styles.paginaContainer}>
            <h1 className={styles.titulo}>📚 Disciplinas</h1>
            <div className={styles.gridMaterias}>
                {materias.map((materia) => (
                    <Link 
                    key={materia.idDisciplina} 
                    to={`materia/${materia.idDisciplina}`} 
                    className={styles.linkMateria}
                    >
                    <MateriaCard materia={materia} />
                    </Link>
                ))}
            </div>
        </div>
        
        <Outlet/>
        </div>
    );
}

export default ContainerAulas;