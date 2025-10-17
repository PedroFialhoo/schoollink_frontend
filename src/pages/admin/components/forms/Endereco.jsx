import styles from './Form.module.css';

function Endereco({
    cep, setCep,
    pais, setPais,
    estado, setEstado,
    cidade, setCidade,
    rua, setRua,
    numero, setNumero
}) {
    return (
        <>
            <div className={styles.inputGroup}>
                <label htmlFor="cep">CEP</label>
                <input
                    type="text"
                    id="cep"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="pais">País</label>
                <input
                    type="text"
                    id="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="estado">Estado</label>
                <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="cidade">Cidade</label>
                <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="rua">Rua</label>
                <input
                    type="text"
                    id="rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="numero">Número</label>
                <input
                    type="text"
                    id="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
            </div>
        </>
    );
}

export default Endereco;
