import styles from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

const usuarioLogado = {
    nome: "Pedro",
    avatarUrl: "https://i.pravatar.cc/150?u=pedro" 
};



function Logout() {
    
    const navigate = useNavigate();
    const handleSair = () => {
        navigate("/")
    };

    const handleCancelar = () => {
        navigate("/aluno/home")
    };

    return (
        <div className={styles.painelContainer}>
            <div className={styles.usuarioInfo}>
                <img 
                    src={usuarioLogado.avatarUrl} 
                    alt="Avatar do usuário" 
                    className={styles.avatar} 
                />
                <h3 className={styles.usuarioNome}>{usuarioLogado.nome}</h3>
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