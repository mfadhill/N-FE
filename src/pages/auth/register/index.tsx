import React, { useState } from "react";
import axios from "axios";
import { CiWallet } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image from "../../../assets/log.png";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "https://api-doc-tht.nutech-integrasi.com/register",
        formData
      );
      setSuccess("Registration successful!");
      setError("");
      // You can also redirect the user or clear the form if needed
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-100 py-10">
      <div className="flex shadow-md w-4/5 max-w-4xl">
        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-1/2">
          <div className="w-72">
            <div className="flex items-center justify-center">
              <span className="bg-red-500 p-1 rounded-full">
                <CiWallet className="text-white" />
              </span>
              <span className="ml-2 text-xl font-bold">SIMS PPOB</span>
            </div>
            <div className="flex items-center justify-center text-center">
              <h1 className="text-xl font-semibold mt-4">
                Lengkapi data untuk <br /> membuat akun
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
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="nama depan"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="nama belakang"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="buat password"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="konfirmasi password"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
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
                  className="mb-1.5 block w-full text-center text-white bg-red-500 hover:bg-red-900 px-2 py-1.5 rounded-md"
                >
                  Registrasi
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-500 text-xs font-semibold">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 text-green-500 text-xs font-semibold">
                {success}
              </div>
            )}

            <div className="text-center mt-4">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have an account?
              </span>
              <a
                href="/auth/login"
                className="text-xs font-semibold text-purple-700"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap content-center justify-center rounded-r-md w-1/2">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src={image}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
