import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AlunoLayout from "../layouts/AlunoLayout";
import Home from "../pages/aluno/home/Home";
import Notas from "../pages/aluno/notas/Notas";
import Presenca from "../pages/aluno/presenca/Presenca";
import Aulas from "../pages/aluno/aulas/Aulas";
import Horarios from "../pages/aluno/horarios/Horarios";
import Config from "../pages/aluno/config/Config";
import Sair from "../pages/aluno/sair/Sair";

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
                element: <Notas />
            },
            {
                path: "presenca",
                element: <Presenca />
            },
            {
                path: "registro-aulas",
                element: <Aulas />
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
                element: <Sair />
            }
        ]        
    }
])

export default Router