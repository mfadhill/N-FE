// src/components/BannerDisplay.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { getBanner } from "../store/slice/getBannerSlice";
const BannerDisplay: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { banners, status, error } = useSelector();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getBanner());
    }
  }, [status, dispatch]);

  return (
    <div className="flex mt-6">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        banners.map((banner, index) => (
          <img
            key={index}
            src={banner.id}
            alt={banner.first_name}
            className="mx-4 mb-4"
          />
        ))}
    </div>
  );
};

export default BannerDisplay;
