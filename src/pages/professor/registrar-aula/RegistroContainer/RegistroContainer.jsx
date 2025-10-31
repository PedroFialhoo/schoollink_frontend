import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./RegistroContainer.module.css";
import ResumoAula from "./ResumoAula/ResumoAula";
import Tarefa from "./Tarefa/Tarefa";
import ListaPresenca from "./ListaPresenca/ListaPresenca";

function RegistroContainer() {
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [conteudo, setConteudo] = useState("");
    const [resumo, setResumo] = useState("");
    const [teveTarefa, setTeveTarefa] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const location = useLocation();
    const { idHorarioAula, idProfessor } = location.state || {};

    useEffect(() => {
        if (!idHorarioAula || !idProfessor) {
            console.error("IDs inválidos:", { idHorarioAula, idProfessor });
            return;
        }

        fetch("http://localhost:8080/professor/buscar/chamada", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ idHorarioAula, idProfessor }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.error("Erro ao buscar alunos:", response.status);
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                const alunosDoBackend = data.map((aluno) => ({
                    matricula: aluno.matricula,
                    nome: aluno.userDto?.nome || "Sem nome",
                    presenca: aluno.presenca ?? false,
                }));
                setListaDeAlunos(alunosDoBackend);
            })
            .catch((error) => {
                console.error("Erro na requisição:", error);
            });
    }, [idHorarioAula, idProfessor]);

    const handlePresencaChange = (matricula, novaPresenca) => {
        setListaDeAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
                aluno.matricula === matricula
                    ? { ...aluno, presenca: novaPresenca }
                    : aluno
            )
        );
    };

    const onSubmit = async () => {
        setMensagem("");

        const registro = {
            idHorarioAula, // Corrigido o nome da chave
            conteudoMinistrado: conteudo,
            resumoAula: resumo,
            tarefa: teveTarefa,
            descricao,
            alunos: listaDeAlunos,
        };

        try {
            const response = await fetch("http://localhost:8080/professor/realizar/chamada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(registro),
            });

            if (!response.ok) {
                setMensagem("❌ Erro ao registrar chamada.");
                return;
            }

            setMensagem("✅ Registro da aula salvo com sucesso!");
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagem("⚠️ Erro na requisição. Tente novamente.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.paginaContainer}>
                    <h2 className={styles.titulo}>Selecione o dia</h2>
                    <Calendar
                        onChange={setDataSelecionada}
                        value={dataSelecionada}
                        locale="pt-BR"
                    />
                </div>
                <div className={styles.rigthContainer}>
                    <ResumoAula
                        conteudo={conteudo}
                        onConteudoChange={(e) => setConteudo(e.target.value)}
                        resumo={resumo}
                        onResumoChange={(e) => setResumo(e.target.value)}
                    />

                    <Tarefa
                        teveTarefa={teveTarefa}
                        onToggleTarefa={() => setTeveTarefa(!teveTarefa)}
                        descricao={descricao}
                        onDescricaoChange={(e) => setDescricao(e.target.value)}
                    />

                    <ListaPresenca
                        alunos={listaDeAlunos}
                        onPresencaChange={handlePresencaChange}
                    />
                </div>
            </div>

            <button type="submit" className={styles.botaoSalvar} onClick={onSubmit}>
                Salvar Registro da Aula
            </button>

            {mensagem && (
                <p
                    className={
                        mensagem.includes("sucesso")
                            ? styles.mensagemSucesso
                            : styles.mensagemErro
                    }
                >
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default RegistroContainer;
