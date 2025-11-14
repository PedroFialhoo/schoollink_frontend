import { useState, useEffect } from "react";
import MuralAvisos from "../../../components/muralAvisos/MuralAvisos";
import styles from "./HomeAdmin.module.css";

function HomeAdmin(){
    const [avisos, setAvisos] = useState([])
    const [userName, setUserName] = useState("Administrador")

    useEffect(() => {
    fetch("http://localhost:8080/mural/buscarAvisos", {
        method: "GET",
        credentials: "include", 
        })
        .then((response) =>
            response.json().then((data) => ({
            status: response.status,
            body: data,
            }))
        )
        .then(({ status, body }) => {
            if (status === 200 && Array.isArray(body)) {
            const avisosConvertidos = body.map((a) => ({
                id: a.id,
                autor: a.nomeProfessor ? a.nomeProfessor : "Coordenação",
                mensagem: a.mensagem,
            }));

            setAvisos(avisosConvertidos.reverse());
            } else {
            setAvisos([]);
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar avisos:", error);
            setAvisos([]);
        });
    }, []);

    return (
        <div className={styles.home}>
            <h1 className={styles.welcome}>Bem-vindo ao SchoolLink!</h1>      
            <MuralAvisos avisos={avisos} />
        </div>
    );
}

export default HomeAdmin