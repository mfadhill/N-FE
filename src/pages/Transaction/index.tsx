import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { getBalance } from "../../store/slice/getBalanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Index = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
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

  const profileState = useAppSelector((state) => state.profile.data);
  const data = profileState ? profileState.data : null;

  const transactions = [
    {
      amount: "Rp. 10.000",
      description: "Top Up Pulsa Listrik",
      date: "24 August 2024",
      type: "in",
    },
    {
      amount: "Rp. 20.000",
      description: "Pembelian Barang",
      date: "24 August 2024",
      type: "out",
    },
    {
      amount: "Rp. 20.000",
      description: "Pembelian Barang",
      date: "24 August 2024",
      type: "out",
    },
    {
      amount: "Rp. 20.000",
      description: "Pembelian Barang",
      date: "24 August 2024",
      type: "out",
    },
    {
      amount: "Rp. 20.000",
      description: "Pembelian Barang",
      date: "24 August 2024",
      type: "out",
    },
    {
      amount: "Rp. 15.000",
      description: "Top Up Pulsa Listrik",
      date: "23 August 2024",
      type: "in",
    },
    {
      amount: "Rp. 25.000",
      description: "Pembayaran Tagihan",
      date: "23 August 2024",
      type: "out",
    },
    {
      amount: "Rp. 50.000",
      description: "Pembayaran Tagihan",
      date: "26 August 2024",
      type: "out",
    },
  ];

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 5, transactions.length)
    );
  };

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prev) => !prev);
  };

  return (
    <div className="mt-4 mx-auto max-w-7xl mb-10">
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

      <div className="ml-5 mt-8">
        <h1 className="font-bold text-xl">Semua Transaction</h1>
        <div className="mt-4 space-y-2">
          {transactions.slice(0, visibleCount).map((transaction, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md py-2 px-4"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`font-bold text-xl ${
                    transaction.type === "in"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "in" ? "+" : "-"} {transaction.amount}
                </span>
                <small className="text-black text-sm font-bold">
                  {transaction.description}
                </small>
              </div>
              <div className="text-gray-500 text-sm">{transaction.date}</div>
            </div>
          ))}
        </div>
        {visibleCount < transactions.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 font-bold text-red-500 rounded-md hover:bg-gray-300"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
