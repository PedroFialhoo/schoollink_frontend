import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

function Sidebar({ links = [] }) {
    return (
        <nav className={styles.sidebar}>
            <img src="/src/assets/images/logo-white.png" alt="Logo" className={styles.logo} />
            <ul>
                {links.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                                `${styles.sideOp} ${isActive ? styles.active : ""}`
                            }
                        >
                            <i className={link.icon}></i>
                            <span className={styles.sideText}>{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar
