import { useEffect, useState } from "react";
import styles from "./Editar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormAluno from "../../components/forms/FormAluno";
import BuscarEntidade from "../../components/buscar/BuscarEntidade";

function EditarAluno() {
  const [id, setId] = useState("");
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

  const handleResultadoBusca = (dados) => {
      if (dados.length === 0) return;

      const aluno = dados[0]; 
      setId(aluno.idAluno || "");
      setNome(aluno.user?.nome || "");
      setEmail(aluno.user?.email || "");
      setDataNascimento(aluno.user?.dataNascimento || "")
      setCpf(aluno.user?.cpf || "")
      setGenero(aluno.user?.genero || "")
      setMatricula(aluno.matricula || "");
      setDataMatricula(aluno.dataMatricula || "");
      setStatusMatricula(aluno.statusMatricula || "");
      setTelefone(aluno.user?.telefone || "");
      setNomeResponsavel(aluno.nomeResponsavel || "");
      setTelefoneResponsavel(aluno.telefoneResponsavel || "");

      if (aluno.user?.endereco) {
          const end = aluno.user.endereco;
          setCep(end.cep || "");
          setPais(end.pais || "");
          setEstado(end.estado || "");
          setCidade(end.cidade || "");
          setRua(end.rua || "");
          setNumero(end.numero || "");
      } else {
          setCep("");
          setPais("");
          setEstado("");
          setCidade("");
          setRua("");
          setNumero("");
      }


      setSearchActive("desactive"); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        const aluno = {
          idAluno: id,
          userDto: {
            nome: nome,
            email: email,
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

        fetch("http://localhost:8080/aluno/editar/verificar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
            credentials: "include",
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        })
        .then(data => {
            setMensagem(data.mensagem || "Aluno editado com sucesso!");
        })
        .catch(error => {
            setMensagem("Erro ao tentar editar. Tente novamente.");
            console.error(error);
        });

        setNome("");
        setEmail("");
        setSenha("");
        setMatricula("");
        setDataNascimento("");
        setCpf("");
        setGenero("");
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
    <>
      <div className={styles.settingsCard}>
        <div className={styles.card}>
          <h2 className={styles.cardTitulo}>Editar Aluno</h2>
          <button className={`${styles.botao} ${styles.botaoSalvar}`} onClick={() => setSearchActive(searchActive === "desactive" ? "active" : "desactive")}>Buscar aluno</button>
        </div>
        
        <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
          <FormAluno
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
            Salvar
          </button>
        </form>
      </div>
      {searchActive === "active" && (
      <div className={styles.blackShield}>
        <BuscarEntidade
                entidade = "aluno"
                searchActive={searchActive}
                setSearchActive={setSearchActive}
                onResultado={handleResultadoBusca}
            />
      </div>
    )}
    </>
  )
}

export default EditarAluno
