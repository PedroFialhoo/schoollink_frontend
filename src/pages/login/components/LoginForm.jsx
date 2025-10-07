import styles from "./LoginForm.module.css"
import { useNavigate } from "react-router-dom";


function LoginForm(){

    const navigate = useNavigate()

    function login(){
        navigate(`/aluno`)
    }


    return(
        <div className={styles.side}>
            <img src="src\assets\images\logo.png" className={styles.logo} alt=""/>
            <form className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <input type="text" className={styles.email} name="email" placeholder="Email" required/>                    
                </div>
                <div className={styles.formGroup}>
                    <input type="password" className={styles.password} name="password" placeholder="Senha" required/>
                </div>
                <button type="button" className={styles.loginBtn} onClick={() => login()}>Entrar</button>
            </form>
            <p className={styles.Message}></p>
        </div>
    )
}

export default LoginForm