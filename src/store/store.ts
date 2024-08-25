import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./slice/authSlice";
import getProfileReducer from "./slice/getProfileSlice";
import getBannerReducer from "./slice/getBannerSlice";
import getServicesReducer from "./slice/getServicesSlice";
import getBalanceReducer from "./slice/getBalanceSlice";
import getTransactionReducer from "./slice/getTransactionSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: getProfileReducer,
        banner: getBannerReducer,
        services: getServicesReducer,
        balance: getBalanceReducer,
        transaction: getTransactionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
