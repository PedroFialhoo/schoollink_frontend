import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import AlunoLayout from "../layouts/AlunoLayout";
import Home from "../pages/aluno/home/Home";
import Notas from "../pages/aluno/notas/Notas";

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
            }
        ]
    }
])

export default Router