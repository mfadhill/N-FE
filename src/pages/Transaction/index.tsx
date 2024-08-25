import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { getBalance } from "../../store/slice/getBalanceSlice";
import { getTransactions } from "../../store/slice/getTransactionSlice"; // Import your thunk
import { useAppDispatch, useAppSelector } from "../../store/store";

const Index = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const balanceState = useAppSelector((state) => state.balance);
  const balance = balanceState.data?.data?.balance ?? null;
  const profileState = useAppSelector((state) => state.profile.data);
  const data = profileState ? profileState.data : null;
  const transactionState = useAppSelector((state) => state.transaction);
  const transactions = transactionState.records;
  const isLoadingTransactions = transactionState.status === "loading";

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchProfile());
        await dispatch(getBalance());
        await dispatch(getTransactions());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  console.log("Visible Count:", visibleCount);
  console.log("Total Transactions:", transactions.length);
  const handleShowMore = () => {
    console.log("Handle Show More clicked");
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
          {isLoadingTransactions ? (
            <p>Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions available</p>
          ) : (
            transactions.slice(0, visibleCount).map((transaction, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md py-2 px-4"
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-bold text-xl ${
                      transaction.transaction_type === "TOPUP"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                    {transaction.total_amount.toLocaleString()}
                  </span>
                  <small className="text-black text-sm font-bold">
                    {transaction.description}
                  </small>
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(transaction.created_on).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
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
