import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from './RegistroContainer.module.css';
import ResumoAula from "./ResumoAula/ResumoAula";
import Tarefa from "./Tarefa/Tarefa";

function RegistroContainer() {

    const [dataSelecionada, setDataSelecionada] = useState(new Date());   
    const [conteudo, setConteudo] = useState("");
    const [resumo, setResumo] = useState(""); 
    const [teveTarefa, setTeveTarefa] = useState(false);
    const [descricao, setDescricao] = useState("");
    
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.paginaContainer}>
                    <h2 className={styles.titulo}>Selecione o dia</h2>
                    <Calendar
                    onChange={setDataSelecionada}
                    value={dataSelecionada}
                    locale="pt-BR"
                    />            
                </div>
                <div className={styles.rigthContainer}>
                    <ResumoAula
                    conteudo={conteudo}
                    onConteudoChange={(e) => setConteudo(e.target.value)}
                    resumo={resumo}
                    onResumoChange={(e) => setResumo(e.target.value)} />

                    <Tarefa
                    teveTarefa={teveTarefa}
                    onToggleTarefa={() => setTeveTarefa(!teveTarefa)}
                    descricao={descricao}
                    onDescricaoChange={(e) => setDescricao(e.target.value)}
                    />
                </div>     
            </div>
            <button type="submit" className={styles.botaoSalvar}>
                    Salvar Registro da Aula
            </button>  
        </div>
    );
}

export default RegistroContainer;