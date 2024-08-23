import React, { useState } from "react";
import image from "../../../assets/log.png";
import { CiWallet } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full items-center justify-center bg-gray-100 py-10">
      <div className="flex shadow-md w-4/5 max-w-4xl rounded-lg overflow-hidden">
        <div className="flex flex-wrap content-center justify-center bg-white w-full md:w-1/2 p-8">
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center">
              <span className="bg-red-500 p-2 rounded-full">
                <CiWallet className="text-white" size={14} />
              </span>
              <span className="ml-2 text-lg font-bold">SIMS PPOB</span>
            </div>
            <div className="flex items-center justify-center text-center mt-4">
              <h1 className="text-2xl font-bold">
                Masuk atau buat akun <br /> untuk memulai
              </h1>
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email anda"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
                />
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Buat password"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="w-full text-center text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
                >
                  Registrasi
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <span className="text-xs text-gray-400 font-semibold">
                Belum punya akun register ?
              </span>
              <a
                href="/register"
                className="text-xs ml-2 font-bold text-red-500"
              >
                di sini
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-wrap content-center justify-center w-1/2 p-8">
          <img
            className="w-full h-full object-cover rounded-md"
            src={image}
            alt="Background"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
