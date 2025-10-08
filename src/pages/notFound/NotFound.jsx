import styles from './NotFound.module.css';
import logo from '../../assets/images/logo.png';

function NotFound() {
    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo SchoolLink" className={styles.logo} />
            
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.title}>Página Não Encontrada</h2>
            <p className={styles.description}>
                Oops! Parece que o link que você seguiu está quebrado ou a página foi removida.
            </p>
            <a href="/" className={styles.homeButton}>
                Voltar para o Início
            </a>
        </div>
    );
}

export default NotFound;