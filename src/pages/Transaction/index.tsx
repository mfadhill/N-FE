import  { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { getBalance } from "../../store/slice/getBalanceSlice";
import { getTransactions } from "../../store/slice/getTransactionSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Index = () => {
  const dispatch = useAppDispatch();
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);
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
        await dispatch(getTransactions({ offset, limit: 5 }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(getTransactions({ offset: offset + limit, limit }));
    setOffset((prev) => prev + limit);
  };

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prev) => !prev);
  };

  return (
    <div className="mt-4 mx-auto max-w-7xl mb-10 h-screen">
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

      <div className="ml-5 mt-8 pb-10">
        <h1 className="font-bold text-xl">Semua Transaction</h1>
        <div className="mt-4 space-y-2">
          {isLoadingTransactions ? (
            <p>Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions available</p>
          ) : (
            transactions.map((transaction, index) => (
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
        <button
          onClick={handleShowMore}
          className="mt-4 px-4 py-2  text-red-500 font-semibold rounded-md flex mx-auto"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Index;
