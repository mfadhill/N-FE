import React from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import Game from "../../assets/icon/Game.png";
import kurban from "../../assets/icon/Kurban.png";
import Listrik from "../../assets/icon/Listrik.png";
import Pdam from "../../assets/icon/PDAM.png";
import makanan from "../../assets/icon/makanan.png";
import Musik from "../../assets/icon/Musik.png";
import Paket from "../../assets/icon/Paket.png";
import PBB from "../../assets/icon/PBB.png";
import PGN from "../../assets/icon/PGN.png";
import Pulsa from "../../assets/icon/pulsa.png";
import Televisi from "../../assets/icon/Televisi.png";
import Zakat from "../../assets/icon/Zakat.png";
import Ban1 from "../../assets/banner/Banner1.png";
import Ban2 from "../../assets/banner/Banner2.png";
import Ban3 from "../../assets/banner/Banner3.png";
import Ban4 from "../../assets/banner/Banner4.png";
import Ban5 from "../../assets/banner/Banner5.png";

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
          <div className="mt-4 text-center">
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
      {/* icon */}
      <div className="flex mt-10 flex-wrap justify-center">
        <img src={Game} alt="" className="mx-4 mb-4" />
        <img src={kurban} alt="" className="mx-4 mb-4" />
        <img src={Listrik} alt="" className="mx-4 mb-4" />
        <img src={Pdam} alt="" className="mx-4 mb-4" />
        <img src={makanan} alt="" className="mx-4 mb-4" />
        <img src={Musik} alt="" className="mx-4 mb-4" />
        <img src={Paket} alt="" className="mx-4 mb-4" />
        <img src={PBB} alt="" className="mx-4 mb-4" />
        <img src={PGN} alt="" className="mx-4 mb-4" />
        <img src={Pulsa} alt="" className="mx-4 mb-4" />
        <img src={Televisi} alt="" className="mx-4 mb-4" />
        <img src={Zakat} alt="" className="mx-4 mb-4" />
      </div>

      <div className="flex mt-6">
        <img src={Ban1} alt="" className="mx-4 mb-4" />
        <img src={Ban2} alt="" className="mx-4 mb-4" />
        <img src={Ban3} alt="" className="mx-4 mb-4" />
        <img src={Ban4} alt="" className="mx-4 mb-4" />
        <img src={Ban5} alt="" className="mx-4 mb-4" />
      </div>
    </div>
  );
};

export default Index;
