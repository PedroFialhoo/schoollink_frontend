import { useEffect, useState } from "react";
import styles from "./Editar.module.css";
import Endereco from "../../components/forms/Endereco";
import FormAluno from "../../components/forms/FormAluno";

function EditarAluno() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

    useEffect(() => {
        fetch("http://localhost:8080/aluno/buscarAluno/6")
            .then(response => response.json())
            .then(data => {
                setNome(data.user.nome);
                setSenha(data.user.senha);
                setMatricula(data.matricula);
                setDataMatricula(data.dataMatricula);
                setStatusMatricula(data.statusMatricula);
                setTelefone(data.user.telefone);
                setNomeResponsavel(data.nomeResponsavel);
                setTelefoneResponsavel(data.telefoneResponsavel);
                setCep(data.endereco.cep);
                setPais(data.endereco.pais);
                setEstado(data.endereco.estado);
                setCidade(data.endereco.cidade);
                setRua(data.endereco.rua);
                setNumero(data.endereco.numero);
            });
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
        const aluno = {
            nome,
            email,
            senha,
            // matricula,
            // dataMatricula,
            // statusMatricula,
            // telefone,
            // nomeResponsavel,
            // telefoneResponsavel,
            // endereco: {
            //     cep,
            //     pais,
            //     estado,
            //     cidade,
            //     rua,
            //     numero
            // }
        };

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
      <h2 className={styles.cardTitulo}>Editar Aluno</h2>
      <form className={styles.cadastroForm} onSubmit={handleSubmit} noValidate>
        <FormAluno
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail} emailMode="disabled"
          senha={senha} setSenha={setSenha}
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

export default EditarAluno
