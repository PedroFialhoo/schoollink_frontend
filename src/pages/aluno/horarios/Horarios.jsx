import styles from "./Horarios.module.css";

function Horarios() {
    
    const DADOS_HORARIOS = [
        {
            id: 1,
            dia: "Segunda-feira",
            horario: "08:00 - 09:40",
            materia: "Cálculo Numérico",
            turma: "ES4A",
        },
        {
            id: 2,
            dia: "Segunda-feira",
            horario: "10:00 - 11:40",
            materia: "Banco de Dados",
            turma: "ES4A",
        },
        {
            id: 3,
            dia: "Terça-feira",
            horario: "10:00 - 11:40",
            materia: "Engenharia de Requisitos",
            turma: "ES4A",
        },
        {
            id: 4,
            dia: "Quarta-feira",
            horario: "08:00 - 09:40",
            materia: "Cálculo Numérico",
            turma: "ES4A",
        },
        {
            id: 5,
            dia: "Quarta-feira",
            horario: "10:00 - 11:40",
            materia: "Programação Orientada a Objetos",
            turma: "ES4A",
        },
        {
            id: 7,
            dia: "Quinta-feira",
            horario: "08:00 - 11:40",
            materia: "Projeto Integrador IV",
            turma: "ES4A",
        },
        {
            id: 8,
            dia: "Quinta-feira",
            horario: "08:00 - 09:40",
            materia: "Cálculo Numérico",
            turma: "ES4A",
        },
        {
            id: 9,
            dia: "Quinta-feira",
            horario: "10:00 - 11:40",
            materia: "Programação Orientada a Objetos",
            turma: "ES4A",
        },
        {
            id: 6,
            dia: "Sexta-feira",
            horario: "08:00 - 11:40",
            materia: "Projeto Integrador IV",
            turma: "ES4A",
        },
    ];

    const horariosAgrupados = DADOS_HORARIOS.reduce((acc, aula) => {
        const dia = aula.dia;
        if (!acc[dia]) {
            acc[dia] = [];
        }
        acc[dia].push(aula);
        return acc;
    }, {});

    return (
        <div className={styles.horariosContainer}>
            <h2 className={styles.titulo}>🗓️ Quadro de Horários</h2>
            <div className={styles.gridHorarios}>
                {Object.keys(horariosAgrupados).map(dia => (
                    <div key={dia} className={styles.diaCard}>
                        <h3 className={styles.diaTitulo}>{dia}</h3>
                        <ul className={styles.listaAulas}>
                            {horariosAgrupados[dia].map(aula => (
                                <li key={aula.id} className={styles.aulaItem}>
                                    <div className={styles.aulaInfo}>
                                        <span className={styles.materia}>{aula.materia}</span>
                                        <span className={styles.turma}>{`Turma: ${aula.turma}`}</span>
                                    </div>
                                    <div className={styles.horarioTag}>
                                        {aula.horario}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Horarios;