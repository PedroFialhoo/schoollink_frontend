import styles from './Form.module.css';
import PasswordInput from '../../../../components/passwordInput/PasswordInput';


function FormAdmin({
    email, setEmail,
    senha, setSenha,
}) {
    return (
        <>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                />
            </div>
                <div className={styles.inputGroup}>
                <label htmlFor="senha">Senha</label>
                <PasswordInput
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
        </>
    )
}

export default FormAdmin;
