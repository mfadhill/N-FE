// RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Pastikan path sesuai

const RootLayout: React.FC = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
