import { useState } from "react";
import styles from "./ListaPresenca.module.css";

function ListaPresenca({ alunos, onPresencaChange }) {
    const [fechado, setFechado] = useState(true);

    const totalPresentes = alunos.filter((aluno) => aluno.presenca).length;
    const totalAlunos = alunos.length;

    return (
        <details className={styles.chamadaCard}>
            <summary className={styles.cardHeader} onClick={() => setFechado(!fechado)}>
                <div className={styles.tituloContainer}>
                    <h3 className={styles.cardTitulo}>👨‍🎓 Lista de Chamada</h3>
                    <span className={styles.summaryBadge}>
                        {totalPresentes} / {totalAlunos} Presentes
                    </span>
                </div>
                <i className={`bi bi-chevron-${fechado ? "down" : "up"}`}></i>
            </summary>

            <div className={styles.listaContainer}>
                <ul className={styles.listaAlunos}>
                    {alunos.map((aluno) => (
                        <li
                            key={aluno.userDto?.userId || aluno.matricula}
                            className={styles.alunoItem}
                        >
                            <span className={styles.alunoNome}>
                                {aluno.userDto?.nome || "Sem nome"}
                            </span>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={aluno.presenca}
                                    onChange={() =>
                                        onPresencaChange(aluno.userDto?.userId, !aluno.presenca)
                                    }
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </details>
    );
}

export default ListaPresenca;
