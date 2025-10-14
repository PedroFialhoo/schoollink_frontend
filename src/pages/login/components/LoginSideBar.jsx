import styles from "./LoginSideBar.module.css";

function LoginSideBar({ userType, setUserType }) {

  const handleSelect = (type) => {
    setUserType(type);
  };

  return (
    <div className={`${styles.side} ${styles[userType]}`}>
      <h1 className={styles.selectOp}>
        {userType === "admin" 
          ? "Administrador" 
          : userType.charAt(0).toUpperCase() + userType.slice(1)}
      </h1>

      <button
        className={`${styles.option} ${userType === "aluno" ? styles.optionSelect : ""} ${styles.aluno}`}
        onClick={() => handleSelect("aluno")}
      >
        <i className="bi bi-person-fill"></i> Aluno
      </button>

      <button
        className={`${styles.option} ${userType === "professor" ? styles.optionSelect : ""} ${styles.professor}`}
        onClick={() => handleSelect("professor")}
      >
        <i className="bi bi-person-workspace"></i> Professor
      </button>

      <button
        className={`${styles.option} ${userType === "admin" ? styles.optionSelect : ""} ${styles.admin}`}
        onClick={() => handleSelect("admin")}
      >
        <i className="bi bi-person-fill-gear"></i> Administrador
      </button>
    </div>
  );
}

export default LoginSideBar;
