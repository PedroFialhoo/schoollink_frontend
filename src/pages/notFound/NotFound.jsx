import styles from './NotFound.module.css';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function NotFound() {

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo SchoolLink" className={styles.logo} />
            
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.title}>Página Não Encontrada</h2>
            <p className={styles.description}>
                Oops! Parece que o link que você seguiu está quebrado ou a página foi removida.
            </p>
            <button onClick={() => navigate(-1)} className={styles.homeButton}>
                Voltar
            </button>
        </div>
    );
}

export default NotFound;