import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AlunoLayout from "../layouts/AlunoLayout";
import HomeAluno from "../pages/aluno/home/Home";
import Notas from "../pages/aluno/notas/Notas";
import Presenca from "../pages/aluno/presenca/Presenca";
import Aulas from "../pages/aluno/aulas/Aulas";
import Horarios from "../pages/aluno/horarios/Horarios";
import Config from "../pages/aluno/config/Config";
import Logout from "../components/logout/Logout";
import CarregarDisciplinas from "../pages/aluno/components/CarregarDisciplinas";
import ProfessorLayout from "../layouts/ProfessorLayout";
import NotFound from "../pages/notFound/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Cadastrar from "../pages/admin/cadastrar/Cadastrar";
import Aluno from "../pages/admin/cadastrar/components/Aluno";
import Professor from "../pages/admin/cadastrar/components/Professor";
import Admin from "../pages/admin/cadastrar/components/Admin";
// import HomeAdmin from "../pages/admin/home/Home";
// import ConfigAdmin from "../pages/admin/config/Config";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      {
        path: "home",
        element: <HomeAluno />,
      },
      {
        path: "notas",
        element: <CarregarDisciplinas />,
        children: [
          {
            path: "materia/:id",
            element: <Notas />,
          },
        ],
      },
      {
        path: "presenca",
        element: <CarregarDisciplinas />,
        children: [
          {
            path: "materia/:id",
            element: <Presenca />,
          },
        ],
      },
      {
        path: "registro-aulas",
        element: <CarregarDisciplinas />,
        children: [
          {
            path: "materia/:id",
            element: <Aulas />,
          },
        ],
      },
      {
        path: "horarios",
        element: <Horarios />,
      },
      {
        path: "configuracoes",
        element: <Config />,
      },
      {
        path: "sair",
        element: <Logout />,
      },
    ],
  },{
    path: "/professor",
    element: <ProfessorLayout />,
    children: [      
      {
        path: "sair",
        element: <Logout />,
      },
    ],
  },{
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // {
      //   path: "home",
      //   element: <HomeAdmin />,
      // },
      {
        path: "cadastrar",
        element: <Cadastrar />,
        children: [
          { path: "aluno", element: <Aluno /> },
          { path: "professor", element: <Professor /> },
          { path: "administrador", element: <Admin /> },
        ],
      },
      // {
      //   path: "configuracoes",
      //   element: <ConfigAdmin />,
      // },
      {
        path: "sair",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default Router;
