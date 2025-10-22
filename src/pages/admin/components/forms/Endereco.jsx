import { useEffect } from 'react';
import styles from './Form.module.css';
import InputMask from "react-input-mask";


function Endereco({
    cep, setCep,
    pais, setPais,
    estado, setEstado,
    cidade, setCidade,
    rua, setRua,
    numero, setNumero
})    
{    
    useEffect(() => {
    if (cep && cep.replace(/\D/g, "").length === 8) { 
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao buscar CEP");
          }
          return response.json();
        })
        .then(data => {
          if (!data.erro) {
            setRua(data.logradouro || "");
            setCidade(data.localidade || "");
            setEstado(data.uf || "");
            setPais("Brasil");
          } else {
            console.error("CEP não encontrado");
          }
        })
        .catch(error => console.error("Erro via CEP:", error));
    }
  }, [cep]);

    return (
        <>
            <div className={styles.inputGroup}>
                <label htmlFor="cep">CEP</label>
                <InputMask
                    mask="99999-999"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Digite o CEP"
                    >
                </InputMask>
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
