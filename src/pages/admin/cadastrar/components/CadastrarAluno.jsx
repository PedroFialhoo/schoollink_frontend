import { useState } from "react";
import styles from "./Cadastrar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormAluno from "../../components/forms/FormAluno";

function CadastrarAluno() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !statusMatricula) {
      setMensagem("Preencha pelo menos os campos nome, email, senha e status matrícula.");
      return;
    }
        const aluno = {
          userDto: {
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            dataNascimento: dataNascimento, 
            genero: genero
          },
          matricula: matricula,
          dataMatricula: dataMatricula, 
          statusMatricula: statusMatricula, 
          nomeResponsavel: nomeResponsavel,
          telefoneResponsavel: telefoneResponsavel,
          enderecoDto: {
            cep: cep,
            pais: pais,
            estado: estado,
            cidade: cidade,
            rua: rua,
            numero: numero
          }
        }
        console.log("Telefone:", telefone, "Gênero:", genero, "DataNascimento:", dataNascimento);

        fetch("http://localhost:8080/aluno/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        })
        .then(data => {
            setMensagem(data.mensagem || "Aluno cadastrado com sucesso!");
        })
        .catch(error => {
            setMensagem("Erro ao tentar cadastrar. Tente novamente.");
            console.error(error);
        });

        setNome("");
        setEmail("");
        setSenha("");
        setCpf("");
        setDataNascimento("");
        setGenero("");
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
      <h2 className={styles.cardTitulo}>Cadastrar Aluno</h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
        <FormAluno
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail}
          senha={senha} setSenha={setSenha}
          cpf={cpf} setCpf={setCpf}
          genero={genero} setGenero={setGenero}
          dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
          matricula={matricula} setMatricula={setMatricula}
          dataMatricula={dataMatricula} setDataMatricula={setDataMatricula}
          statusMatricula={statusMatricula} setStatusMatricula={setStatusMatricula}
          telefone={telefone} setTelefone={setTelefone}
          nomeResponsavel={nomeResponsavel} setNomeResponsavel={setNomeResponsavel}
          telefoneResponsavel={telefoneResponsavel} setTelefoneResponsavel={setTelefoneResponsavel}
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
  )
}

export default CadastrarAluno;
