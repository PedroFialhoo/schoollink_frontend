import styles from './Form.module.css';
import PasswordInput from '../../../../components/passwordInput/PasswordInput';
import InputMask from 'react-input-mask';

function FormProfessor({
    nome, setNome,
    email, setEmail, emailMode,
    senha, setSenha,
    cpf, setCpf,
    dataNascimento, setDataNascimento,
    genero, setGenero,
    telefone, setTelefone,
    dataContratacao, setDataContratacao,
    formacaoAcademica, setFormacaoAcademica,
    registroProfissional, setRegistroProfissional,
    cargaHorariaSem, setCargaHorariaSem,
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
                />
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
                <label htmlFor="genero">Gênero</label>
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
                <label htmlFor="formacaoAcademica">Formação Acadêmica</label>
                <input
                    type="text"
                    id="formacaoAcademica"
                    value={formacaoAcademica}
                    onChange={(e) => setFormacaoAcademica(e.target.value)}
                    placeholder="Ex: Licenciatura em Matemática"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="registroProfissional">Registro Profissional</label>
                <input
                    type="text"
                    id="registroProfissional"
                    value={registroProfissional}
                    onChange={(e) => setRegistroProfissional(e.target.value)}
                    placeholder="Ex: CREA, OAB..."
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="cargaHorariaSem">Carga Horária Semanal (h)</label>
                <input
                    type="number"
                    id="cargaHorariaSem"
                    value={cargaHorariaSem}
                    onChange={(e) => setCargaHorariaSem(e.target.value)}
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

export default FormProfessor;
