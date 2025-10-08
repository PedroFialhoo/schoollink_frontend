import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./Layout.module.css";

function AlunoLayout() {

  const alunoLinks = [
    { to: "/aluno/home", icon: "bi bi-house-fill", label: "Home" },
    { to: "/aluno/notas", icon: "bi bi-list-columns-reverse", label: "Notas" },
    { to: "/aluno/presenca", icon: "bi bi-clipboard2-check-fill", label: "Presença" },
    { to: "/aluno/registro-aulas", icon: "bi bi-person-workspace", label: "Registro de Aulas" },
    { to: "/aluno/horarios", icon: "bi bi-clock-fill", label: "Horários" },
    { to: "/aluno/configuracoes", icon: "bi bi-gear-fill", label: "Configurações" },
    { to: "/aluno/sair", icon: "bi bi-box-arrow-right", label: "Sair" },
  ]
  
  return (
    <div className={styles.layout}>
      <Sidebar className={styles.sidebar} links={alunoLinks} />
      <div className={styles.conteudo}>
        <Outlet />
      </div>
    </div>
  );
}

export default AlunoLayout;
