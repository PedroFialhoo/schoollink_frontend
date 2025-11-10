import styles from "./Logout.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Logout() {
    const location = useLocation();
    const partes = location.pathname.split("/"); // divide por "/"
    console.log(partes); // ["", "tipo de usuario", "sair"]
    
    const tipo = partes[1]; 
    
    const navigate = useNavigate();
    const handleSair = () => {
        navigate("/")
    };

    const handleCancelar = () => {
        navigate(`/${tipo}/home`)
    };
    const [userName, setUserName] = useState("Usuário");

    useEffect(() => {
        fetch(`http://localhost:8080/${tipo}/me`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) =>
            response.json().then((data) => ({
              status: response.status,
              body: data,
            }))
          )
          .then(({ status, body }) => {
            if (status === 200 && body !== null) {
              setUserName(body.nome);
            } else {
              setMessage("Erro inesperado. Tente novamente.");
            }
          })
          .catch((error) => {
            setMessage("Erro ao tentar buscar dados. Tente novamente.");
            console.error(error);
          });
      }, []);
    

    return (
        <div className={styles.painelContainer}>
            <div className={styles.usuarioInfo}>
                <img 
                    src="/src/assets/images/favicon.ico"
                    alt="Avatar do usuário" 
                    className={styles.avatar} 
                />
                <h3 className={styles.usuarioNome}>{userName}</h3>
                <p className={styles.mensagem}>Você tem certeza que deseja sair?</p>
            </div>

            <div className={styles.botoesAcao}>
                <button 
                    onClick={handleCancelar} 
                    className={`${styles.botao} ${styles.botaoCancelar}`}
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleSair} 
                    className={`${styles.botao} ${styles.botaoSair}`}
                >
                    Sair
                </button>
            </div>
        </div>
    );
}

export default Logout;