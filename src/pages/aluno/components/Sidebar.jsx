import styles from "./Sidebar.module.css"

function Sidebar(){
    return(
        <nav className={styles.sidebar}>
        <img src="/src/assets/images/logo-white.png" alt="" className={styles.logo}/>
            <ul>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-house-fill"></i> <span>Home</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-list-columns-reverse"></i> <span>Notas</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-clipboard2-check-fill"></i> <span>Presença</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-person-workspace"></i> <span>Registro de Aulas</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-clock-fill"></i> <span>Horários</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-gear-fill"></i> <span>Configurações</span></a></li>
                <li className={styles.sideLi}><a className={styles.sideOp} ><i class="bi bi-box-arrow-right"></i> <span>Sair</span></a></li>

            </ul>
        </nav>
    )
}

export default Sidebar