import { useLocation } from "react-router-dom";
import styles from "./ExibirAluno.module.css";
import { useEffect, useState } from "react";

const formatarData = (dataISO) => {
  if (!dataISO) return "-";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

function ExibirAluno() {
  const baseUrl = "http://localhost:8080/"; 
  const [aluno, setAluno] = useState({});
  const { userDto, enderecoDto } = aluno || {};
  const location = useLocation(); 
  const partes = location.pathname.split("/");
  const id = partes[partes.length - 1];

  useEffect(() => {
    fetch(`http://localhost:8080/aluno/buscarAluno/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAluno(data))
      .catch((error) => console.error("Erro ao buscar detalhes do aluno:", error));
  }, [id]);

  return (
    <div className={styles.cardContainer}>
      {/* --- Cabeçalho com Foto e Nome --- */}
      <div className={styles.header}>
        <img
          src={aluno.userDto?.caminhoFoto ? `${baseUrl}${aluno.userDto?.caminhoFoto}` : "src/assets/logo.png"}
          alt="Foto do Aluno"
          className={styles.foto}
          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
        />
        <div className={styles.headerInfo}>
          <h2 className={styles.nome}>{userDto?.nome}</h2>
          <span className={styles.matriculaBadge}>Matrícula: {aluno.matricula}</span>
          <span className={`${styles.statusBadge} ${aluno.statusMatricula === 'ATIVA' ? styles.ativo : styles.inativo}`}>
            {aluno.statusMatricula || "Status Desconhecido"}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        {/* --- Seção: Dados Pessoais --- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><i className="bi bi-person-lines-fill"></i> Dados Pessoais</h3>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>CPF:</span>
              <span className={styles.value}>{userDto?.cpf || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Nascimento:</span>
              <span className={styles.value}>{formatarData(userDto?.dataNascimento)}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Gênero:</span>
              <span className={styles.value}>{userDto?.genero || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{userDto?.email || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Telefone:</span>
              <span className={styles.value}>{userDto?.telefone || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>RFID:</span>
              <span className={styles.value}>{aluno.rfid || "Não cadastrado"}</span>
            </div>
          </div>
        </section>

        {/* --- Seção: Responsável --- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><i className="bi bi-people-fill"></i> Responsável</h3>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Nome:</span>
              <span className={styles.value}>{aluno.nomeResponsavel || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Telefone:</span>
              <span className={styles.value}>{aluno.telefoneResponsavel || "-"}</span>
            </div>
          </div>
        </section>

        {/* --- Seção: Endereço (Exibida só se existir) --- */}
        {enderecoDto && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><i className="bi bi-geo-alt-fill"></i> Endereço</h3>
            <div className={styles.grid}>
              <div className={styles.item}>
                <span className={styles.label}>Logradouro:</span>
                <span className={styles.value}>{enderecoDto.rua}, {enderecoDto.numero}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Cidade/UF:</span>
                <span className={styles.value}>{enderecoDto.cidade} - {enderecoDto.estado}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>CEP:</span>
                <span className={styles.value}>{enderecoDto.cep}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ExibirAluno;