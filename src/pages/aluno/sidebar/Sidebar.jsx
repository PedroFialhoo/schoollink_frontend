import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

function Sidebar() {
    return (
        <nav className={styles.sidebar}>
            <img src="/src/assets/images/logo-white.png" alt="" className={styles.logo} />
            <ul>
                <li>
                    <NavLink
                        to="/aluno/home"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-house-fill"></i>
                        <span className={styles.sideText}>Home</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/notas"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-list-columns-reverse"></i>
                        <span className={styles.sideText}>Notas</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/presenca"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-clipboard2-check-fill"></i>
                        <span className={styles.sideText}>Presença</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/registro-aulas"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-person-workspace"></i>
                        <span className={styles.sideText}>Registro de Aulas</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/horarios"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-clock-fill"></i>
                        <span className={styles.sideText}>Horários</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/configuracoes"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-gear-fill"></i>
                        <span className={styles.sideText}>Configurações</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/aluno/sair"
                        className={({ isActive }) =>
                            `${styles.sideOp} ${isActive ? styles.active : ""}`
                        }
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <span className={styles.sideText}>Sair</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
