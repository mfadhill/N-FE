import { CiWallet } from "react-icons/ci";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow px-20 py-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a
            href="/"
            className="text-black text-lg font-bold flex items-center"
          >
            <span className="bg-red-500 p-1 rounded-full">
              <CiWallet className="text-white" />
            </span>
            <span className="ml-2">SIMS PPOB</span>
          </a>
        </div>
        <div className="flex space-x-10">
          <a
            href="/topup"
            className={`font-semibold ${
              location.pathname === "/topup"
                ? "text-red-500"
                : "text-black hover:text-red-400"
            }`}
          >
            Top Up
          </a>
          <a
            href="/transaction"
            className={`font-semibold ${
              location.pathname === "/transaction"
                ? "text-red-500"
                : "text-black hover:text-red-400"
            }`}
          >
            Transaction
          </a>
          <a
            href="/akun"
            className={`font-semibold ${
              location.pathname === "/akun"
                ? "text-red-500"
                : "text-black hover:text-red-400"
            }`}
          >
            Akun
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
