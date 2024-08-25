import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BalanceResponse {
    status: number;
    message: string;
    data: {
        balance: number;
    };
}
interface BalanceState {
    data: BalanceResponse | null; // Use BalanceResponse to reflect the full response
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: BalanceState = {
    data: null,
    status: "idle",
    error: null
};


export const getBalance = createAsyncThunk<
    BalanceResponse,
    void,
    { rejectValue: string }
>("balance/getBalanceAsync", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return data;
    } catch (error) {
        return rejectWithValue("Failed to fetch balance");
    }
});

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default balanceSlice.reducer;
