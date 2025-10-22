import styles from "./ContainerEntidades.module.css"
import Entidade from "../components/Entidade";
import { Link } from "react-router-dom";

function ContainerEntidades({ titulo }){
    const entidades = [
            {type: "aluno" },
            {type: "professor" },
            {type: "administrador" },
            {type: "funcionario" },
            {type: "turma" },
            {type: "disciplina" },
            {type: "horário" },
        ];

    return(
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <h1 className={styles.titulo}>{titulo}</h1>
                <div className={styles.entidades}>
                        {entidades.map((entidade) => (
                            <Link
                            key={entidade.type}
                            to={`${entidade.type}`}
                            className={styles.link}
                            >
                            <Entidade type={entidade.type} />
                            </Link>
                        ))}
                </div>
            </div>
         </div>
    )
}

export default ContainerEntidades