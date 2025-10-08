import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AlunoLayout from "../layouts/AlunoLayout";
import Home from "../pages/aluno/home/Home";
import Notas from "../pages/aluno/notas/Notas";
import Presenca from "../pages/aluno/presenca/Presenca";
import Aulas from "../pages/aluno/aulas/Aulas";
import Horarios from "../pages/aluno/horarios/Horarios";
import Config from "../pages/aluno/config/Config";
import Logout from "../pages/logout/Logout";
import CarregarDisciplinas from "../pages/aluno/components/CarregarDisciplinas";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/aluno",
        element: <AlunoLayout /> ,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "notas",
                element: <CarregarDisciplinas />
            },
            {
                path: "presenca",
                element: <CarregarDisciplinas />
            },
            {
                path: "registro-aulas",
                element: <CarregarDisciplinas />
            },
            {
                path: "horarios",
                element: <Horarios />
            },
            {
                path: "configuracoes",
                element: <Config />
            },
            {
                path: "sair",
                element: <Logout />
            }
        ]        
    }
])

export default Router