import { useState } from "react"
import styles from "./GerarAulas.module.css"

function GerarAulas(){
    const [mensagem, setMensagem] = useState("")
    const gerarAulas = () => {
        fetch("http://localhost:8080/aulas/gerar-semana", {
            method: "POST" 
        })
            .then(response => {
            if (response.ok) {
                setMensagem("Aulas geradas com sucesso!");
            } else {
                setMensagem("Erro ao gerar aulas.");
            }
            })
            .catch(error => {
            console.error("Erro na requisição:", error);
            setMensagem("Erro de conexão com o servidor.");
            });
        };

    return(
        <div className={styles.container}>
           <button className={styles.botao} onClick={gerarAulas}>Gerar Aulas <i className="bi bi-magic"></i></button> 
           {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </div>        
    )
}

export default GerarAulas