import styles from "./Form.module.css";
import PasswordInput from '../../../../components/passwordInput/PasswordInput';
import InputMask from 'react-input-mask';


function FormAluno({
  nome, setNome,
  email, setEmail, emailMode,
  senha, setSenha,
  matricula, setMatricula,
  dataMatricula, setDataMatricula,
  statusMatricula, setStatusMatricula,
  telefone, setTelefone,
  nomeResponsavel, setNomeResponsavel,
  telefoneResponsavel, setTelefoneResponsavel
}) {
  return (
    <>
      <div className={styles.inputGroup}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className={`${styles.inputGroup} ${emailMode === 'disabled' ? styles.disabled : ''}`}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="senha">Senha</label>
        <PasswordInput
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="matricula">Matrícula</label>
        <input
          type="text"
          id="matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="dataMatricula">Data de Matrícula</label>
        <input
          type="text"
          id="dataMatricula"
          value={dataMatricula}
          onChange={(e) => setDataMatricula(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="statusMatricula">Status da Matrícula</label>
        <select
          id="statusMatricula"
          value={statusMatricula}
          onChange={(e) => setStatusMatricula(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Ativa">Ativa</option>
          <option value="Trancada">Trancada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="telefone">Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              id="telefone"
              placeholder="(12) 98765-4321"
              required
            />
          )}
        </InputMask>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="nomeResponsavel">Nome responsável</label>
        <input
          type="text"
          id="nomeResponsavel"
          value={nomeResponsavel}
          onChange={(e) => setNomeResponsavel(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="telefoneResponsavel">Telefone responsável</label>
        <InputMask
          mask="(99) 99999-9999"
          value={telefoneResponsavel}
          onChange={(e) => setTelefoneResponsavel(e.target.value)}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              id="telefone"
              placeholder="(12) 98765-4321"
              required
            />
          )}
        </InputMask>
      </div>
    </>
  );
}

export default FormAluno
