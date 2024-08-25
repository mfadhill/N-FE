import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getBalance } from "../../store/slice/getBalanceSlice";

const Index = () => {
  const dispatch = useAppDispatch();
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

  const handleInputChange = (e: any) => {
    setTopUpAmount(e.target.value);
  };

  const handleButtonClick = (amount: string) => {
    setTopUpAmount(amount);
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
            <h1>Selamat Datang</h1>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-xl">{data.first_name}</h1>
                <h1 className="font-bold text-xl">{data.last_name}</h1>
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
        <h1>Silahkan Masukan</h1>
        <h1 className="font-bold text-3xl">Nominal Top Up</h1>
      </div>
      <div className="flex mt-10 flex-wrap justify-center">
        <div className="flex flex-col mx-4" style={{ flexBasis: "60%" }}>
          <input
            type="number"
            value={topUpAmount}
            onChange={handleInputChange}
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
          {["10.000", "20.000", "50.000", "100.000", "250.000", "500.000"].map(
            (amount) => (
              <button
                key={amount}
                onClick={() => handleButtonClick(amount)}
                className="border border-gray-500 text-gray-500 w-32 py-2 h-11 rounded-md mb-2 hover:bg-gray-200"
              >
                Rp. {amount}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
