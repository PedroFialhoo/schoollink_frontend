import styles from './MudarSenha.module.css';

function MudarSenha() {
    return(
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Alterar Senha</h2>
            <form className={styles.senhaForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="senha-atual">Senha Atual</label>
                    <input type="password" id="senha-atual" />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="nova-senha">Nova Senha</label>
                    <input type="password" id="nova-senha"/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmar-senha">Confirmar Nova Senha</label>
                    <input type="password" id="confirmar-senha"/>
                </div>

                <button type="submit" className={`${styles.botao} ${styles.botaoSalvar}`}>
                    Salvar Alterações
                </button>
            </form>
        </div>
    )
}

export default MudarSenha