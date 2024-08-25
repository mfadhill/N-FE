import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProfile } from "../../store/slice/getProfileSlice";
import { getBanner } from "../../store/slice/getBannerSlice";
import {
  getServices,
  setSelectedService,
} from "../../store/slice/getServicesSlice";
import { getBalance } from "../../store/slice/getBalanceSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import profile from "../../assets/profile.png";
import psaldo from "../../assets/saldo.png";
import { Link } from "react-router-dom";
import "../../App.css";

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [isSaldoVisible, setIsSaldoVisible] = useState(true);

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

  const BANNER_NAME: { [key: string]: string } = {
    "Banner 1": "/banner/Banner1.png",
    "Banner 2": "/banner/Banner2.png",
    "Banner 3": "/banner/Banner3.png",
    "Banner 4": "/banner/Banner4.png",
    "Banner 5": "/banner/Banner5.png",
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchProfile());
        await dispatch(getBanner());
        await dispatch(getServices());
        await dispatch(getBalance());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleClick = (service: Service) => {
    dispatch(setSelectedService(service));
  };

  const profileState = useAppSelector((state) => state.profile.data);
  const getBannerState = useAppSelector((state) => state.banner.banners);
  const servicesState = useAppSelector((state) => state.services.services);
  const balanceState = useAppSelector((state) => state.balance);

  const profileData = profileState ? profileState.data : null;
  const balance = balanceState.data?.data?.balance ?? null;

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prev) => !prev);
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

      {/* Services */}
      <div className="flex mt-10 flex-wrap justify-center">
        {servicesState.length > 0 ? (
          servicesState.map((service) => (
            <div
              key={service.service_code}
              className="mx-2 flex flex-col items-center w-20"
            >
              <Link to="/services">
                <button
                  onClick={() => handleClick(service)}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={
                      SERVICE_ICON[service.service_code] || service.service_icon
                    }
                    alt={service.service_name}
                    className="w-14 h-14"
                  />
                  <h1 className="text-center text-sm">
                    {service.service_name}
                  </h1>
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
      </div>

      {/* Banners */}
      <h1 className="font-semibold text-xl mx-4 my-4">Temukan Promo Menarik</h1>
      <div className="flex mt-6 flex-nowrap overflow-x-auto justify-start space-x-4 scrollbar-hide">
        {getBannerState.length > 0 ? (
          getBannerState.map((banner) => (
            <img
              key={banner.banner_image}
              src={BANNER_NAME[banner.banner_name]}
              alt={banner.banner_name}
              className="flex-shrink-0 mb-4"
            />
          ))
        ) : (
          <p>No banners available</p>
        )}
      </div>
    </div>
  );
};

export default Index;
