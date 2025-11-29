import { useEffect, useState } from "react";
import styles from "./ExibirFuncionario.module.css";
import { useLocation } from "react-router-dom";
import defaultFoto from "../../../../assets/images/profile.png";

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

const formatarData = (dataISO) => {
  if (!dataISO) return "-";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

function ExibirFuncionario() {

  const baseUrl = "http://localhost:8080/"; 
  const [funcionario, setFuncionario] = useState({});
  const { enderecoDto } = funcionario || {};
  const location = useLocation(); 
  const partes = location.pathname.split("/");
  const idFuncionario = partes[partes.length - 1];

  useEffect(() => {
      fetch(`http://localhost:8080/funcionario/buscarFuncionario/${idFuncionario}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => setFuncionario(data))
        .catch((error) => console.error("Erro ao buscar detalhes do funcionário:", error));
    }, [idFuncionario]);

  return (
    <div className={styles.cardContainer}>
        <div className={styles.header}>
            <img
                src={funcionario.userDto?.caminhoFoto ? `${baseUrl}${funcionario.userDto.caminhoFoto}` : defaultFoto}
                alt="Foto do Funcionário"
                className={styles.foto}
            />

            <div className={styles.headerInfo}>
                <h2 className={styles.nome}>{funcionario.userDto?.nome}</h2>
                <span className={styles.cargoBadge}>Funcionário</span>
                <span className={styles.emailHeader}>{funcionario.userDto?.email}</span>
            </div>
        </div>


      <div className={styles.content}>
        {/* --- Seção: Dados Pessoais --- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><i className="bi bi-person-badge-fill"></i> Dados Pessoais</h3>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>CPF:</span>
              <span className={styles.value}>{funcionario.userDto?.cpf || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Nascimento:</span>
              <span className={styles.value}>{formatarData(funcionario.userDto?.dataNascimento)}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Gênero:</span>
              <span className={styles.value}>{funcionario.userDto?.genero || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Telefone:</span>
              <span className={styles.value}>{funcionario.userDto?.telefone || "-"}</span>
            </div>
          </div>
        </section>

        {/* --- Seção: Contrato --- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}><i className="bi bi-briefcase-fill"></i> Informações Contratuais</h3>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Contratação:</span>
              <span className={styles.value}>{formatarData(funcionario.dataContratacao)}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Carga Horária:</span>
              <span className={styles.value}>{funcionario.cargaHorariaSem}h / semana</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Turno:</span>
              <span className={styles.value}>{funcionario.turno || "-"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Salário Base:</span>
              <span className={`${styles.value} ${styles.salario}`}>
                {formatarMoeda(funcionario.salario)}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>RFID:</span>
              <span className={styles.value}>{funcionario.rfid || "Não cadastrado"}</span>
            </div>
          </div>
        </section>

        {/* --- Seção: Endereço --- */}
        {enderecoDto && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}><i className="bi bi-geo-alt-fill"></i> Endereço</h3>
            <div className={styles.grid}>
              <div className={styles.item}>
                <span className={styles.label}>Local:</span>
                <span className={styles.value}>{enderecoDto.rua}, {enderecoDto.numero}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Cidade:</span>
                <span className={styles.value}>{enderecoDto.cidade} - {enderecoDto.estado}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ExibirFuncionario;