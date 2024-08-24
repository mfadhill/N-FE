import React, { useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import listrik from "../../assets/icon/Listrik.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Index = () => {
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prevState) => !prevState);
  };

  return (
    <div className="mt-4 mx-auto max-w-7xl">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex-1 h-40 flex flex-col items-start pl-6 pt-2">
          <img
            src={profile}
            alt="Profile Photo"
            className="w-16 h-16 rounded-full object-cover border-4 border-white ml-8"
          />
          <div className="mt-4 text-center">
            <h1 className="text-lg">Selamat Datang</h1>
            <h1 className="font-bold text-3xl">Kristina Wibowo</h1>
          </div>
        </div>

        <div className="relative flex-1 h-40 rounded-xl overflow-hidden">
          <img
            src={psaldo}
            alt="Saldo Icon"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col h-full pl-6">
            <h1 className="text-white font-semibold mt-6">Saldo Anda</h1>
            <h1 className="text-white text-4xl font-bold mt-2">
              {isSaldoVisible ? "Rp 100.000" : "****"}
            </h1>
            <button
              onClick={toggleSaldoVisibility}
              className="text-white font-semibold mt-5 flex items-center space-x-2"
            >
              <span>
                {isSaldoVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}
              </span>
              {isSaldoVisible ? (
                <AiOutlineEyeInvisible className="text-white" />
              ) : (
                <AiOutlineEye className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="ml-5 mt-4">
        <h1 className="text-xl font-semibold">Pembayaran</h1>
        <div className="flex items-center mt-4">
          <img src={listrik} alt="Listrik Icon" height={50} width={50} />
          <h1 className="font-bold mx-4 text-xl">Nominal Top Up</h1>
        </div>
      </div>

      <div className="flex flex-col w-full px-5 mt-4">
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Masukkan Nominal Top Up"
            className="w-full px-10 py-2 border rounded-md border-gray-300"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaMoneyCheckDollar className="text-gray-500" />
          </span>
        </div>
        <button className="bg-red-600 text-white w-full py-2 rounded-md mb-2 hover:bg-red-700">
          Bayar
        </button>
      </div>
    </div>
  );
};

export default Index;
