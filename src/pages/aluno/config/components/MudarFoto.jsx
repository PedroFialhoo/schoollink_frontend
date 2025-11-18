import { useRef, useState } from 'react';
import styles from './MudarFoto.module.css';

function MudarFoto({ avatarUrl, nome, email }) {

    const fileInputRef = useRef(null);
    const [fotoAtual, setFotoAtual] = useState(avatarUrl);
    const [mensagem, setMensagem] = useState("");

    const handleAlterarFotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("arquivo", file);

        try {
            const response = await fetch("http://localhost:8080/foto/upload", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const texto = await response.text();

            if (response.ok) {
                setMensagem("Foto alterada com sucesso!");

                const caminho = texto.replace("Salvo em: ", "").trim();

                setFotoAtual(caminho);
            } else {
                setMensagem("Erro ao enviar foto");
            }
        } catch (error) {
            setMensagem("Erro na requisição");
            console.error(error);
        }
    };

    return (
        <div className={styles.settingsCard}>
            <h2 className={styles.cardTitulo}>Foto de Perfil</h2>

            <div className={styles.perfilContainer}>
                <img
                    src={fotoAtual ? `http://localhost:8080/${fotoAtual}` : "/src/assets/images/favicon.ico"}
                    alt="Avatar atual"
                    className={styles.avatar}
                />

                <div className={styles.perfilInfo}>
                    <p className={styles.nomeUsuario}>{nome}</p>
                    <p className={styles.emailUsuario}>{email}</p>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className={styles.hiddenInput}
                        onChange={handleFileChange}
                    />

                    <button onClick={handleAlterarFotoClick} className={styles.botao}>
                        Alterar Foto
                    </button>

                    {mensagem && (
                        <p className={styles.mensagem}>{mensagem}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MudarFoto;
