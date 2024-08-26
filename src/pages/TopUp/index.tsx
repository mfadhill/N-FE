import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getBalance } from "../../store/slice/getBalanceSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState("");
  const profileState = useAppSelector((state) => state.profile.data);
  const data = profileState ? profileState.data : null;
  const balanceState = useAppSelector((state) => state.balance);
  const balance = balanceState.data?.data?.balance ?? null;

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

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopUpAmount(e.target.value);
  };

  const handleButtonClick = (amount: string) => {
    setTopUpAmount(amount);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const numericAmount = parseInt(topUpAmount, 10);

    if (numericAmount < 10000 || numericAmount > 1000000) {
      Swal.fire({
        icon: "error",
        title: "Wrong Amount",
        text: "Minimal top-up Rp10.000 dan maksimal Rp1.000.000",
      });
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Anda akan melakukan top-up sebesar Rp ${topUpAmount}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Top Up!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "https://take-home-test-api.nutech-integrasi.com/topup",
            { top_up_amount: topUpAmount },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Top-up successful:", response.data);
          await dispatch(getBalance());
          navigate("/topup");

          Swal.fire(
            "Berhasil!",
            "Top-up Anda telah berhasil dilakukan.",
            "success"
          );
        } catch (error) {
          console.error("Top-up failed:", error);

          Swal.fire("Gagal!", "Top-up Anda gagal. Silakan coba lagi.", "error");
        }
      }
    });
  };

  return (
    <div className="mt-4 mx-auto max-w-7xl">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex-1 h-40 flex flex-col items-start pl-6 pt-2">
          <img
            src={profile}
            alt="Profile Photo"
            className="w-16 h-16 rounded-full object-cover border-4 border-white ml-16"
          />
          <div className="mt-4 text-center">
            <h1>Selamat Datang</h1>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-3xl">{data.first_name}</h1>
                <h1 className="font-bold text-3xl">{data.last_name}</h1>
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

      <form onSubmit={handleSubmit} className="ml-5 mt-4">
        <h1>Silahkan Masukan</h1>
        <h1 className="font-bold text-3xl">Nominal Top Up</h1>

        <div className="flex mt-10 flex-wrap justify-center">
          <div className="flex flex-col mx-4" style={{ flexBasis: "60%" }}>
            <input
              type="number"
              value={topUpAmount}
              onChange={handleInputChange}
              placeholder="Masukkan Nominal Top up"
              className="mb-4 w-full px-3 py-2 border rounded-md border-gray-300"
            />
            <button
              type="submit"
              className="bg-gray-400 text-white w-full py-2 rounded-md mb-2 hover:bg-gray-700"
            >
              Top Up
            </button>
          </div>
          <div
            className="flex flex-wrap justify-between"
            style={{ width: "390px" }}
          >
            {["10000", "20000", "50000", "100000", "250000", "500000"].map(
              (amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleButtonClick(amount)}
                  className="border border-gray-500 text-gray-500 w-32 py-2 h-11 rounded-md mb-2 hover:bg-gray-200"
                >
                  Rp. {amount}
                </button>
              )
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
