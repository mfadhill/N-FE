import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../async/postTransactionAsync";

interface TransactionState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TransactionState = {
    data: null,
    status: 'idle',
    error: null,
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Transaction.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(Transaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(Transaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default transactionSlice.reducer;
