import styles from './Form.module.css';
import InputMask from 'react-input-mask';

function FormFuncionario({
    nome, setNome,
    email, setEmail,
    cpf, setCpf,
    dataNascimento, setDataNascimento,
    genero, setGenero,
    telefone, setTelefone,
    dataContratacao, setDataContratacao,
    cargaHorariaSemanal, setCargaHorariaSemanal,
    turno, setTurno,    
    salario, setSalario
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

            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
              <label htmlFor="cpf">CPF</label>
              <InputMask
                id="cpf"
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite o CPF"
              >
              </InputMask>
            </div>
        
            <div className={styles.inputGroup}>
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                type="date"
                id="dataNascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>
        
            <div className={styles.inputGroup}>
              <label htmlFor="genero">Genero</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="dataContratacao">Data de Contratação</label>
                <input
                    type="date"
                    id="dataContratacao"
                    value={dataContratacao}
                    onChange={(e) => setDataContratacao(e.target.value)}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="cargaHorariaSemanal">Carga Horária Semanal (h)</label>
                <input
                    type="number"
                    id="cargaHorariaSemanal"
                    value={cargaHorariaSemanal}
                    onChange={(e) => setCargaHorariaSemanal(e.target.value)}
                    min="0"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="turno">Turno</label>
                <select
                    id="turno"
                    value={turno}
                    onChange={(e) => setTurno(e.target.value)}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                    <option value="INTEGRAL">Integral</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="salario">Salário (R$)</label>
                <input
                    type="number"
                    id="salario"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                />
            </div>


        </>
    );
}

export default FormFuncionario
