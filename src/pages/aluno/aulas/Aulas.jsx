import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Registro from "./components/Registro";
import styles from './Aulas.module.css';

const registros = [
        {
            id: 1,
            data: "2025-10-10",
            materiaId: 1,
            materiaNome: "Cálculo I",
            professor: "Prof. João Silva",
            conteudo: "Derivadas — Regras básicas",
            teveTarefa: true,
            tarefa: "Lista de 10 exercícios de derivada",
            resumo: "Introdução ao conceito de derivada e regras do produto e quociente."
            },
            {
            id: 2,
            data: "2025-10-11",
            materiaId: 1,
            materiaNome: "Cálculo I",
            professor: "Prof. João Silva",
            conteudo: "Limites laterais",
            teveTarefa: false,
            tarefa: "",
            resumo: "Explanação teórica e resolução de exemplos."
            },

            // Programação Orientada a Objetos - ID 2
            {
            id: 3,
            data: "2025-10-10",
            materiaId: 2,
            materiaNome: "Programação Orientada a Objetos",
            professor: "Profa. Ana Costa",
            conteudo: "Herança e Polimorfismo",
            teveTarefa: true,
            tarefa: "Implementar herança em um projeto Java",
            resumo: "Explicação dos conceitos de herança e polimorfismo com exemplos práticos."
            },

            // Banco de Dados - ID 3
            {
            id: 4,
            data: "2025-10-10",
            materiaId: 3,
            materiaNome: "Banco de Dados",
            professor: "Prof. Carlos Pereira",
            conteudo: "Chaves primárias e estrangeiras",
            teveTarefa: true,
            tarefa: "Criar um modelo relacional com 3 tabelas",
            resumo: "Discussão sobre relacionamentos 1:N e integridade referencial."
            },

            // Engenharia de Requisitos - ID 4
            {
            id: 5,
            data: "2025-10-12",
            materiaId: 4,
            materiaNome: "Engenharia de Requisitos",
            professor: "Profa. Mariana Souza",
            conteudo: "Elicitação de requisitos",
            teveTarefa: false,
            tarefa: "",
            resumo: "Aula com dinâmica de levantamento de requisitos com usuários fictícios."
            },

            // Cálculo Numérico - ID 5
            {
            id: 6,
            data: "2025-10-10",
            materiaId: 5,
            materiaNome: "Cálculo Numérico",
            professor: "Prof. Roberto Lima",
            conteudo: "Método de Newton-Raphson",
            teveTarefa: true,
            tarefa: "Aplicar o método em 3 funções",
            resumo: "Demonstração do método e exercícios em sala."
            },

            // Projeto Integrador IV - ID 6
            {
            id: 7,
            data: "2025-10-10",
            materiaId: 6,
            materiaNome: "Projeto Integrador IV",
            professor: "Profa. Camila Mendes",
            conteudo: "Planejamento do MVP",
            teveTarefa: true,
            tarefa: "Definir backlog inicial",
            resumo: "Organização das tarefas iniciais e divisão de grupos."
            },

            // Redes de Computadores - ID 7
            {
            id: 8,
            data: "2025-10-11",
            materiaId: 7,
            materiaNome: "Redes de Computadores",
            professor: "Prof. Felipe Ramos",
            conteudo: "Camada de Rede",
            teveTarefa: false,
            tarefa: "",
            resumo: "Explicação sobre IP, roteamento e protocolos básicos."
            },

            // Sistemas Operacionais - ID 8
            {
            id: 9,
            data: "2025-10-10",
            materiaId: 8,
            materiaNome: "Sistemas Operacionais",
            professor: "Profa. Juliana Alves",
            conteudo: "Escalonamento de processos",
            teveTarefa: true,
            tarefa: "Simular algoritmos FCFS e SJF",
            resumo: "Discussão dos principais algoritmos de escalonamento."
            },

            // Inteligência Artificial - ID 9
            {
            id: 10,
            data: "2025-10-10",
            materiaId: 9,
            materiaNome: "Inteligência Artificial",
            professor: "Prof. Marcos Vinicius",
            conteudo: "Introdução a Árvores de Decisão",
            teveTarefa: true,
            tarefa: "Construir uma árvore simples em Python",
            resumo: "Apresentação dos conceitos básicos e exemplos práticos."
            },

            // Design de Interfaces - ID 10
            {
            id: 11,
            data: "2025-10-10",
            materiaId: 10,
            materiaNome: "Design de Interfaces",
            professor: "Profa. Beatriz Nunes",
            conteudo: "Princípios de usabilidade",
            teveTarefa: true,
            tarefa: "Avaliar um site com heurísticas de Nielsen",
            resumo: "Estudo de casos e exemplos de boas práticas de UI."
            }
    ];

function Aulas() {

    const { id } = useParams();

    const [dataSelecionada, setDataSelecionada] = useState(new Date());    
    
    const [registrosDoDia, setRegistrosDoDia] = useState([]);

    useEffect(() => {
        const materiaIdNumber = Number(id);

        const ano = dataSelecionada.getFullYear();
        const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
        const dia = String(dataSelecionada.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;

        const filtrados = registros.filter(
            (r) => r.data === dataFormatada && r.materiaId === materiaIdNumber
        );

        setRegistrosDoDia(filtrados);
    }, [dataSelecionada, id]);



    return (
        <div className={styles.container}>
        <div className={styles.paginaContainer}>
            <h2 className={styles.titulo}>Selecione o dia</h2>
            <Calendar
            onChange={setDataSelecionada}
            value={dataSelecionada}
            />
        </div>
        <Registro registrosDoDia={registrosDoDia} dataSelecionada={dataSelecionada} />
        
        </div>
    );
}

export default Aulas;