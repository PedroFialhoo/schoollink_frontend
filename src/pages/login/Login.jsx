import LoginForm from "./components/LoginForm"
import LoginSideBar from "./components/LoginSideBar"
import styles from "./Login.module.css"

function Login(){
    return(
        <div className={styles.container}>
            <LoginForm />
            <LoginSideBar />
        </div>        
    )
}

export default Login