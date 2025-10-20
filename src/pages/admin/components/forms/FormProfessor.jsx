import styles from './Form.module.css';
import PasswordInput from '../../../../components/passwordInput/PasswordInput';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { useEffect, useState } from 'react';

function FormProfessor({
    nome, setNome,
    email, setEmail,
    senha, setSenha,
    telefone, setTelefone,
    dataContratacao, setDataContratacao,
    formacaoAcademica, setFormacaoAcademica,
    disciplinas, setDisciplinas,
    registroProfissional, setRegistroProfissional,
    cargaHorariaSemanal, setCargaHorariaSemanal,
    turno, setTurno,    
    salario, setSalario
}) {
    const [opcoesDisciplinas, setOpcoesDisciplinas] = useState([]);
    const handleDisciplinasChange = (selected) => {
        setDisciplinas(selected ? selected.map(op => op.value) : []);
    };


   useEffect(() => {
    fetch("http://localhost:8080/disciplina/buscar-todas")
        .then(response => response.json())
        .then(data => {
        const disciplinasFormatadas = data.map(d => ({
            value: d.id,
            label: d.nome
        }));
        setOpcoesDisciplinas(disciplinasFormatadas);
        })
        .catch(error => {
        console.error("Erro ao buscar disciplinas:", error);
        });
    }, []);


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
                <label htmlFor="senha">Senha</label>
                <PasswordInput
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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

            <div >
                <label htmlFor="disciplinas">Disciplinas que Leciona</label>
                <Select
                id="disciplinas"
                isMulti
                options={opcoesDisciplinas}
                value={opcoesDisciplinas.filter(op => disciplinas.includes(op.value))}
                onChange={handleDisciplinasChange}
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
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                    <option value="Integral">Integral</option>
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

export default FormProfessor
