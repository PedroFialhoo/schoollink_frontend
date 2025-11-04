import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./Layout.module.css";

function AdminLayout() {
    const adminLinks = [
    { to: "/admin/home", icon: "bi bi-house-fill", label: "Home" },
    { to: "/admin/cadastrar", icon: "bi bi-plus-square", label: "Cadastrar" },
    { to: "/admin/editar", icon: "bi bi-pencil-square", label: "Editar" },
    { to: "/admin/gerar-aula", icon: "bi bi-calendar-week", label: "Gerar Aula" },
    { to: "/admin/configuracoes", icon: "bi bi-gear-fill", label: "Configurações" },
    { to: "/admin/sair", icon: "bi bi-box-arrow-right", label: "Sair" },
  ]

  return (
    <div className={styles.layout}>
      <Sidebar className={styles.sidebar} links={adminLinks} />
      <div className={styles.conteudo}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
