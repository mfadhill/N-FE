import React from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";

const Index = () => {
  return (
    <div className="mt-4 mx-auto max-w-7xl">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex-1 h-40 flex flex-col items-start pl-6 pt-2">
          <img
            src={profile}
            alt="Profile Photo"
            className="w-16 h-16 rounded-full object-cover border-4 border-white ml-8"
          />
          <div className="mt-4">
            <h1>Selamat Datang</h1>
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
            <h1 className="text-white text-4xl font-bold mt-2">Rp 100.000</h1>
            <h1 className="text-white font-semibold mt-5">Lihat Saldo</h1>
          </div>
        </div>
      </div>

      <div className=" ml-5 mt-4">
        <h1>Silahkan Masukan</h1>
        <h1 className="font-bold text-3xl">Nominal Top Up</h1>
      </div>
      <div className="flex mt-10 flex-wrap justify-center">
        <div className="flex flex-col mx-4" style={{ flexBasis: "60%" }}>
          <input
            type="text"
            placeholder="Masukkan Nominal Top up"
            className="mb-4 w-full px-3 py-2 border rounded-md border-gray-300"
          />
          <button className="bg-gray-400 text-white w-full py-2 rounded-md mb-2 hover:bg-gray-700">
            Top Up
          </button>
        </div>
        <div
          className="flex flex-wrap justify-between"
          style={{ width: "390px" }}
        >
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 10.000
          </button>
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 20.000
          </button>
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 50.000
          </button>
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 100.000
          </button>
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 250.000
          </button>
          <button className="border border-gray-500 text-gray-500 w-32 py-2 h-12 rounded-md mb-2 hover:bg-gray-200">
            Rp. 500.000
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
