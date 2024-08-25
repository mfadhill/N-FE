import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BalanceResponse {
    status: number;
    message: string;
    data: {
        balance: number;
    };
}

export const getBalanceAsync = createAsyncThunk<
    BalanceResponse,
    void,
    { rejectValue: string }
>(
    "user/balance",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<BalanceResponse>(
                "https://take-home-test-api.nutech-integrasi.com/balance",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue("Failed to fetch balance");
        }
    }
);
