import { useEffect, useState } from "react";
import styles from "./Horarios.module.css";

function Horarios() {
    const [horarios, setHorarios] = useState([]);

    const diasSemana = [
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado",
        "domingo",
    ];

    useEffect(() => {
        const buscarHorarios = async () => {
            try {
                const response = await fetch("http://localhost:8080/horarios-fixos/buscarHorarioAluno", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar horários");
                }

                const data = await response.json();
                setHorarios(data);
            } catch (error) {
                console.error("Erro ao carregar horários:", error);
            }
        };

        buscarHorarios();
    }, []);

    const horariosAgrupados = horarios.reduce((acc, aula) => {
        const dia = aula.diaDaSemana.toLowerCase();
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(aula);
        return acc;
    }, {});

    return (
        <div className={styles.horariosContainer}>
            <h2 className={styles.titulo}>🗓️ Quadro de Horários</h2>
            <div className={styles.gridHorarios}>
                {diasSemana.map((dia) => (
                    <div key={dia} className={styles.diaCard}>
                        <h3 className={styles.diaTitulo}>{dia}</h3>
                        <ul className={styles.listaAulas}>
                            {horariosAgrupados[dia] && horariosAgrupados[dia].length > 0 ? (
                                horariosAgrupados[dia].map((aula, index) => (
                                    <li key={index} className={styles.aulaItem}>
                                        <div className={styles.aulaInfo}>
                                            <span className={styles.materia}>{aula.disciplinaNome}</span>
                                            <span className={styles.turma}>{`Turma: ${aula.turmaNome}`}</span>
                                        </div>
                                        <div className={styles.horarioTag}>
                                            {`${aula.horarioInicio} - ${aula.horarioTermino}`}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className={styles.aulaItemVazio}>
                                    <span className={styles.semAulaTexto}>Nenhuma aula neste dia</span>
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Horarios;
