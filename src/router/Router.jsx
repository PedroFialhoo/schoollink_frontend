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
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default Router;
