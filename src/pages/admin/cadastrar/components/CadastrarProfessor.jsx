import { useState } from "react";
import styles from "./Cadastrar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormProfessor from "../../components/forms/FormProfessor";

function CadastrarProfessor() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [formacaoAcademica, setFormacaoAcademica] = useState("");
  const [registroProfissional, setRegistroProfissional] = useState("");
  const [cargaHorariaSem, setCargaHorariaSem] = useState("");
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

    const professor = {
      userDto: {
        nome,
        email,
        senha,
        cpf,
        telefone,
        dataNascimento,
        genero
      },
      formacaoAcademica,
      registroProfissional,
      dataContratacao,
      cargaHorariaSem,
      turno,
      salario,
      enderecoDto: {
        cep,
        pais,
        estado,
        cidade,
        rua,
        numero
      }
    };

    fetch("http://localhost:8080/professor/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor)
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Erro HTTP: ${response.status}`);
      })
      .then((data) => {
        setMensagem(data.mensagem || "Professor cadastrado com sucesso!");
      })
      .catch((error) => {
        setMensagem("Erro ao tentar cadastrar. Tente novamente.");
        console.error(error);
      });

    // Reset dos campos
    setNome("");
    setEmail("");
    setSenha("");
    setCpf("");
    setDataNascimento("");
    setGenero("");
    setTelefone("");
    setDataContratacao("");
    setFormacaoAcademica("");
    setRegistroProfissional("");
    setCargaHorariaSem("");
    setTurno("");
    setSalario("");
    setCep("");
    setPais("");
    setEstado("");
    setCidade("");
    setRua("");
    setNumero("");
  };

  return (
    <div className={styles.settingsCard}>
      <h2 className={styles.cardTitulo}>Cadastrar Professor</h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
        <FormProfessor
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail}
          senha={senha} setSenha={setSenha}
          cpf={cpf} setCpf={setCpf}
          genero={genero} setGenero={setGenero}
          dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
          telefone={telefone} setTelefone={setTelefone}
          dataContratacao={dataContratacao} setDataContratacao={setDataContratacao}
          formacaoAcademica={formacaoAcademica} setFormacaoAcademica={setFormacaoAcademica}
          registroProfissional={registroProfissional} setRegistroProfissional={setRegistroProfissional}
          cargaHorariaSem={cargaHorariaSem} setCargaHorariaSem={setCargaHorariaSem}
          turno={turno} setTurno={setTurno}
          salario={salario} setSalario={setSalario}
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

        <button type="submit" className={`${styles.botao} ${styles.botaoSalvar}`}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarProfessor;
