import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
}

interface TransactionState {
    records: Transaction[];
    offset: number;
    limit: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: TransactionState = {
    records: [],
    offset: 0,
    limit: 10,
    status: 'idle',
    error: null
};

export const getTransactions = createAsyncThunk<
    { records: Transaction[]; offset: number; limit: number },
    void,
    { rejectValue: string }
>("transaction/getTransactions", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/transaction/history", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch transactions");
    }
});

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.records = action.payload.records;
                state.offset = action.payload.offset;
                state.limit = action.payload.limit;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default transactionSlice.reducer;
