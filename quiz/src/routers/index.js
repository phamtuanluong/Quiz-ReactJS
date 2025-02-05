import PrivateRouters from "../components/PrivateRouters";
import LayoutDefault from "../layout/LayoutDefault";
import Answers from "../pages/Answers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Topic from "../pages/Topic";

export const routers = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                element: <PrivateRouters />,
                children: [
                    {
                        path: "/answers",
                        element: <Answers />
                    },
                    {
                        path: "/result/:id",
                        element: <Result />
                    },
                    {
                        path: "/quiz/:id",
                        element: <Quiz />
                    },
                    {
                        path: "/topic",
                        element: <Topic />
                    }
                ]
            }
        ]
    }
]