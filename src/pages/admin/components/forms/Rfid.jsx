import styles from './Form.module.css';
import { useState } from 'react';

function Rfid({
    rfid, setRfid
})    
{    
    const [buscando, setBuscando] = useState(false);

    const lerRfid = () => {
        setRfid("")
        setBuscando(true)
        fetch("http://localhost:8080/rfid/modo", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ valor: 1 }) 
        })
            .then(response => {
            if (!response.ok) throw new Error("Erro ao ativar modo de cadastro");
            console.log("Modo de cadastro ativado. Aguarde o cartão...");
            
            const interval = setInterval(() => {
                fetch("http://localhost:8080/rfid/ultimo")
                .then(res => res.json())
                .then(data => {
                    if (data.rfid) {
                        setRfid(data.rfid);
                        clearInterval(interval);
                        console.log("RFID recebido:", data.rfid);
                        setBuscando(false)
                    }
                })
                .catch(err => console.error(err));
            }, 2000); 
            })
            .catch(error => console.error(error));
    };

   
    return (
        <>
            <div className={styles.inputGroup}>
                <label htmlFor="rfid">RFID</label>
                <input 
                    type="text"
                    value={rfid}    
                    onChange={(e) => setRfid(e.target.value)}
                />
            </div>

            <button 
                className={styles.botao} 
                onClick={lerRfid} 
                type="button"
                disabled={buscando}
            >
                {buscando ? "Lendo RFID..." : "Ler RFID"}
            </button>

            {buscando && (
                <p style={{ color: "gray", marginTop: "10px" }}>
                    🔄 Aproxime o cartão do leitor...
                </p>
            )}
        </>
    );
}

export default Rfid;
