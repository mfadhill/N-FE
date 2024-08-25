import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBannerAsync = createAsyncThunk<
    void,
    string,
    { rejectValue: string }>(
        "user/banner", async (_, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`/https://take-home-test-api.nutech-integrasi.com/banner`, {
                })
                console.log(data);

                return data;
            } catch (error) {
                return rejectWithValue("error")
            }
        }
    )