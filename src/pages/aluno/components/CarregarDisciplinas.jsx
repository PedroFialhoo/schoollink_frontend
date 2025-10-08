import MateriaCard from "../components/MateriaCard";
import styles from "./CarregarDisciplinas.module.css"; // Importando o CSS Module

function CarregarDisciplinas() {
    const materias = [
        { id: 1, nome: "Cálculo I", professor: "Prof. João Silva", icone: "∫" },
        { id: 2, nome: "Programação Orientada a Objetos", professor: "Profa. Ana Costa", icone: "💻" },
        { id: 3, nome: "Banco de Dados", professor: "Prof. Carlos Pereira", icone: "💾" },
        { id: 4, nome: "Engenharia de Requisitos", professor: "Profa. Mariana Souza", icone: "📝" },
        { id: 5, nome: "Cálculo Numérico", professor: "Prof. Roberto Lima", icone: "🧮" },
        { id: 6, nome: "Projeto Integrador IV", professor: "Profa. Camila Mendes", icone: "🚀" },
        { id: 7, nome: "Redes de Computadores", professor: "Prof. Felipe Ramos", icone: "🌐" },
        { id: 8, nome: "Sistemas Operacionais", professor: "Profa. Juliana Alves", icone: "🐧" },
        { id: 9, nome: "Inteligência Artificial", professor: "Prof. Marcos Vinicius", icone: "🤖" },
        { id: 10, nome: "Design de Interfaces", professor: "Profa. Beatriz Nunes", icone: "🎨" },
    ];

    return (
        <div className={styles.paginaContainer}>
            <h1 className={styles.titulo}>📚 Disciplinas</h1>
            <div className={styles.gridMaterias}>
                {materias.map(materia => (
                    <MateriaCard 
                        key={materia.id} 
                        materia={materia} 
                    />
                ))}
            </div>
        </div>
    );
}

export default CarregarDisciplinas;