// src/pages/RegistrarNota.jsx
import ContainerCards from './components/ContainerCards';
import styles from './RegistrarNota.module.css';

function RegistrarNota() {
  return (
    <div className={styles.paginaContainer}>
      <h1 className={styles.titulo}>Registrar Notas</h1>
      <p className={styles.subtitulo}>
        Selecione uma das provas abaixo para lançar ou editar as notas dos alunos.
      </p>

      <div className={styles.containerPrincipal}>
        <ContainerCards />
      </div>
    </div>
  );
}

export default RegistrarNota;