import { useState } from "react";
import styles from "./PasswordInput.module.css"

function PasswordInput(props){
    
    const [eyeState, setEyeState] = useState(true);

    function eyeClick(eyeState){
        setEyeState(!eyeState)
    }

    return(
        <div className={styles.container}>
            <input
                type={eyeState ? "password" : "text"}
                {...props}
            />
            <i onClick={() => eyeClick(eyeState)} className={`bi ${eyeState ? "bi-eye" : "bi-eye-slash"} ${styles.eye}`}></i>
        </div> 
    )
}

export default PasswordInput