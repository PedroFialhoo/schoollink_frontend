import { useEffect, useState } from "react";
import styles from "./Editar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormProfessor from "../../components/forms/FormProfessor";
import BuscarEntidade from "../../components/buscar/BuscarEntidade";

function EditarProfessor() {
    const [idProfessor, setIdProfessor] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [genero, setGenero] = useState("");
    const [matricula, setMatricula] = useState("");
    const [dataMatricula, setDataMatricula] = useState("");
    const [statusMatricula, setStatusMatricula] = useState("");
    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [telefone, setTelefone] = useState("");
    const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
    const [cep, setCep] = useState("");
    const [pais, setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [searchActive, setSearchActive] = useState("active");
    const [dataContratacao, setDataContratacao] = useState("");
    const [formacaoAcademica, setFormacaoAcademica] = useState("");
    const [registroProfissional, setRegistroProfissional] = useState("");
    const [cargaHorariaSem, setCargaHorariaSem] = useState("");
    const [turno, setTurno] = useState("");
    const [salario, setSalario] = useState("");
    const [rfid, setRfid] = useState("");

    const handleResultadoBusca = (dados) => {
        if (dados.length === 0) return;

        const professor = dados[0];
        const u = professor.userDto || {};
        const end = professor.enderecoDto || {};

        setIdProfessor(professor.idProfessor || "");
        setMatricula(professor.matricula || "");
        setDataMatricula(professor.dataMatricula || "");
        setStatusMatricula(professor.statusMatricula || "");
        setNomeResponsavel(professor.nomeResponsavel || "");
        setTelefoneResponsavel(professor.telefoneResponsavel || "");
        setNome(u.nome || "");
        setEmail(u.email || "");
        setCpf(u.cpf || "");
        setDataNascimento(u.dataNascimento || "");
        setGenero(u.genero || "");
        setTelefone(u.telefone || "");
        setCep(end.cep || "");
        setPais(end.pais || "");
        setEstado(end.estado || "");
        setCidade(end.cidade || "");
        setRua(end.rua || "");
        setNumero(end.numero || "");
        setDataContratacao(professor.dataContratacao || "");
        setFormacaoAcademica(professor.formacaoAcademica || "");
        setRegistroProfissional(professor.registroProfissional || "");
        setCargaHorariaSem(professor.cargaHorariaSem || "");
        setTurno(professor.turno || "");
        setSalario(professor.salario || "");
        setRfid(professor.rfid || "");

        setSearchActive("desactive");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const professor = {
            idProfessor,
            userDto: {
                nome,
                email,
                cpf,
                telefone,
                dataNascimento,
                genero,
            },

            matricula,
            dataMatricula,
            statusMatricula,
            nomeResponsavel,
            telefoneResponsavel,

            enderecoDto: {
                cep,
                pais,
                estado,
                cidade,
                rua,
                numero
            },

            dataContratacao,
            formacaoAcademica,
            registroProfissional,
            cargaHorariaSem,
            turno,
            salario,
            rfid
        };

        fetch("http://localhost:8080/professor/editar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professor),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setMensagem(data.mensagem || "Professor editado com sucesso!"))
            .catch(() => setMensagem("Erro ao editar professor."));

    };

    return (
        <>
            <div className={styles.settingsCard}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>Editar Professor</h2>
                    <button
                        className={`${styles.botao} ${styles.botaoSalvar}`}
                        onClick={() =>
                            setSearchActive(searchActive === "desactive" ? "active" : "desactive")
                        }
                    >
                        Buscar professor
                    </button>
                </div>

                <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>

                    <FormProfessor
                        nome={nome} setNome={setNome}
                        email={email} setEmail={setEmail} emailMode="disabled"
                        senha={senha} setSenha={setSenha}
                        cpf={cpf} setCpf={setCpf}
                        dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
                        genero={genero} setGenero={setGenero}
                        matricula={matricula} setMatricula={setMatricula}
                        dataMatricula={dataMatricula} setDataMatricula={setDataMatricula}
                        statusMatricula={statusMatricula} setStatusMatricula={setStatusMatricula}
                        telefone={telefone} setTelefone={setTelefone}
                        nomeResponsavel={nomeResponsavel} setNomeResponsavel={setNomeResponsavel}
                        telefoneResponsavel={telefoneResponsavel} setTelefoneResponsavel={setTelefoneResponsavel}
                        dataContratacao={dataContratacao} setDataContratacao={setDataContratacao}
                        formacaoAcademica={formacaoAcademica} setFormacaoAcademica={setFormacaoAcademica}
                        registroProfissional={registroProfissional} setRegistroProfissional={setRegistroProfissional}
                        cargaHorariaSem={cargaHorariaSem} setCargaHorariaSem={setCargaHorariaSem}
                        turno={turno} setTurno={setTurno}
                        salario={salario} setSalario={setSalario}
                        rfid={rfid} setRfid={setRfid}
                    />

                    <Endereco
                        cep={cep} setCep={setCep}
                        pais={pais} setPais={setPais}
                        estado={estado} setEstado={setEstado}
                        cidade={cidade} setCidade={setCidade}
                        rua={rua} setRua={setRua}
                        numero={numero} setNumero={setNumero}
                    />

                    {mensagem && (
                        <p className={mensagem.includes("sucesso") ? styles.mensagemSucesso : styles.mensagemErro}>
                            {mensagem}
                        </p>
                    )}

                    <button type="submit" className={`${styles.botao} ${styles.botaoSalvar}`}>Salvar</button>
                </form>
            </div>

            {searchActive === "active" && (
                <div className={styles.blackShield}>
                    <BuscarEntidade
                        entidade="professor"
                        searchActive={searchActive}
                        setSearchActive={setSearchActive}
                        onResultado={handleResultadoBusca}
                    />
                </div>
            )}
        </>
    );
}

export default EditarProfessor;
