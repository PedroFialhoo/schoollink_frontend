import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import HomeAluno from "../pages/aluno/HomeAluno";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/aluno",
        element: <HomeAluno /> 
    }
])

export default Router