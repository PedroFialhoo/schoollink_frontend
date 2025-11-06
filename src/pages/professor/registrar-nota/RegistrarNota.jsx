import { Outlet, useOutlet } from 'react-router-dom';
import ContainerCards from './components/ContainerCards';
import styles from './RegistrarNota.module.css';

function RegistrarNota() {
  const outlet = useOutlet(); 

  return (
    <div className={styles.paginaContainer}>
      <h1 className={styles.titulo}>Registrar Notas</h1>     

      {!outlet && (
        <>
          <p className={styles.subtitulo}>
            Selecione uma das provas abaixo para lançar ou editar as notas dos alunos.
          </p>

          <div className={styles.containerPrincipal}>
            <ContainerCards />
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
}

export default RegistrarNota;
