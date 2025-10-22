import { useState } from "react";
import styles from "./Cadastrar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormFuncionario from "../../components/forms/FormFuncionario";

function CadastrarFuncionario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
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

    if (!nome || !email ) {
      setMensagem("Preencha pelo menos os campos nome e email.");
      return;
    }
    const funcionario = {
      
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        dataNascimento: dataNascimento, 
        genero: genero,             
        dataContratacao: dataContratacao, 
        cargaHorariaSemanal: cargaHorariaSemanal,
        turno: turno, 
        salario: salario, 
        enderecoDto: {
            cep: cep,
            pais: pais,
            estado: estado,
            cidade: cidade,
            rua: rua,
            numero: numero
          }
    };
    
    fetch("http://localhost:8080/funcionario/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionario),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        })
        .then(data => {
            setMensagem(data.mensagem || "Funcionario cadastrado com sucesso!");
        })
        .catch(error => {
            setMensagem("Erro ao tentar cadastrar. Tente novamente.");
            console.error(error);
        });

    setNome("");
    setEmail("");
    setCpf("");
    setDataNascimento("");
    setGenero("");
    setTelefone("");            
    setDataContratacao("");     
    setCargaHorariaSemanal(""); 
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
      <h2 className={styles.cardTitulo}>Cadastrar Funcionário</h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
        <FormFuncionario
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail}
          cpf={cpf} setCpf={setCpf}
          genero={genero} setGenero={setGenero}
          dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
          telefone={telefone} setTelefone={setTelefone}
          dataContratacao={dataContratacao} setDataContratacao={setDataContratacao}
          cargaHorariaSemanal={cargaHorariaSemanal} setCargaHorariaSemanal={setCargaHorariaSemanal}
          turno={turno} setTurno={setTurno}
          salario={salario} setSalario={setSalario}
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

export default CadastrarFuncionario;
