import { Outlet } from "react-router-dom";
import Sidebar from "../pages/aluno/sidebar/Sidebar";
import styles from "./AlunoLayout.module.css"

export default function AlunoLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
