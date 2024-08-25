import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Transaction {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
}

export const getBannerAsync = createAsyncThunk<
    Transaction,
    void,
    { rejectValue: string }>(
        "trasnaction/history", async (_, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`/https://take-home-test-api.nutech-integrasi.com/transaction/history`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data);

                return data;
            } catch (error) {
                return rejectWithValue("error")
            }
        }
    )

