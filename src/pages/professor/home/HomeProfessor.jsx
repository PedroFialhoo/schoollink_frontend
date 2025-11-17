import { useState, useEffect } from "react";
import MuralAvisos from "../../../components/muralAvisos/MuralAvisos";
import styles from "./HomeProfessor.module.css";
import CriarAviso from "../../../components/muralAvisos/CriarAviso.jsx";    

function HomeProfessor(){
    const [avisos, setAvisos] = useState([]);
    const [userName, setUserName] = useState("Professor");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [turmas, setTurmas] = useState([]);

    // Buscar nome do professor
    useEffect(() => {
        fetch("http://localhost:8080/professor/me", {
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
            if (status === 200 && body !== null) {
                setUserName(body.nome);
            } else {
                setMessage("Erro inesperado. Tente novamente.");
            }
        })
        .catch((error) => {
            setMessage("Erro ao tentar buscar dados. Tente novamente.");
            console.error(error);
        });
    }, []);  

    // Buscar avisos
    function fetchAvisos(){
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
    }
    
    useEffect(() => {
        fetchAvisos();
    }, []);

    // Buscar turmas do professor
    useEffect(() => {
        fetch("http://localhost:8080/turma/listar/professor/", {
            method: "GET",
            credentials: "include",
        })
        .then((res) =>
            res.json().then((data) => ({
                status: res.status,
                body: data,
            }))
        )
        .then(({ status, body }) => {
            if (status === 200 && Array.isArray(body)) {
                const unicas = [];
                const idsVistos = new Set();

                body.forEach((t) => {
                    if (!idsVistos.has(t.id)) {
                        idsVistos.add(t.id);
                        unicas.push({
                            id: t.id,
                            nome: t.nome,
                        });
                    }
                });

                setTurmas(unicas);
            } else {
                setTurmas([]);
            }
        })
        .catch((err) => {
            console.error("Erro ao buscar turmas do professor:", err);
            setTurmas([]);
        });
    }, []);

    const handlePostAviso = (novoAviso) => {
        const idTurma = novoAviso.idTurma === "all" ? null : Number(novoAviso.idTurma);

        return fetch("http://localhost:8080/mural/cadastrarAviso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                mensagem: novoAviso.mensagem,
                idTurma: idTurma,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha ao criar o aviso.");
            }
            setIsModalOpen(false);
            return fetchAvisos();
        })
        .catch(error => {
            console.error("Erro ao postar aviso:", error);
            throw error; 
        });
    };

    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <h1 className={styles.welcome}>
                    Bem-vindo, <span className={styles.nome}>{userName}</span>!
                </h1>
            </div>

            <MuralAvisos avisos={avisos} />

            <button
                className={styles.botaoCriarAviso}
                onClick={() => setIsModalOpen(true)}
            >
                + Criar Novo Aviso
            </button>

            <CriarAviso
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePostAviso}
                turmas={turmas}
            />
        </div>
    );
}

export default HomeProfessor;
