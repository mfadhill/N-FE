import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { getBalance } from "../../store/slice/getBalanceSlice";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import axios from "axios";
import Swal from "sweetalert2";
const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);
  const [nominal, setNominal] = useState("");
  const profileState = useAppSelector((state) => state.profile.data);
  const balanceState = useAppSelector((state) => state.balance);
  const profileData = profileState ? profileState.data : null;
  const balance = balanceState.data?.data?.balance ?? null;
  const selectedService = useAppSelector(
    (state) => state.services.selectedService
  );

  if (!selectedService) {
    return <p>No service selected</p>;
  }

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prevState) => !prevState);
  };

  const SERVICE_ICON: { [key: string]: string } = {
    PAJAK: "/icon/PBB.png",
    PLN: "/icon/Listrik.png",
    PDAM: "/icon/PDAM.png",
    PULSA: "/icon/Pulsa.png",
    PGN: "/icon/PGN.png",
    MUSIK: "/icon/Musik.png",
    TV: "/icon/Televisi.png",
    PAKET_DATA: "/icon/paket.png",
    VOUCHER_GAME: "/icon/Game.png",
    VOUCHER_MAKANAN: "/icon/makanan.png",
    QURBAN: "/icon/Kurban.png",
    ZAKAT: "/icon/Zakat.png",
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchProfile());
        await dispatch(getBalance());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak bisa membatalkan transaksi ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, bayar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "https://take-home-test-api.nutech-integrasi.com/transaction",
            {
              nominal: parseFloat(nominal),
              service_code: selectedService.service_code,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Transaction successful:", response.data);
          await dispatch(getBalance());

          Swal.fire(
            "Berhasil!",
            "Transaksi Anda telah berhasil dilakukan.",
            "success"
          );
        } catch (error) {
          console.error("Transaction failed:", error);

          Swal.fire(
            "Gagal!",
            "Transaksi Anda gagal. Silakan coba lagi.",
            "error"
          );
        }
      }
    });
  };
  return (
    <div className="mt-4 mx-auto max-w-7xl px-4">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex-1 h-40 flex flex-col items-start pl-6 pt-2">
          <img
            src={profile}
            alt="Profile Photo"
            className="w-16 h-16 rounded-full object-cover border-4 border-white ml-16"
          />
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-semibold">Selamat Datang</h1>
            {loading ? (
              <p>Loading...</p>
            ) : profileData ? (
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-3xl">{profileData.first_name}</h1>
                <h1 className="font-bold text-3xl">{profileData.last_name}</h1>
              </div>
            ) : (
              <p>No data available</p>
            )}
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
              {loading
                ? "Loading..."
                : isSaldoVisible
                ? `Rp ${
                    typeof balance === "number" ? balance.toLocaleString() : "0"
                  }`
                : "****"}
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
        <div className="flex items-center mt-2">
          <img
            src={
              SERVICE_ICON[selectedService.service_code] ||
              selectedService.service_icon
            }
            className="w-14 h-14"
          />
          <h2 className="text-lg font-medium">
            {selectedService.service_name}
          </h2>
        </div>
      </div>

      <div className="flex flex-col w-full px-5 mt-4">
        <form onSubmit={handleSubmit}>
          <div className="relative w-full mb-4">
            <input
              type="number"
              id="nominal"
              name="nominal"
              placeholder={selectedService.service_tariff.toLocaleString()}
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              className="w-full px-10 py-2 border rounded-md border-gray-300"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaMoneyCheckDollar className="text-gray-500" />
            </span>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white w-full py-2 rounded-md mb-2 hover:bg-red-700"
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
