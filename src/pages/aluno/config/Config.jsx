import styles from './Config.module.css';
import MudarFoto from './components/MudarFoto';
import MudarSenha from './components/MudarSenha';

function Config() {
    
    const usuarioLogado = {
    nome: "Pedro",
    email: "pedro@email.com",
    avatarUrl: "https://i.pravatar.cc/150?u=pedro"
    };

    return (
        <div className={styles.paginaContainer}>

            <MudarFoto
                avatarUrl={usuarioLogado.avatarUrl}
                nome={usuarioLogado.nome}
                email={usuarioLogado.email}
            />

            <MudarSenha />
            </div>
    );
}

export default Config;