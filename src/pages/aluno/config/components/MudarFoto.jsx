import { useRef } from 'react';
import styles from './MudarFoto.module.css';

function MudarFoto({ avatarUrl, nome, email }) {

    const fileInputRef = useRef(null);

    const handleAlterarFotoClick = () => {
        fileInputRef.current.click();
    };

    return (
        
            <div className={styles.settingsCard}>
                <h2 className={styles.cardTitulo}>Foto de Perfil</h2>
                <div className={styles.perfilContainer}>
                    <img src={avatarUrl} alt="Avatar atual" className={styles.avatar} />
                    <div className={styles.perfilInfo}>
                        <p className={styles.nomeUsuario}>{nome}</p>
                        <p className={styles.emailUsuario}>{email}</p>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className={styles.hiddenInput}
                        />
                        <button onClick={handleAlterarFotoClick} className={styles.botao}>
                            Alterar Foto
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default MudarFoto