import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./RegistroContainer.module.css";
import ResumoAula from "./ResumoAula/ResumoAula";
import Tarefa from "./Tarefa/Tarefa";
import ListaPresenca from "./ListaPresenca/ListaPresenca";

function RegistroContainer() {
    const { id } = useParams();
    const idTurmaDisciplina = id;
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [conteudo, setConteudo] = useState("");
    const [resumo, setResumo] = useState("");
    const [teveTarefa, setTeveTarefa] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [idHorarioAula, setIdHorarioAula] = useState("")
    const location = useLocation();
    const [listaAula, setListaAula] = useState([])
    const { idProfessor } = location.state || {};


    useEffect(() =>{
        if(!idProfessor || !idTurmaDisciplina || !dataSelecionada){
            console.log("Ids inválidos:", {idProfessor, idTurmaDisciplina, dataSelecionada})
            return
        }
        const diaFormatado = new Date(dataSelecionada).toISOString().split("T")[0];
        fetch("http://localhost:8080/professor/buscar/aulas/dia",{
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({             
                "dia": diaFormatado,
                idTurmaDisciplina
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setListaAula(data)
            console.log(data)
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
    },[idTurmaDisciplina, dataSelecionada])


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
                    idAluno: aluno.idAluno,
                    userDto: aluno.userDto,
                    matricula: aluno.matricula,
                    dataMatricula: aluno.dataMatricula,
                    statusMatricula: aluno.statusMatricula,
                    nomeResponsavel: aluno.nomeResponsavel,
                    telefoneResponsavel: aluno.telefoneResponsavel,
                    enderecoDto: aluno.enderecoDto,
                    presenca: aluno.presenca, 
                }));

                setListaDeAlunos(alunosDoBackend);
                console.log("Alunos recebidos:", alunosDoBackend);
            })
            .catch((error) => {
                console.error("Erro na requisição:", error);
            });
    }, [idHorarioAula, idProfessor, dataSelecionada]);

    const handlePresencaChange = (userId, novaPresenca) => {
        setListaDeAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
                aluno.userDto?.userId === userId
                    ? { ...aluno, presenca: novaPresenca }
                    : aluno
            )
        );
    };

    const onSubmit = async () => {
        setMensagem("");

        const registro = {
            idHorarioAula,
            descricao,
            conteudoMinistrado: conteudo,
            tarefa: teveTarefa,
            alunos: listaDeAlunos,
        };

        console.log("Body enviado:", registro);

        try {
            const response = await fetch("http://localhost:8080/professor/realizar/chamada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(registro),
            });

            if (!response.ok) {
                setMensagem("Erro ao registrar chamada.");
                return;
            }

            setMensagem("Registro da aula salvo com sucesso!");
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagem("Erro na requisição. Tente novamente.");
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
                    {listaAula.length > 0 ? (
                    <>
                    <div className={styles.selectHorarioContainer}>
                        <label htmlFor="horarioSelect">Selecione o horário:</label>
                        <select
                        id="horarioSelect"
                        value={idHorarioAula || ""}
                        onChange={(e) => setIdHorarioAula(e.target.value)}
                        >
                        <option value="">-- Escolha o horário --</option>
                        {[...listaAula]
                        .sort((a, b) => a.horarioInicio.localeCompare(b.horarioInicio))
                        .map((aula) => (
                            <option key={aula.idHorarioAula} value={aula.idHorarioAula}>
                            {aula.horarioInicio.slice(0, 5)} - {aula.nomeDisciplina}
                            </option>
                        ))}
                        </select>
                    </div>
                    
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
                    </>
                    ) : (<p className={styles.mensagemAviso}>Nenhuma aula cadastrada neste dia 📅</p>)}
                </div>
            </div>

            <button type="button" className={styles.botaoSalvar} onClick={onSubmit}>
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
