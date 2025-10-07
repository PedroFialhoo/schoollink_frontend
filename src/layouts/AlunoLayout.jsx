import { Outlet } from "react-router-dom";
import Sidebar from "../pages/aluno/sidebar/Sidebar";
import styles from "./AlunoLayout.module.css"

function AlunoLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar className={styles.sidebar} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AlunoLayout