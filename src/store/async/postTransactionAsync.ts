
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Ilogin {
    service_code: string;
}

export const Transaction = createAsyncThunk<
    string,
    Ilogin,
    { rejectValue: string }
>("/transaction", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("https://take-home-test-api.nutech-integrasi.com/transaction",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        console.log("response data", data);

        const token = data.data.token;

        return token;
    } catch (error) {
        console.error("Login error:", error);
        return rejectWithValue("Login failed");
    }
});