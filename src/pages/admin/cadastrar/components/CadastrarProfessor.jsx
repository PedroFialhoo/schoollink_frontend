import { useState } from "react";
import styles from "./Cadastrar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormProfessor from "../../components/forms/FormProfessor";

function CadastrarProfessor() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [disciplinas, setDisciplinas] = useState("");
  const [registroProfissional, setRegistroProfissional] = useState("");
  const [cargaHorariaSemanal, setCargaHorariaSemanal] = useState("");
  const [turno, setTurno] = useState("");
  const [salario, setSalario] = useState("");
  const [cep, setCep] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");

  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setMensagem("Preencha pelo menos os campos nome, email e senha.");
      return;
    }

    setNome("");
    setEmail("");
    setSenha("");
    setMatricula("");
    setDataMatricula("");
    setStatusMatricula("");
    setTelefone("");
    setNomeResponsavel("");
    setTelefoneResponsavel("");
    setCep("");
    setPais("");
    setEstado("");
    setCidade("");
    setRua("");
    setNumero("");
  };

  return (
    <div className={styles.settingsCard}>
      <h2 className={styles.cardTitulo}>Cadastrar Professor </h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit}>
        <FormProfessor
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          telefone={telefone}
          setTelefone={setTelefone}
          dataContratacao={dataContratacao}
          setDataContratacao={setDataContratacao}
          formacaoAcademica={formacaoAcademica}
          setFormacaoAcademica={setFormacaoAcademica}
          disciplinas={disciplinas}
          setDisciplinas={setDisciplinas}
          registroProfissional={registroProfissional}
          setRegistroProfissional={setRegistroProfissional}
          cargaHorariaSemanal={cargaHorariaSemanal}
          setCargaHorariaSemanal={setCargaHorariaSemanal}
          turno={turno}
          setTurno={setTurno}
          salario={salario}
          setSalario={setSalario}
        />

        <Endereco
          cep={cep}
          setCep={setCep}
          pais={pais}
          setPais={setPais}
          estado={estado}
          setEstado={setEstado}
          cidade={cidade}
          setCidade={setCidade}
          rua={rua}
          setRua={setRua}
          numero={numero}
          setNumero={setNumero}
        />

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

        <button
          type="submit"
          className={`${styles.botao} ${styles.botaoSalvar}`}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarProfessor;
