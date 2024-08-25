import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Topup from "../pages/TopUp";
import Services from "../pages/Services";
import Transaction from "../pages/Transaction";
import Akun from "../pages/Akun";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AuthLayout from "../layout/AuthLayout";
import EditProfile from "../pages/Akun/EditProfile";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/topup",
        element: <Topup />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/akun",
        element: <Akun />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
