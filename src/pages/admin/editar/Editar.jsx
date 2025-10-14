import { Outlet } from "react-router-dom";
import styles from "../components/Page.module.css";
import ContainerEntidades from "../components/ContainerEntidades";

function Editar() {
    return (
        <div className={styles.pagina}>

            <ContainerEntidades titulo= "Editar"/>
            
            <Outlet />
        </div>
    );
}

export default Editar;