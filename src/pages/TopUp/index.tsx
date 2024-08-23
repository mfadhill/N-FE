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
        <div className="flex flex-col p-4" style={{ flexBasis: "60%" }}>
          <input
            type="text"
            placeholder="Enter text"
            className="mb-4 w-full px-3 py-2 border rounded-md border-gray-300"
          />
          <button className="bg-blue-500 text-white w-full py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
        </div>
        <div
          className="bg-blue-500 flex flex-wrap"
          style={{ flexBasis: "40%" }}
        >
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
          <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md mb-2 hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
