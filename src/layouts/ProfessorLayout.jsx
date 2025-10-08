import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./Layout.module.css";

function ProfessorLayout() {
    const professorLinks = [
    { to: "/professor/home", icon: "bi bi-house-fill", label: "Home" },
    { to: "/professor/notas", icon: "bi bi-list-columns-reverse", label: "Registrar Nota" },
    { to: "/professor/presenca", icon: "bi bi-clipboard2-check-fill", label: "Registrar Presença" },
    { to: "/professor/registro-aulas", icon: "bi bi-person-workspace", label: "Registrar Aula" },
    { to: "/professor/configuracoes", icon: "bi bi-gear-fill", label: "Configurações" },
    { to: "/professor/sair", icon: "bi bi-box-arrow-right", label: "Sair" },
  ]

  return (
    <div className={styles.layout}>
      <Sidebar className={styles.sidebar} links={professorLinks} />
      <div className={styles.conteudo}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfessorLayout;
