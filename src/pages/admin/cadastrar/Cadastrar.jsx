import Entidade from "./components/Entidade";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./Cadastrar.module.css";

function Cadastrar() {
    const entidades = [
        {type: "aluno" },
        {type: "professor" },
        {type: "administrador" },
    ];
    return (
        <div className={styles.cadastrar}>
            <div className={styles.containerCadastrar}>
                <h1 className={styles.titulo}>Cadastrar</h1>
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
            
            <Outlet />
        </div>
    );
}

export default Cadastrar;