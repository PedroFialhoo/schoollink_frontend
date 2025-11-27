import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AlunoLayout from "../layouts/AlunoLayout";
import HomeAluno from "../pages/aluno/home/Home";
import Notas from "../pages/aluno/notas/Notas";
import Presenca from "../pages/aluno/presenca/Presenca";
import Aulas from "../pages/aluno/aulas/Aulas";
import Horarios from "../pages/aluno/horarios/Horarios";
import Config from "../components/config/Config";
import Logout from "../components/logout/Logout";
import CarregarDisciplinas from "../pages/aluno/components/CarregarDisciplinas";
import ProfessorLayout from "../layouts/ProfessorLayout";
import NotFound from "../pages/notFound/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Cadastrar from "../pages/admin/cadastrar/Cadastrar";
import CadastrarAluno from "../pages/admin/cadastrar/components/CadastrarAluno";
import CadastrarProfessor from "../pages/admin/cadastrar/components/CadastrarProfessor";
import CadastrarAdmin from "../pages/admin/cadastrar/components/CadastrarAdmin";
import Editar from "../pages/admin/editar/Editar";
import CadastrarDisciplina from "../pages/admin/cadastrar/components/CadastrarDisciplina";
import EditarAluno from "../pages/admin/editar/components/EditarAluno";
import EditarTurma from "../pages/admin/editar/components/EditarTurma";
import CadastrarFuncionario from "../pages/admin/cadastrar/components/CadastrarFuncionario";
import CadastrarTurma from "../pages/admin/cadastrar/components/CadastrarTurma";
import CadastrarHorarioFixo from "../pages/admin/cadastrar/components/CadastrarHorarioFixo";
import RegistrarAula from "../pages/professor/registrar-aula/RegistrarAula";
import HomeProfessor from "../pages/professor/home/HomeProfessor";
import CriarProva from "../pages/professor/prova/CriarProva";
import RegistroContainer from "../pages/professor/registrar-aula/RegistroContainer/RegistroContainer";
import HomeAdmin from "../pages/admin/home/HomeAdmin";
import GerarAulas from "../pages/admin/GerarAulas/GerarAulas";
import RegistrarNota from "../pages/professor/registrar-nota/RegistrarNota";
import ListaAlunos from "../pages/professor/registrar-nota/components/ListaAlunos";
import RedefinirSenha from "../pages/redefinirSenha/RedefinirSenha";
import ChatPageAluno from "../pages/aluno/chat/ChatPage";
import ChatPageAdmin from "../pages/admin/chat/ChatPage";
import ProfessorPontosPage from "../pages/professor/ponto/ProfessorPontosPage";
import EditarProfessor from "../pages/admin/editar/components/EditarProfessor";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  // ========= ROTAS DO ALUNO =========
  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      { path: "home", element: <HomeAluno /> },
      { path: "chat", element: <ChatPageAluno /> },

      {
        path: "notas",
        element: <CarregarDisciplinas />,
        children: [{ path: "materia/:id", element: <Notas /> }],
      },
      {
        path: "presenca",
        element: <CarregarDisciplinas />,
        children: [{ path: "materia/:id", element: <Presenca /> }],
      },
      {
        path: "registro-aulas",
        element: <CarregarDisciplinas />,
        children: [{ path: "materia/:id", element: <Aulas /> }],
      },

      { path: "horarios", element: <Horarios /> },
      { path: "configuracoes", element: <Config /> },
      { path: "sair", element: <Logout /> },
    ],
  },

  // ========= ROTAS DO PROFESSOR =========
  {
    path: "/professor",
    element: <ProfessorLayout />,
    children: [
      { path: "home", element: <HomeProfessor /> },
      { path: "prova", element: <CriarProva /> },
      {
        path: "notas",
        element: <RegistrarNota />,
        children: [{ path: ":id", element: <ListaAlunos /> }],
      },
      {
        path: "registrar-aula",
        element: <RegistrarAula />,
        children: [{ path: "materia/:id", element: <RegistroContainer /> }],
      },
      { path: "sair", element: <Logout /> },
      { path: "configuracoes", element: <Config /> },

      // NOVA ROTA: Tela de pontos do professor
      { path: "ponto", element: <ProfessorPontosPage /> },
    ],
  },

  // ========= ROTAS DO ADMIN =========
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "home", element: <HomeAdmin /> },

      // ---- NOVA ROTA DO CHAT ----
      { path: "chat", element: <ChatPageAdmin /> },

      {
        path: "cadastrar",
        element: <Cadastrar />,
        children: [
          { path: "aluno", element: <CadastrarAluno /> },
          { path: "professor", element: <CadastrarProfessor /> },
          { path: "administrador", element: <CadastrarAdmin /> },
          { path: "disciplina", element: <CadastrarDisciplina /> },
          { path: "funcionario", element: <CadastrarFuncionario /> },
          { path: "turma", element: <CadastrarTurma /> },
          { path: "horario", element: <CadastrarHorarioFixo /> },
        ],
      },

      {
        path: "editar",
        element: <Editar />,
        children: [
          { path: "aluno", element: <EditarAluno /> },
          { path: "professor", element: <EditarProfessor /> },
          { path: "turma", element: <EditarTurma /> },
        ],
      },

      { path: "gerar-aula", element: <GerarAulas /> },
      { path: "configuracoes", element: <Config /> },
      { path: "sair", element: <Logout /> },
    ],
  },

  { path: "forgot-password", element: <RedefinirSenha /> },
  { path: "*", element: <NotFound /> },
]);

export default Router;
