// RootLayout.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../store/store";

const RootLayout: React.FC = () => {
  const islogin = useAppSelector((state) => state.auth.isLogin);
  if (!islogin) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
