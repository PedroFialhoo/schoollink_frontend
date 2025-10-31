import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./Layout.module.css";

function ProfessorLayout() {
    const professorLinks = [
    { to: "/professor/home", icon: "bi bi-house-fill", label: "Home" },
    { to: "/professor/prova", icon: "bi bi-file-earmark-medical", label: "Criar prova" },
    { to: "/professor/notas", icon: "bi bi-list-columns-reverse", label: "Registrar Nota" },
    { to: "/professor/registrar-aula", icon: "bi bi-person-workspace", label: "Registrar Aula" },
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
